import { Bolt, CheckCircle2, Clock4, Edit, XCircle } from "lucide-react";

import React from "react";

import { AdCard } from "@/entities/ad/model/types";

export const statusMap: Record<
  AdCard["status"],
  {
    c: string;
    icon: React.ReactNode;
    label: string;
  }
> = {
  pending: {
    c: "yellow.7",
    icon: <Clock4 size={14} />,
    label: "На модерации",
  },
  approved: {
    c: "green.7",
    icon: <CheckCircle2 size={14} />,
    label: "Одобрено",
  },
  rejected: {
    c: "red.7",
    icon: <XCircle size={14} />,
    label: "Отклонено",
  },
  draft: {
    c: "gray.5",
    icon: <Edit size={14} />,
    label: "Черновик",
  },
};

export const priorityMap: Record<
  AdCard["priority"],
  {
    bg: string;
    c: string;
    icon: React.ReactNode | null;
    label: string;
  }
> = {
  normal: {
    bg: "blue.1",
    c: "blue.7",
    icon: null,
    label: "Обычный",
  },
  urgent: {
    bg: "orange.1",
    c: "orange.7",
    icon: <Bolt size={14} />,
    label: "Срочный",
  },
};
