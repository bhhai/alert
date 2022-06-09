export interface PaginationModel {
  name: string;
  displayNumber: number;
  page: number;
  sizeLimit: number;
  totalPage: number;
  totalItem: number;
  setPage: (page: number) => void;
  chooseSizeLimit?: (limit: number) => void;
  isChooseSizeLimit?: boolean;
}
