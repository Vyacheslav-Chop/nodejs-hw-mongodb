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

await transport.verify();

export const sendEmail = async ({ to, subject, html }) => {
  try {
    await transport.sendMail({
      subject,
      to,
      html,
      from: getEnvVar(SMTP.SMTP_FROM),
    });
  } catch (error) {
    console.log(error);
    throw createHttpError(500, 'Failed to sent email!');
  }
};
