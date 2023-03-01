import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

function formatLineItems(cartDetails: any) {
  const lineItems = [];
  for (const id in cartDetails)
    lineItems.push({
      price: cartDetails[id].price_id,
      quantity: cartDetails[id].quantity,
    });

  return lineItems;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cartDetails } = req.body;
  console.log(">DETAILS", cartDetails);
  const lineItems = formatLineItems(cartDetails);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!lineItems) {
    return res.status(400).json({
      error: "Price or List of prices not found",
    });
  }

  console.log(lineItems);
  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: [...lineItems],
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
