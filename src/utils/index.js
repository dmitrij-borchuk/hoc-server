import RandToken from 'rand-token';

// eslint-disable-next-line import/prefer-default-export
export const createToken = () => RandToken.generate(16);
