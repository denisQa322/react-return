export interface returnListOption<T = string | number> {
  id: T;
  value: string;
  label: string;
}

export interface ReturnItem {
  id: string;
  reference: string;
  quantity: number;
  price: number;
  date: string;
  reason: string;
  seller: string;
  status: string;
  active: "active" | "finished";
}
