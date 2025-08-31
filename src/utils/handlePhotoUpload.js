import createHttpError from 'http-errors';
import { ENV_VARS } from '../constants/constants.js';
import { getEnvVar } from './getEnvVar.js';
import { saveFileToCloudinary, saveFileToUploadDir } from './saveFile.js';

export const handlePhotoUpload = async (file) => {

  const enableCloudinary = getEnvVar(ENV_VARS.ENABLE_STORAGE);

  const allowedStorages = ['cloudinary', 'local'];

  if (!allowedStorages.includes(enableCloudinary)) {
    throw createHttpError(
      400,
      'Invalid storage type. Must be "cloudinary" or "local".',
    );
  }

  if (enableCloudinary === 'cloudinary') {
    return await saveFileToCloudinary(file);
  } else {
    return await saveFileToUploadDir(file);
  }
};
