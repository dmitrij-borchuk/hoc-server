import Hapi from 'hapi';
import auth from './auth';


// Start the server
export default async () => {
  try {
    // Create a server with a host and port
    const server = Hapi.server({
      host: 'localhost',
      port: 8000,
    });

    await auth(server);

    // Add the route
    server.route({
      method: 'GET',
      path: '/hello',
      handler: () => 'hello world',
    });

    server.route({
      method: 'GET',
      path: '/sec',
      config: {
        auth: 'token',
        handler: () => 'hello world secured',
      },
    });
    await server.start();

    console.log('Server running at:', server.info.uri);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
