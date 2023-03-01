import { CartProvider } from "use-shopping-cart";

interface ProviderProps {
  children: React.ReactNode;
}

export function CustomCartProvider({ children }: ProviderProps) {
  const stripeKey = String(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
  return (
    <CartProvider
      mode="payment"
      // The mode for how you want to use the hooks. 'client-only' and 'checkout-session' are the options
      cartMode="client-only"
      stripe={stripeKey}
      // The URL to which Stripe should send customers when payment is complete.
      successUrl="http://localhost:3000/success"
      // The URL to which Stripe should send customers when payment is canceled.
      cancelUrl="http://localhost:3000"
      currency="BRL"
      // https://stripe.com/docs/payments/checkout/client#collect-shipping-address
      allowedCountries={["BR"]}
      // https://stripe.com/docs/payments/checkout/client#collect-billing-address
      billingAddressCollection={true}
      shouldPersist={true}
    >
      {children}
    </CartProvider>
  );
}
