import fs from 'node:fs/promises';
import path from 'node:path';
import cloudinary from 'cloudinary';

import {
  TEMP_FILES_DIR_PATH,
  UPLOAD_FILES_DIR_PATH,
} from '../constants/path.js';
import { getEnvVar } from './getEnvVar.js';
import { CLOUDINARY, ENV_VARS } from '../constants/constants.js';
import createHttpError from 'http-errors';

export const saveFileToUploadDir = async (file) => {
  try {
    await fs.rename(
      path.join(TEMP_FILES_DIR_PATH, file.filename),
      path.join(UPLOAD_FILES_DIR_PATH, file.filename),
    );

    return `${getEnvVar(ENV_VARS.BECKEND_DOMAIN)}/uploads/${file.filename}`;
  } catch {
    throw createHttpError(500, 'Failed to save file to local!');
  }
};

cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvVar(CLOUDINARY.CLOUDINARY_API_CLOUD_NAME),
  api_key: getEnvVar(CLOUDINARY.CLOUDINARY_API_KEY),
  api_secret: getEnvVar(CLOUDINARY.CLOUDINARY_API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  try {
    const res = await cloudinary.v2.uploader.upload(file.path);

    await fs.unlink(file.path);

    return res.secure_url;
  } catch {
    throw createHttpError(500, 'Failed to save file to cloudinary!');
  }
};
