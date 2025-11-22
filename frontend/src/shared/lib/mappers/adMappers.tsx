import React from 'react';
import { Clock4, CheckCircle2, XCircle, Bolt } from 'lucide-react';
import { AdCardData } from '@/entities/ad/model/types';

export const statusMap: Record<
  AdCardData['status'],
  {
    c: string;
    icon: React.ReactNode;
    label: string;
  }
> = {
  pending: {
    c: 'yellow.7',
    icon: <Clock4 size={14} />,
    label: 'На модерации',
  },
  approved: {
    c: 'green.7',
    icon: <CheckCircle2 size={14} />,
    label: 'Одобрено',
  },
  rejected: {
    c: 'red.7',
    icon: <XCircle size={14} />,
    label: 'Отклонено',
  },
};

export const priorityMap: Record<
  AdCardData['priority'],
  {
    bg: string;
    c: string;
    icon: React.ReactNode | null;
    label: string;
  }
> = {
  normal: {
    bg: 'blue.1',
    c: 'blue.7',
    icon: null,
    label: 'Обычный',
  },
  urgent: {
    bg: 'orange.1',
    c: 'orange.7',
    icon: <Bolt size={14} />,
    label: 'Срочный',
  },
};
