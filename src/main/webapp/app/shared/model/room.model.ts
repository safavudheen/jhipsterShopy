import dayjs from 'dayjs';
import { IContact } from 'app/shared/model/contact.model';
import { IProduct } from 'app/shared/model/product.model';
import { IService } from 'app/shared/model/service.model';
import { IUserVisit } from 'app/shared/model/user-visit.model';
import { ISellerPlan } from 'app/shared/model/seller-plan.model';
import { RoomStatus } from 'app/shared/model/enumerations/room-status.model';

export interface IRoom {
  id?: number;
  name?: string;
  logoImageUrl?: string | null;
  pincode?: number | null;
  latitude?: string | null;
  longitude?: string | null;
  planExpiryDate?: string | null;
  status?: RoomStatus | null;
  websiteLink?: string | null;
  createdDate?: string | null;
  lastModifiedDate?: string | null;
  createdBy?: string | null;
  lastModifiedBy?: string | null;
  isDeleted?: boolean | null;
  contact?: IContact | null;
  products?: IProduct[] | null;
  services?: IService[] | null;
  userVisits?: IUserVisit[] | null;
  sellerPlan?: ISellerPlan | null;
}

export const defaultValue: Readonly<IRoom> = {
  isDeleted: false,
};
