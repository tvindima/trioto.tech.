from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from api.forex_api import SimulatedForexAPI
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Add CORS middleware for security
# NOTE: In production, replace ["*"] with specific allowed origins like ["https://trioto.tech"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: Configure specific origins in production
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

api = SimulatedForexAPI()

class OrderRequest(BaseModel):
    pair: str = Field(..., min_length=1, max_length=20, description="Currency pair (e.g., EUR/USD)")
    entry_price: float = Field(..., gt=0, description="Entry price must be positive")
    tp_percent: float = Field(..., ge=0, le=1, description="Take profit percentage (0-1)")
    sl_percent: float = Field(..., ge=-1, le=0, description="Stop loss percentage (-1 to 0)")
    
    @validator('pair')
    def validate_pair(cls, v):
        # Basic validation for currency pair format
        if not v or len(v.strip()) == 0:
            raise ValueError('Currency pair cannot be empty')
        return v.strip().upper()

@app.post("/open_order")
def open_order(req: OrderRequest):
    """Open a new trading order with validated inputs"""
    try:
        api.open_order(req.pair, req.entry_price, req.tp_percent, req.sl_percent)
        return {
            "message": f"Opened trade on {req.pair} at {req.entry_price}",
            "tp_price": api.open_trade["tp_price"],
            "sl_price": api.open_trade["sl_price"],
            "size": api.open_trade["size"]
        }
    except ValueError as e:
        logger.warning(f"Invalid order request: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error opening order: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/simulate")
def simulate():
    """Simulate market movement and close position"""
    try:
        api.simulate_market_and_close()
        return {"balance": api.balance}
    except ValueError as e:
        logger.warning(f"Invalid simulation request: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error during simulation: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")
