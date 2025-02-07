export interface returnListOption<T = string | number> {
  id: T;
  value: string;
  label: string;
}

export interface ReturnItemProps {
  id: string;
  reference: string;
  quantity: number;
  price: number;
  date: string;
  reason: string;
  seller: string;
  status: string;
  isEditing?: boolean;
  active: "active" | "finished";
}

export interface ReturnFiltersProps {
  selectedStatusFilter: string;
  setSelectedStatusFilter: (value: string) => void;
  selectedReasonFilter: string;
  setSelectedReasonFilter: (value: string) => void;
  selectedSellerFilter: string;
  setSelectedSellerFilter: (value: string) => void;
  selectedActiveFilter: string;
  setSelectedActiveFilter: (value: string) => void;

  returnStatusList: { id: number; value: string; label: string }[];
  returnReasonList: { id: number; value: string; label: string }[];
  returnSellerList: { id: number; value: string; label: string }[];
  returnActiveStatusList: { id: number; value: string; label: string }[];
}

export interface ReturnListProps {
  returns: ReturnItemProps[];
  handleEditStatus: (id: string) => void;
  handleDeleteReturn: (id: string) => void;
  completeReturn: (id: string) => void;
}

export interface ReturnItemListProps {
  returnItem: ReturnItemProps;
  handleEditStatus: (id: string) => void;
  handleDeleteReturn: (id: string) => void;
  completeReturn: (id: string) => void;
}
