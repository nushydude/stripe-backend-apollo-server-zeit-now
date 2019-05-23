import Stripe from 'stripe';

let stripe;

export function initStripe() {
  console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);

  stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  return stripe;
}

export function getStripe() {
  if (!stripe) {
    return initStrip();
  }

  return stripe;
}
