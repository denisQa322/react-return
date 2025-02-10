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
  filters: {
    selectedStatusFilter: string;
    selectedReasonFilter: string;
    selectedSellerFilter: string;
    selectedActiveFilter: string;
  };
  filterActions: {
    setSelectedStatusFilter: (value: string) => void;
    setSelectedReasonFilter: (value: string) => void;
    setSelectedSellerFilter: (value: string) => void;
    setSelectedActiveFilter: (value: string) => void;
  };
  filterReturns: {
    returnStatusList: { id: string | number; value: string; label: string }[];
    returnReasonList: { id: string | number; value: string; label: string }[];
    returnSellerList: { id: string | number; value: string; label: string }[];
    returnActiveStatusList: { id: number; value: string; label: string }[];
  };
  filterCounts: {
    StatusCounts: Record<string, number>;
    ReasonCounts: Record<string, number>;
    SellerCounts: Record<string, number>;
    ActiveCounts: Record<string, number>;
  };
  returns: ReturnItemProps[];
}

export interface ReturnListProps {
  returns: ReturnItemProps[];
  handleEditStatus: (id: string) => void;
  handleDeleteReturn: (id: string) => void;
  completeReturn: (id: string) => void;
  returnStatusList: { id: string | number; value: string; label: string }[];
  setReturns: (action: (prev: ReturnItemProps[]) => ReturnItemProps[]) => void;
}

export interface ReturnItemListProps {
  returnItem: ReturnItemProps;
  handleEditStatus: (id: string) => void;
  handleDeleteReturn: (id: string) => void;
  completeReturn: (id: string) => void;
  returnStatusList: { id: string | number; value: string; label: string }[];
  setReturns: (action: (prev: ReturnItemProps[]) => ReturnItemProps[]) => void;
}
