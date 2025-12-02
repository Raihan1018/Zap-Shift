const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 3000;
const stripe = require("stripe")(process.env.STRIPT_SECRET);
const crypto = require("crypto");

function generateTrackingId() {
  const prefix = "PRCL";
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `${prefix}-${date}-${random}`;
}
// middleware
app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db("zapShift_DB");
    const parcelsCollection = db.collection("parcels");
    const paymentCollection = db.collection("payments");

    // parcel api
    app.get("/parcels", async (req, res) => {
      const query = {};
      const { email } = req.query;
      if (email) {
        query.senderEmail = email;
      }
      const options = { sort: { createdAt: -1 } };
      const cursor = parcelsCollection.find(query, options);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/parcels/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await parcelsCollection.findOne(query);
      res.send(result);
    });

    app.post("/parcels", async (req, res) => {
      try {
        const parcel = req.body;

        // Add current date
        parcel.createdAt = new Date();
        const result = await parcelsCollection.insertOne(parcel);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to add parcel" });
      }
    });

    app.delete("/parcels/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await parcelsCollection.deleteOne(query);
      res.send(result);
    });

    // payment related API old
    // app.post("/create-checkout-session", async (req, res) => {
    //   const paymentInfo = req.body;
    //   const amount = parseInt(paymentInfo.cost) * 100;
    //   const session = await stripe.checkout.sessions.create({
    //     line_items: [
    //       {
    //         price_data: {
    //           currency: "USD",
    //           unit_amount: amount,
    //           product_data: {
    //             name: paymentInfo.parcelName,
    //           },
    //         },

    //         quantity: 1,
    //       },
    //     ],
    //     customer_email: paymentInfo.senderEmail,
    //     mode: "payment",
    //     metadata: {
    //       parcelId: paymentInfo.parcelId,
    //     },
    //     success_url: `${process.env.SITE_DOMAIN}/dashboard/payment-success`,
    //     cancel_url: `${process.env.SITE_DOMAIN}/dashboard/payment-cancel`,
    //   });
    //   console.log(session);
    //   res.send({
    //     url: session.url,
    //   });
    // });

    // payment API new
    app.post("/payment-checkout-session", async (req, res) => {
      try {
        const paymentInfo = req.body; // FIXED

        const amount = parseFloat(paymentInfo.cost) * 100;

        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price_data: {
                currency: "usd",
                unit_amount: amount,
                product_data: {
                  name: `Please pay ${paymentInfo.parcelName}`,
                },
              },
              quantity: 1,
            },
          ],
          mode: "payment",

          metadata: {
            parcelId: paymentInfo.parcelId,
            parcelName: paymentInfo.parcelName,
          },

          customer_email: paymentInfo.senderEmail,

          success_url: `${process.env.SITE_DOMAIN}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,

          cancel_url: `${process.env.SITE_DOMAIN}/dashboard/payment-cancelled`,
        });

        res.send({ url: session.url });
      } catch (err) {
        console.error("Stripe error:", err);
        res.status(500).send({ error: err.message });
      }
    });

    app.patch("/payment-success", async (req, res) => {
      try {
        const sessionId = req.query.session_id;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== "paid") {
          return res.send({ success: false });
        }

        const id = session.metadata.parcelId;

        // update parcel payment status
        const query = { _id: new ObjectId(id) };
        const update = {
          $set: {
            paymentStatus: "paid",
            trackingId: generateTrackingId(),
          },
        };

        await parcelsCollection.updateOne(query, update);

        // save payment info
        const payment = {
          amount: session.amount_total / 100,
          currency: session.currency,
          customerEmail: session.customer_email,
          parcelId: session.metadata.parcelId,
          parcelName: session.metadata.parcelName,
          transactionId: session.payment_intent, // FIXED
          paymentStatus: session.payment_status,
          paidAt: new Date(),
        };

        await paymentCollection.insertOne(payment);

        // Fetch newly updated parcel with tracking ID
        const updatedParcel = await parcelsCollection.findOne(query);

        return res.send({
          success: true,
          transactionId: session.payment_intent,
          trackingId: updatedParcel.trackingId,
        });
      } catch (error) {
        console.log("Payment success error:", error);
        return res.status(500).send({ error: error.message });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("ZapShift server is running ... 🚀!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
