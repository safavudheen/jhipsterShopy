import dayjs from 'dayjs';
import { ISeller } from 'app/shared/model/seller.model';

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
  seller?: ISeller | null;
}

export const defaultValue: Readonly<IContact> = {
  isDeleted: false,
};
