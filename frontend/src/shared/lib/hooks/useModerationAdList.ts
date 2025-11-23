import { useCallback, useEffect, useState } from "react";

import type { Ad } from "@/entities/ad/model/types";

import { getAds } from "@/shared/api/ads";

interface UseModerationAdListOptions {
  status?: string | string[];
}

export const useModerationAdList = (options?: UseModerationAdListOptions) => {
  const [adIds, setAdIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAdList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAds({ limit: 1000, sortBy: "createdAt", sortOrder: "asc" });
      const fetchedAdIds = response.ads.map((ad) => ad.id);
      console.log("useModerationAdList: Fetched ad IDs:", fetchedAdIds);
      setAdIds(fetchedAdIds);
    } catch (err) {
      console.error("useModerationAdList: Error fetching ad list:", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [options?.status]);

  useEffect(() => {
    fetchAdList();
  }, [fetchAdList]);

  const getPreviousAdId = useCallback(
    (currentAdId: number): number | null => {
      console.log("getPreviousAdId: currentAdId", currentAdId, "adIds", adIds);
      const currentIndex = adIds.indexOf(currentAdId);
      console.log("getPreviousAdId: currentIndex", currentIndex);
      if (currentIndex > 0) {
        const prevId = adIds[currentIndex - 1];
        console.log("getPreviousAdId: prevId", prevId);
        return prevId;
      }
      console.log("getPreviousAdId: returning null");
      return null;
    },
    [adIds]
  );

  const getNextAdId = useCallback(
    (currentAdId: number): number | null => {
      console.log("getNextAdId: currentAdId", currentAdId, "adIds", adIds);
      const currentIndex = adIds.indexOf(currentAdId);
      console.log("getNextAdId: currentIndex", currentIndex);
      if (currentIndex !== -1 && currentIndex < adIds.length - 1) {
        const nextId = adIds[currentIndex + 1];
        console.log("getNextAdId: nextId", nextId);
        return nextId;
      }
      console.log("getNextAdId: returning null");
      return null;
    },
    [adIds]
  );

  return { adIds, loading, error, refetchAdList: fetchAdList, getPreviousAdId, getNextAdId };
};
