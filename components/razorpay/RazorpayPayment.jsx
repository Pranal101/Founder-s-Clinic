// import { useEffect } from "react";

// const RazorpayPayment = ({ amount }) => {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const loadRazorpay = async () => {
//     const res = await fetch("http://localhost:4000/api/razorpay/create-order", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount, currency: "INR" }),
//     });

//     const order = await res.json();

//     const options = {
//       key: "rzp_test_hSMZTyGp6Jx5D5",
//       amount: order.amount,
//       currency: order.currency,
//       name: "Your Company Name",
//       description: "Payment for order",
//       order_id: order.id,
//       handler: async (response) => {
//         const verifyRes = await fetch(
//           "http://localhost:4000/api/razorpay/verify-payment",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(response),
//           }
//         );

//         const result = await verifyRes.json();
//         if (result.success) {
//           alert("Payment Successful!");
//         } else {
//           alert("Payment Verification Failed!");
//         }
//       },
//       theme: { color: "#3399cc" },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return <button onClick={loadRazorpay}>Pay ₹{amount}</button>;
// };

// export default RazorpayPayment;
const loadRazorpay = async (amount) => {
  if (!window.Razorpay) {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    await new Promise((resolve) => {
      script.onload = resolve;
    });
  }

  const res = await fetch("http://localhost:4000/api/razorpay/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, currency: "INR" }),
  });

  const order = await res.json();

  const options = {
    key: "rzp_test_hSMZTyGp6Jx5D5",
    amount: order.amount,
    currency: order.currency,
    name: "Your Company Name",
    description: "Payment for order",
    order_id: order.id,
    handler: async (response) => {
      const verifyRes = await fetch(
        "http://localhost:4000/api/razorpay/verify-payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        }
      );

      const result = await verifyRes.json();
      if (result.success) {
        alert("Payment Successful!");
      } else {
        alert("Payment Verification Failed!");
      }
    },
    theme: { color: "#3399cc" },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

export default loadRazorpay;
