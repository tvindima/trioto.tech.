from fastapi import FastAPI
from pydantic import BaseModel
from api.forex_api import SimulatedForexAPI

app = FastAPI()
api = SimulatedForexAPI()

class OrderRequest(BaseModel):
    pair: str
    entry_price: float
    tp_percent: float
    sl_percent: float

@app.post("/open_order")
def open_order(req: OrderRequest):
    api.open_order(req.pair, req.entry_price, req.tp_percent, req.sl_percent)
    return {"message": f"Opened trade on {req.pair} at {req.entry_price}",
            "tp_price": api.open_trade["tp_price"],
            "sl_price": api.open_trade["sl_price"],
            "size": api.open_trade["size"]}

@app.post("/simulate")
def simulate():
    api.simulate_market_and_close()
    return {"balance": api.balance}
