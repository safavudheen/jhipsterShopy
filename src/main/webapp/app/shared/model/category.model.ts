import dayjs from 'dayjs';
import { IProduct } from 'app/shared/model/product.model';
import { IService } from 'app/shared/model/service.model';

export interface ICategory {
  id?: number;
  name?: string | null;
  imageUrl?: string | null;
  iconUrl?: string | null;
  isApproved?: boolean | null;
  createdDate?: string | null;
  lastModifiedDate?: string | null;
  createdBy?: string | null;
  lastModifiedBy?: string | null;
  isDeleted?: boolean | null;
  subCategories?: ICategory[] | null;
  products?: IProduct[] | null;
  services?: IService[] | null;
  category?: ICategory | null;
}

export const defaultValue: Readonly<ICategory> = {
  isApproved: false,
  isDeleted: false,
};
