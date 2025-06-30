import React from "react";
//npm install react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
// Imports & setup for Stripe payment integration
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
const stripePromise = loadStripe(
  "pk_test_51RTpbzIKxQwvWyaB54l42Ll2if9KC5zLz02OJnLsKvwTKNMzyJigRrkcGMkiFqkOc8coU1qK3K2N0CUnS6cGuYuV00vb1va27l"
);

function Routing() {
  return (
    <Router>
      <Routes>
        {/* This part of the code is only responsible for defining which
        component to show based on the current URL in the browser (whether
        typed, linked to, or navigated to in code) */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              msg={"You must log in to pay"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        {/* Wrapping the "Payment" component above with "CheckoutProvider" is a Stripe payment setup set in their documentation*/}
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"You must log in to access your orders"}
              redirect={"/orders"}
            >
              <Elements stripe={stripePromise}>
                <Orders />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route path="/category/:BereketEndPoint" element={<Results />} />
        {/* Here we are saying whenever anything comes after "/category/", then route to the "Results" page. 
        The variable BereketEndPoint gets dynamic values either from what a user writes or from a clicked route from the CategoryCard, which maps and take varying data on it's four d/t components.*/}
        <Route path="/products/:productId" element={<ProductDetail />} />
        {/*     Likewise when any of the rendered ProductCards gets a click, it's "Link"
        attribute writes and links to a url endpoint `/products/${id}`, and
        because this url pattern would eventually match to the route path provided here above as <Route path="/products/:productId" element...., our Router would take us to "ProductDetail" page*/}

        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}
export default Routing;
