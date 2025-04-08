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

export interface RejectFiltersProps {
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
  filterRejects: {
    rejectStatusList: { id: string | number; value: string; label: string }[];
    rejectReasonList: { id: string | number; value: string; label: string }[];
    rejectSellerList: { id: string | number; value: string; label: string }[];
    rejectActiveStatusList: { id: number; value: string; label: string }[];
  };
  filterCounts: {
    StatusCounts: Record<string, number>;
    ReasonCounts: Record<string, number>;
    SellerCounts: Record<string, number>;
    ActiveCounts: Record<string, number>;
  };
  rejects: ItemProps[];
}

export interface ReturnListProps {
  returns: ItemProps[];
  handleEditStatus: (id: string) => void;
  handleDeleteReturn: (id: string) => void;
  completeReturn: (id: string) => void;
  returnStatusList: { id: string | number; value: string; label: string }[];
  setReturns: (action: (prev: ItemProps[]) => ItemProps[]) => void;
}

export interface RejectListProps {
  rejects: ItemProps[];
  handleEditStatus: (id: string) => void;
  handleDeleteReject: (id: string) => void;
  completeReject: (id: string) => void;
  rejectStatusList: { id: string | number; value: string; label: string }[];
  setRejects: (action: (prev: ItemProps[]) => ItemProps[]) => void;
}

export interface ReturnItemListProps {
  returnItem: ItemProps;
  handleEditStatus: (id: string) => void;
  handleDeleteReturn: (id: string) => void;
  completeReturn: (id: string) => void;
  returnStatusList: { id: string | number; value: string; label: string }[];
  setReturns: (action: (prev: ItemProps[]) => ItemProps[]) => void;
}

export interface RejectItemListProps {
  rejectItem: ItemProps;
  handleEditStatus: (id: string) => void;
  handleDeleteReject: (id: string) => void;
  completeReject: (id: string) => void;
  rejectStatusList: { id: string | number; value: string; label: string }[];
  setRejects: (action: (prev: ItemProps[]) => ItemProps[]) => void;
}

export interface ReturnFormProps {
  setReturns: (action: (prev: ItemProps[]) => ItemProps[]) => void;
  returnReasonList: { id: string | number; value: string; label: string }[];
  returnSellerList: { id: string | number; value: string; label: string }[];
}

export interface RejectFormProps {
  setRejects: (action: (prev: ItemProps[]) => ItemProps[]) => void;
  rejectReasonList: { id: string | number; value: string; label: string }[];
  rejectSellerList: { id: string | number; value: string; label: string }[];
}
