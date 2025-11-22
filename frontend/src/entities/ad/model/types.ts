export interface AdCardData {
  id: number;
  title: string;
  description?: string;
  price: number;
  category: string;
  categoryId: number;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'normal' | 'urgent';
  createdAt: string; // ISO
  updatedAt: string; // ISO
  images: string[];
}

export interface CardProps {
  ad: AdCardData;
  onOpen?: (ad: AdCardData) => void;
  className?: string;
  style?: React.CSSProperties;
  /**
   * Показывать ли описание под заголовком (truncate).
   * По умолчанию false — дизайн как в примере.
   */
  showDescription?: boolean;
  /**
   * Максимальное количество символов в описании (если showDescription).
   */
  descriptionLimit?: number;
}
