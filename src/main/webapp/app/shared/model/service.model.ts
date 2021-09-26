import dayjs from 'dayjs';
import { ICategory } from 'app/shared/model/category.model';
import { ISeller } from 'app/shared/model/seller.model';

export interface IService {
  id?: number;
  name?: string;
  code?: string | null;
  imageUrl?: string | null;
  shortDescription?: string | null;
  description?: string | null;
  externalLink?: string | null;
  createdDate?: string | null;
  lastModifiedDate?: string | null;
  createdBy?: string | null;
  lastModifiedBy?: string | null;
  isDeleted?: boolean | null;
  category?: ICategory;
  seller?: ISeller;
}

export const defaultValue: Readonly<IService> = {
  isDeleted: false,
};
