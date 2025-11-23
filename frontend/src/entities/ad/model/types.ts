export interface Seller {
  id: number;
  name: string;

  totalAds: number;
  registeredAt: string;
}

export interface ModerationHistory {
  id: number;
  moderatorId: number;
  moderatorName: string;
  action: "approved" | "rejected" | "requestChanges";
  reason: string | null;
  comment: string;
  timestamp: string;
}

export interface Ad {
  id: number;
  title: string;
  price: number;
  category: string;
  categoryId: number;
  status: "pending" | "approved" | "rejected" | "draft";
  priority: "normal" | "urgent";
  createdAt: string;
  updatedAt: string;
  images: string[];

  description: string;
  characteristics: { [key: string]: string };
  seller: Seller;
  moderationHistory: ModerationHistory[];

  previousAdId?: number | null;
  nextAdId?: number | null;
}

export type AdCard = Pick<
  Ad,
  "id" | "title" | "price" | "category" | "status" | "createdAt" | "images" | "priority"
>;
