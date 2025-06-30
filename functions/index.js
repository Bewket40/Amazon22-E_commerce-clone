const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize Stripe with secret key
const stripe = require("stripe")(process.env.STRIPE_KEY);

// Create Express app
const app = express();
// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Success!" });
});

// Payment creation route
// [app.post("/payment/create", async (req, res) => {
//   const total = req.query.total;
//   if (total > 0) {
//     console.log("Payment received", total);
//     res.send(total);
//   }
// });

// Then if we would send a POST request using Thunder client as (http://127.0.0.1:5001/clone-b2e84/us-central1/api/payment/create?total=300), we would get result.]
app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total, 10); // Ensure it's a number by extracting and converting the total value from the query string of the incoming HTTP request. JavaScript treats everything from the query as a string. The 10 tells JavaScript to use base 10 (decimal) — this avoids bugs if the number starts with a 0 (which could be interpreted as octal in older JS versions).
  if (total > 0) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });
      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      logger.error("Stripe error:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({
      message: "Total must be greater than 0",
    });
  }
});

// Export the entire Express app as a Firebase Function !!!This line should come after all route definitions so that they would be registered with the app when it's exported.
// exports.api = onRequest(app); //This creates a Cloud Function with the default access settings. By default, Cloud Functions (v2) restrict access and require authentication (like Firebase Auth or IAM permissions) unless explicitly made public.
exports.api = onRequest({ invoker: "public" }, app); //This explicitly sets the function’s invoker policy to “public”, meaning anyone on the internet can call it without needing authentication.

// The last two codes allow us to build a REST API using Express and deploy it as a single Firebase function. When deployed, our endpoint would look like: https://<your-region>-<our-project>.cloudfunctions.net/api
// ** Basing the script "serve": "firebase emulators:start --only functions" found in our json.package, we use "npm run serve" to start firebase runner. We can now install and use vsc extensions such as "Thunder client" to test/run our api from the emulator. Thunder client is a lightweight and fast REST API client extension. It’s designed to help developers test APIs (like RESTful or GraphQL APIs) directly within the VS Code editor, without needing to switch to an external tool like Postman or Insomnia.



