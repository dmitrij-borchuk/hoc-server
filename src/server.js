import Hapi from 'hapi';

// Create a server with a host and port
const server = Hapi.server({
  host: 'localhost',
  port: 8000,
});

// Add the route
server.route({
  method: 'GET',
  path: '/hello',
  handler: () => 'hello world',
});

// Start the server
const start = async () => {
  try {
    await server.start();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
};

export default start;
