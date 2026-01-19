export function configs() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY;
  const calendlyURL = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return {
    baseURL,
    stripeKey,
    calendlyURL
  };
}
