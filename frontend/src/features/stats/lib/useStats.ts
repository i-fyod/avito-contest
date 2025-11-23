import axios from "axios";
import { useEffect, useState } from "react";

import {
  ActivityData,
  CategoriesData,
  DecisionsData,
  Period,
  StatsSummary,
} from "@/shared/api/stats/types";

interface UseStatsResult {
  selectedPeriod: Period;
  setSelectedPeriod: (period: Period) => void;
  summaryStats: StatsSummary | null;
  activityData: ActivityData[];
  decisionsData: DecisionsData | null;
  categoriesData: CategoriesData | null;
  loading: boolean;
  error: string | null;
}

export const useStats = (): UseStatsResult => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("week");
  const [summaryStats, setSummaryStats] = useState<StatsSummary | null>(null);
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [decisionsData, setDecisionsData] = useState<DecisionsData | null>(null);
  const [categoriesData, setCategoriesData] = useState<CategoriesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        let periodParam = "custom";
        let startDate: string;
        let endDate: string;

        const today = new Date();
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 6);
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 29);

        if (selectedPeriod === "today") {
          startDate = today.toISOString().split("T")[0];
          endDate = today.toISOString().split("T")[0];
        } else if (selectedPeriod === "week") {
          startDate = sevenDaysAgo.toISOString().split("T")[0];
          endDate = today.toISOString().split("T")[0];
        } else {
          // month
          startDate = thirtyDaysAgo.toISOString().split("T")[0];
          endDate = today.toISOString().split("T")[0];
        }

        const commonParams = { period: periodParam, startDate, endDate };

        const [summaryRes, activityRes, decisionsRes, categoriesRes] = await Promise.all([
          axios.get<StatsSummary>("/api/v1/stats/summary", { params: commonParams }),
          axios.get<ActivityData[]>("/api/v1/stats/chart/activity", { params: commonParams }),
          axios.get<DecisionsData>("/api/v1/stats/chart/decisions", { params: commonParams }),
          axios.get<CategoriesData>("/api/v1/stats/chart/categories", { params: commonParams }),
        ]);

        setSummaryStats(summaryRes.data);
        setActivityData(activityRes.data);
        setDecisionsData(decisionsRes.data);
        setCategoriesData(categoriesRes.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Не удалось загрузить статистику. Пожалуйста, попробуйте еще раз.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [selectedPeriod]);

  return {
    selectedPeriod,
    setSelectedPeriod,
    summaryStats,
    activityData,
    decisionsData,
    categoriesData,
    loading,
    error,
  };
};
