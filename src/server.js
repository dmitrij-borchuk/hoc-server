import 'babel-polyfill';
import Hapi from 'hapi';
import dotenv from 'dotenv';
import auth from './auth';
import db from './utils/db';
import routes from './routes';

// set env variables from `.env` file
dotenv.config();

export default async () => {
  try {
    // Create a server with a host and port
    const server = Hapi.server({
      host: 'localhost',
      port: 8000,
    });

    await auth(server);

    // Add the route
    routes(server);
    server.route({
      method: 'GET',
      path: '/hello',
      handler: () => 'hello world',
      config: {
        auth: false,
      },
    });

    server.route({
      method: 'GET',
      path: '/sec',
      handler: () => 'hello world secured',
    });

    await db.sync();

    // Start the server
    await server.start();
    console.log('Server running at:', server.info.uri);

    return server;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};
