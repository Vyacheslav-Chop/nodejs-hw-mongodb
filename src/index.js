import { TEMP_FILES_DIR_PATH, UPLOAD_FILES_DIR_PATH } from './constants/path.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';

const bootstrap = async () => {
  await initMongoConnection();
  await createDirIfNotExists(TEMP_FILES_DIR_PATH);
  await createDirIfNotExists(UPLOAD_FILES_DIR_PATH);
  setupServer();
};

await bootstrap();
