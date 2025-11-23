export type AdStatus = "pending" | "approved" | "rejected" | "draft";

export type CategoryId = number;

export type SortField = "createdAt" | "price" | "priority";
export type SortOrder = "asc" | "desc";

export interface AdFilterState {
  search?: string;
  status?: AdStatus[];
  categoryId?: CategoryId;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: SortField;
  sortOrder?: SortOrder;
}
