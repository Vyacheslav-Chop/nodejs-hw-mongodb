import path from 'node:path';

export const TEMPLATE_DIR_PATH = path.join(
  process.cwd(),
  'templates',
  'send-reset-password-email.html',
);

export const TEMP_FILES_DIR_PATH = path.join(process.cwd(), 'temp');

export const UPLOAD_FILES_DIR_PATH = path.join(process.cwd(), 'uploads');

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
