import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { AdCard } from "@/entities/ad/model/types";
import { AdFilterState, AdStatus, SortField, SortOrder } from "@/entities/filter/model/types";

interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

const cleanRequestParams = (params: any) => {
  const cleanedParams = { ...params };
  Object.keys(cleanedParams).forEach((key) => {
    const typedKey = key as keyof typeof cleanedParams;
    if (
      cleanedParams[typedKey] === undefined ||
      cleanedParams[typedKey] === null ||
      cleanedParams[typedKey] === "" ||
      (Array.isArray(cleanedParams[typedKey]) && cleanedParams[typedKey].length === 0)
    ) {
      delete cleanedParams[typedKey];
    }
  });
  return cleanedParams;
};

const paramsToFilters = (
  searchParams: URLSearchParams
): { page: number; filters: AdFilterState } => {
  const filters: AdFilterState = {};
  const page = parseInt(searchParams.get("page") || "1", 10);

  const search = searchParams.get("search");
  if (search) filters.search = search;

  const status = searchParams.getAll("status") as AdStatus[];
  if (status.length > 0) filters.status = status;

  const categoryId = searchParams.get("categoryId");
  if (categoryId) filters.categoryId = parseInt(categoryId, 10);

  const minPrice = searchParams.get("minPrice");
  if (minPrice) filters.minPrice = parseInt(minPrice, 10);

  const maxPrice = searchParams.get("maxPrice");
  if (maxPrice) filters.maxPrice = parseInt(maxPrice, 10);

  const sortBy = searchParams.get("sortBy") as SortField;
  if (sortBy) filters.sortBy = sortBy;

  const sortOrder = searchParams.get("sortOrder") as SortOrder;
  if (sortOrder) filters.sortOrder = sortOrder;

  return { page, filters };
};

export const useAdsData = (limit = 10) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { page: activePage, filters } = paramsToFilters(searchParams);

  const [ads, setAds] = useState<AdCard[]>([]);
  const [pagination, setPagination] = useState<PaginationState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        const params = cleanRequestParams({
          page: activePage,
          limit,
          ...filters,
        });

        const response = await axios.get("/api/v1/ads", {
          params,
          paramsSerializer: {
            indexes: null,
          },
        });

        setAds(response.data.ads);
        setPagination(response.data.pagination);
      } catch (e: any) {
        setError(e.response?.data?.message || e.message || "Произошла ошибка");
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [searchParams, limit]);

  const updateSearchParams = (newParams: Record<string, any>) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const finalParams = cleanRequestParams({ ...currentParams, ...newParams });
    setSearchParams(finalParams, { replace: true });
  };

  const setPage = (newPage: number) => {
    updateSearchParams({ page: newPage });
  };

  const handleApplyFilters = (newFilters: AdFilterState) => {
    updateSearchParams({ ...newFilters, page: 1 });
  };

  return {
    ads,
    pagination,
    loading,
    error,
    activePage,
    filters,
    setPage,
    handleApplyFilters,
    limit,
  };
};
