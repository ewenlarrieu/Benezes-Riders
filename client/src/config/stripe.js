import { loadStripe } from "@stripe/stripe-js";

// Initialiser Stripe avec votre clé publique
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default stripePromise;
