import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Purchase {
    amount: Float!
    currency: Currency!
    date: String!
    id: ID!
    token: String!
  }

  type EnvVars {
    secret: String
  }

  type Query {
    getPurchases(input: GetPurchasesInput!): [Purchase]!
    getEnvVars(input: GetEnvVarsInput!): EnvVars!
  }

  enum Currency {
    usd
    aud
    gbp
  }

  input GetPurchasesInput {
    """
    dummy field.
    """
    _: Boolean
  }

  input GetEnvVarsInput {
    """
    dummy field.
    """
    _: Boolean
  }

  type Error {
    message: String!
  }

  interface MutationResponse {
    error: Error
  }

  type Mutation {
    createPurchase(input: CreatePurchaseInput!): CreatePurchaseResponse!
  }

  input CreatePurchaseInput {
    amount: Float!
    currency: Currency!
    token: String!
  }

  type CreatePurchaseResponse implements MutationResponse {
    purchase: Purchase
    error: Error
  }
`;
