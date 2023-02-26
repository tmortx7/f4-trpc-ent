const customConfig: {
  port: number;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
  origin: string;
  dbUri: string;
  accessTokenPrivateKey: string;
  refreshTokenPrivateKey: string;
  accessTokenPublicKey: string;
  refreshTokenPublicKey: string;
  redisCacheExpiresIn: number;
} = {
  port: 8000,
  accessTokenExpiresIn: '1m',
  refreshTokenExpiresIn: '1m',
  origin: 'http://localhost:3000',
  redisCacheExpiresIn: 60,

  dbUri: process.env.DATABASE_URL as string,
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY as string,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY as string,
  refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY as string,
};

export default customConfig;