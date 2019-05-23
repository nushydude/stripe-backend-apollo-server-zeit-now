import cuid from 'cuid';
import { getStripe } from '../configs/stripe';
import { purchases } from '../dataStore';

export async function createPurchase(_, { input }) {
  const stripe = getStripe();

  let charge;

  try {
    charge = await stripe.charges.create({
      amount: input.amount * 100, // needs to be in cents
      currency: input.currency, // needs to be in lowercase and supported ones listed here https://stripe.com/docs/currencies
      source: input.token,
      description: 'something',
    });
  } catch (error) {
    return {
      purchase: null,
      error: {
        message: error.message,
      },
    };
  }

  const purchase = { ...charge, id: cuid() };

  console.log('purchase:', purchase);

  purchases.push(purchase);

  return {
    purchase,
    error: null,
  };
}
