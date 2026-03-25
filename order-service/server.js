const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3002;

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "order-service" });
});

app.post("/orders", (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: "productId and quantity are required" });
  }

  const order = {
    orderId: Math.floor(Math.random() * 100000),
    productId,
    quantity,
    status: "created"
  };

  res.status(201).json({
    message: "Order created successfully",
    order
  });
});

app.listen(PORT, () => {
  console.log(`order-service running on port ${PORT}`);
});
