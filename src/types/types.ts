export interface SelectOption<T = string | number> {
  id: T;
  value: string;
  label: string;
}

export interface ItemProps {
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
  returns: ItemProps[];
}

export interface CancellationFiltersProps {
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
  filterCancellations: {
    cancellationStatusList: {
      id: string | number;
      value: string;
      label: string;
    }[];
    cancellationReasonList: {
      id: string | number;
      value: string;
      label: string;
    }[];
    cancellationSellerList: {
      id: string | number;
      value: string;
      label: string;
    }[];
    cancellationActiveStatusList: {
      id: number;
      value: string;
      label: string;
    }[];
  };
  filterCounts: {
    StatusCounts: Record<string, number>;
    ReasonCounts: Record<string, number>;
    SellerCounts: Record<string, number>;
    ActiveCounts: Record<string, number>;
  };
  cancellations: ItemProps[];
}

export interface ReturnListProps {
  returns: ItemProps[];
  handleEditStatus: (id: string) => void;
  handleDeleteReturn: (id: string) => void;
  completeReturn: (id: string) => void;
  returnStatusList: { id: string | number; value: string; label: string }[];
  setReturns: (action: (prev: ItemProps[]) => ItemProps[]) => void;
}

export interface CancellationListProps {
  cancellations: ItemProps[];
  handleEditStatus: (id: string) => void;
  handleDeleteCancellation: (id: string) => void;
  completeCancellation: (id: string) => void;
  cancellationStatusList: {
    id: string | number;
    value: string;
    label: string;
  }[];
  setCancellations: (action: (prev: ItemProps[]) => ItemProps[]) => void;
}

export interface ReturnItemListProps {
  returnItem: ItemProps;
  handleEditStatus: (id: string) => void;
  handleDeleteReturn: (id: string) => void;
  completeReturn: (id: string) => void;
  returnStatusList: { id: string | number; value: string; label: string }[];
  setReturns: (action: (prev: ItemProps[]) => ItemProps[]) => void;
}

export interface CancellationItemListProps {
  cancellationItem: ItemProps;
  handleEditStatus: (id: string) => void;
  handleDeleteCancellation: (id: string) => void;
  completeCancellation: (id: string) => void;
  cancellationStatusList: {
    id: string | number;
    value: string;
    label: string;
  }[];
  setCancellations: (action: (prev: ItemProps[]) => ItemProps[]) => void;
}

export interface ReturnFormProps {
  setReturns: (action: (prev: ItemProps[]) => ItemProps[]) => void;
  returnReasonList: { id: string | number; value: string; label: string }[];
  returnSellerList: { id: string | number; value: string; label: string }[];
}

export interface CancellationFormProps {
  setCancellations: (action: (prev: ItemProps[]) => ItemProps[]) => void;
  cancellationReasonList: {
    id: string | number;
    value: string;
    label: string;
  }[];
  cancellationSellerList: {
    id: string | number;
    value: string;
    label: string;
  }[];
}
