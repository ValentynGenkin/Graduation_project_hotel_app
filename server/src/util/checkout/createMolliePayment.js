import { createMollieClient } from "@mollie/api-client";

export const createMolliePayment = async (req) => {
  const booking = req.booking;
  const returnUrl = req.body.returnUrl;
  // const origin = req.protocol + "://" + req.headers.host;
  // const webhook = `${origin}/api/booking/mollie-hook`;
  const webhook =
    "https://c44-group-c-5ea6be59db5d.herokuapp.com/api/booking/mollie-hook";

  const mollieClient = createMollieClient({
    apiKey: process.env.MOLLIE_API_KEY,
  });

  const payment = await mollieClient.payments.create({
    amount: {
      currency: "EUR",
      value: parseFloat(booking.cost.toString()).toFixed(2),
    },
    description: `${booking._id}`,
    redirectUrl: returnUrl,
    webhookUrl: webhook,
    metadata: {
      booking_id: booking._id,
    },
  });

  return payment;
};
