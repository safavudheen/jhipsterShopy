import dayjs from 'dayjs';
import { ISeller } from 'app/shared/model/seller.model';

export interface IUserVisit {
  id?: number;
  startDate?: string | null;
  endDate?: string | null;
  createdDate?: string | null;
  lastModifiedDate?: string | null;
  createdBy?: string | null;
  lastModifiedBy?: string | null;
  isDeleted?: boolean | null;
  seller?: ISeller | null;
}

export const defaultValue: Readonly<IUserVisit> = {
  isDeleted: false,
};
