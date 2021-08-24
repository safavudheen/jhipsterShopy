import dayjs from 'dayjs';
import { IRoom } from 'app/shared/model/room.model';

export interface IContact {
  id?: number;
  firstPersonName?: string | null;
  imageUrl?: string | null;
  whatsappNumber?: string | null;
  landlineNumber?: string | null;
  email?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  pincode?: number | null;
  latitude?: string | null;
  longitude?: string | null;
  createdDate?: string | null;
  lastModifiedDate?: string | null;
  createdBy?: string | null;
  lastModifiedBy?: string | null;
  isDeleted?: boolean | null;
  room?: IRoom | null;
}

export const defaultValue: Readonly<IContact> = {
  isDeleted: false,
};
