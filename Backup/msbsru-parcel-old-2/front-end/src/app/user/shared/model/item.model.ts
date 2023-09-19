export interface ItemModel {
  id: number;
  code: string;
  old_code: string;
  track_id: string;
  received_date: Date;
  detail: string;
  print: boolean;
  status: boolean;
  remark: string;
  image_path: string;
  category_id: number;
  status_id: number;
  account_id: number;
  createdAt: Date;
  updatedAt: Date;
}
