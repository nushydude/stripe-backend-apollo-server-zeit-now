import faker from 'faker';
import cuid from 'cuid';

export async function getUserByJWT(jwt) {
  if (!jwt) {
    return null;
  }

  // TODO:
  // - validate jwt
  // - find user in DB and return

  return {
    id: cuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
  };
}
