import 'babel-polyfill';
import Hapi from 'hapi';
import dotenv from 'dotenv';
import auth from './auth';
import db from './utils/db';
import {
  getByKey as getSystemSettingByKey,
  set as setSystemSetting,
} from './controllers/system';
import routes from './routes';
import migration from './migrations';
import fake from './utils/fakeData';

// set env variables from `.env` file
dotenv.config();

const migrateDB = async () => {
  const DB_VERSION_KEY = 'dbversion';
  let dbVersion = await getSystemSettingByKey(DB_VERSION_KEY);
  if (!dbVersion) {
    await setSystemSetting({
      key: DB_VERSION_KEY,
      value: '0',
    });
    dbVersion = await getSystemSettingByKey(DB_VERSION_KEY);
  }

  try {
    const newVersion = await migration(dbVersion.value);
    await setSystemSetting({
      key: DB_VERSION_KEY,
      value: `${newVersion}`,
    });
  } catch (error) {
    /* eslint-disable no-console */
    console.error('    Error while migration');
    console.error('    Version', dbVersion.value);
    console.error(`    ${error.message}`);
    /* eslint-enable no-console */
    throw error;
  }
};

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

    await db.sync();

    await migrateDB();

    if (process.env.WITH_MOCKS) {
      fake();
    }

    // Start the server
    await server.start();
    // eslint-disable-next-line no-console
    console.log('Server running at:', server.info.uri);

    return server;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return process.exit(1);
  }
};
