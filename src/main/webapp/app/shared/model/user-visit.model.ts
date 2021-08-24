import dayjs from 'dayjs';
import { IRoom } from 'app/shared/model/room.model';

export interface IUserVisit {
  id?: number;
  startDate?: string | null;
  endDate?: string | null;
  createdDate?: string | null;
  lastModifiedDate?: string | null;
  createdBy?: string | null;
  lastModifiedBy?: string | null;
  isDeleted?: boolean | null;
  room?: IRoom | null;
}

export const defaultValue: Readonly<IUserVisit> = {
  isDeleted: false,
};
