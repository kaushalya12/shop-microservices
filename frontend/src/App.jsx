import { useEffect, useState } from "react";

const PRODUCT_SERVICE_URL = import.meta.env.VITE_PRODUCT_SERVICE_URL || "http://localhost:3001";
const ORDER_SERVICE_URL = import.meta.env.VITE_ORDER_SERVICE_URL || "http://localhost:3002";

function App() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${PRODUCT_SERVICE_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const placeOrder = async (productId) => {
    try {
      const response = await fetch(`${ORDER_SERVICE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId,
          quantity: 1
        })
      });

      const data = await response.json();
      setMessage(`Order successful! Order ID: ${data.order.orderId}`);
    } catch (error) {
      console.error("Error placing order:", error);
      setMessage("Order failed");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Shop Platform</h1>
      <h2>Products</h2>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px"
          }}
        >
          <h3>{product.name}</h3>
          <p>Price: £{product.price}</p>
          <button onClick={() => placeOrder(product.id)}>Buy Now</button>
        </div>
      ))}

      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </div>
  );
}

export default App;
