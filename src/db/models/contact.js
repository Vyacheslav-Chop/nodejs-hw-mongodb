import { model, Schema } from 'mongoose';
import { CONTACT_TYPE } from '../../constants/constants.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: Object.values(CONTACT_TYPE),
      required: true,
      default: CONTACT_TYPE.PERSONAL,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = model('contacts', contactSchema);
