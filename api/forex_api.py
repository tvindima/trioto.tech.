import random

class SimulatedForexAPI:
    def __init__(self, balance=10000.0, risk_percent=0.01):
        # Saldo inicial e percentagem de risco por operação
        self.balance = balance
        self.risk_percent = risk_percent
        self.open_trade = None

    def open_order(self, pair, entry_price, tp_percent, sl_percent):
        # Não permitir mais do que uma ordem aberta ao mesmo tempo
        if self.open_trade is not None:
            raise ValueError("Já existe uma ordem aberta.")
        # Calcula o montante a arriscar com base no saldo e no risco
        risk_amount = self.balance * self.risk_percent
        sl_distance = abs(sl_percent) * entry_price
        size = risk_amount / sl_distance
        tp_price = entry_price * (1 + tp_percent)
        sl_price = entry_price * (1 + sl_percent)
        self.open_trade = {
            "pair": pair,
            "entry_price": entry_price,
            "size": size,
            "tp_price": tp_price,
            "sl_price": sl_price
        }
        print(f"Opened trade on {pair} at {entry_price} with size {size:.2f}")

    def simulate_market_and_close(self, volatility=0.002, max_steps=1000):
        # Requer uma ordem aberta
        if self.open_trade is None:
            raise ValueError("Nenhuma ordem aberta.")
        current_price = self.open_trade["entry_price"]
        for step in range(max_steps):
            move = random.uniform(-volatility, volatility) * self.open_trade["entry_price"]
            current_price += move
            if current_price >= self.open_trade["tp_price"]:
                reason = "take_profit"
                break
            if current_price <= self.open_trade["sl_price"]:
                reason = "stop_loss"
                break
        else:
            reason = "time_limit"
        entry = self.open_trade["entry_price"]
        size = self.open_trade["size"]
        pl = (current_price - entry) * size
        self.balance += pl
        print(f"Closed trade on {self.open_trade['pair']} at {current_price:.4f} due to {reason}. P/L: {pl:.2f}. New balance: {self.balance:.2f}")
        self.open_trade = None
