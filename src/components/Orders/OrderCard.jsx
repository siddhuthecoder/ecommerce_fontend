import React from "react";

const OrderCard = ({ order }) => {
  return (
    <div className="bg-slate-100 mb-5 p-4 rounded shadow-md">
      <h1>Order Id :- {order._id}</h1>
      <h1>Status :- {order.status}</h1>
      <h1>Total Price :- {order.totalPrice}</h1>
      <br />
      <h2>Products :- </h2>
      <ol>
        {order.products.map((product) => (
          <li key={product._id}>
            {product.productId.name} x {product.quantity} - $
            {product.productId.price}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default OrderCard;
