import { useCallback, useEffect, useState } from "react";

import { Ad } from "@/entities/ad/model/types";

import { getAdDetails } from "@/shared/api";

export const useAdDetails = (id: number | undefined) => {
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAdDetails = useCallback(async () => {
    if (id === undefined) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await getAdDetails(id);
      setAd(response);
      setError(null);
    } catch (err) {
      setError(err as Error);
      setAd(null); // Clear ad data on error
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAdDetails();
  }, [fetchAdDetails]);

  return { ad, loading, error, refetch: fetchAdDetails };
};
