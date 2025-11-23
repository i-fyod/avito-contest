import { Ad } from "@/entities/ad/model/types";

import apiClient from "./client";

export interface GetAdsParams {
  page?: number;
  limit?: number;
  status?: string | string[];
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: "createdAt" | "price" | "priority";
  sortOrder?: "asc" | "desc";
}

export interface GetAdsResponse {
  ads: Ad[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export const getAds = async (params?: GetAdsParams): Promise<GetAdsResponse> => {
  const response = await apiClient.get<GetAdsResponse>("/ads", { params });
  return response.data;
};

export const getAdDetails = async (id: number): Promise<Ad> => {
  const response = await apiClient.get<Ad>(`/ads/${id}`);
  return response.data;
};

interface RejectPayload {
  reason: string;
  comment?: string;
}

export const rejectAd = async (
  id: number,
  payload: RejectPayload
): Promise<{ message: string; ad: Ad }> => {
  const response = await apiClient.post(`/ads/${id}/reject`, payload);
  return response.data;
};

export const approveAd = async (id: number): Promise<{ message: string; ad: Ad }> => {
  const response = await apiClient.post(`/ads/${id}/approve`);
  return response.data;
};

export const requestAdChanges = async (id: number): Promise<{ message: string; ad: Ad }> => {
  const response = await apiClient.post(`/ads/${id}/request-changes`, {
    reason: "Запрос изменений",
  });
  return response.data;
};
