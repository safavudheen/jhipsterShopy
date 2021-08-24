import dayjs from 'dayjs';

export interface ISellerPlan {
  id?: number;
  name?: string;
  products?: number | null;
  services?: number | null;
  monthlyPrice?: number | null;
  annualPrice?: number | null;
  discount?: number | null;
  createdDate?: string | null;
  lastModifiedDate?: string | null;
  createdBy?: string | null;
  lastModifiedBy?: string | null;
  isDeleted?: boolean | null;
}

export const defaultValue: Readonly<ISellerPlan> = {
  isDeleted: false,
};
