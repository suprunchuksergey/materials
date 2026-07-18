export type SelectionStatus = "draft" | "sent" | "viewed" | "delivered";

export interface SelectionItem {
  id: string;
  materialId: string;
  colorId: string | null;
  sizeId: string | null;
  quantity: number;
  comment: string;
}

export interface Selection {
  id: string;
  userId: string;
  title: string;
  recipientEmail: string;
  items: SelectionItem[];
  status: SelectionStatus;
  createdAt: string;
  updatedAt: string;
}
