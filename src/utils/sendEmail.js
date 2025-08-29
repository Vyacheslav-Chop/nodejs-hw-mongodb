import nodemailer from 'nodemailer';
import { getEnvVar } from './getEnvVar.js';
import { SMTP } from '../constants/constants.js';
import createHttpError from 'http-errors';

const transport = nodemailer.createTransport({
  port: getEnvVar(SMTP.SMTP_PORT),
  host: getEnvVar(SMTP.SMTP_HOST),
  secure: true,
  auth: {
    user: getEnvVar(SMTP.SMTP_USER),
    pass: getEnvVar(SMTP.SMTP_PASSWORD),
  },
});

export const sendEmail = async () => {
  try {
    await transport.sendMail({
      to: 'syavchik260119901@gmail.com',
      text: 'hello',
      from: getEnvVar(SMTP.SMTP_FROM),
    });
  } catch (error) {
    console.log(error);
    throw createHttpError(500, 'Failed to sent email!');
  }
};

await sendEmail();
