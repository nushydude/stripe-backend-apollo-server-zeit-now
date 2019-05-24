import cuid from 'cuid';
import { getStripe } from '../configs/stripe';
import { purchases } from '../dataStore';

export async function createPurchase(_, { input }) {
  const stripe = getStripe();

  let customer;

  try {
    customer = await stripe.customers.create({
      source: input.token,
      email: 'paying.user@example.com',
    });
  } catch (error) {
    console.log('error creating customer:', error.message);
  }

  console.log('customer:', customer);

  let purchase;

  try {
    if (customer) {
      purchase = await stripe.charges.create({
        amount: input.amount * 100, // needs to be in cents
        currency: input.currency,
        customer: customer.id,
      });
    } else {
      purchase = await stripe.charges.create({
        amount: input.amount * 100, // needs to be in cents
        currency: input.currency, // needs to be in lowercase and supported ones listed here https://stripe.com/docs/currencies
        source: input.token,
      });
    }
  } catch (error) {
    return {
      purchase: null,
      error: {
        message: error.message,
      },
    };
  }

  console.log('purchase:', purchase);

  purchases.push(purchase);

  return {
    purchase,
    error: null,
  };
}
