import { MouseEventHandler } from "react";

export interface SelectOption {
  id: string | number;
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

export interface SelectProps {
  error?: string;
  label?: string;
  placeholder: string;
  returnSelect?: string;
  cancellationSelect?: string;
  options: SelectOption[];
  currentValue: string;
  onChange: (value: string) => void;
}

export interface InputProps {
  disabled?: boolean;
  error?: string;
  label: string;
  onChange?: (value: string) => void;
  type: string;
  value: string;
}

export interface ErrorProps {
  message: string;
}

export interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  btnClass: string;
  btnImgSrc: string;
  disabled?: boolean;
  buttonAlt: string;
}

export interface FilterState {
  selectedStatusFilter: string;
  selectedReasonFilter: string;
  selectedSellerFilter: string;
  selectedActiveFilter: string;
}

export interface FilterActions {
  setSelectedStatusFilter: (value: string) => void;
  setSelectedReasonFilter: (value: string) => void;
  setSelectedSellerFilter: (value: string) => void;
  setSelectedActiveFilter: (value: string) => void;
}

export interface FilterGroup {
  StatusList: SelectOption[];
  ReasonList: SelectOption[];
  SellerList: SelectOption[];
  ActiveStatusList: SelectOption[];
}

export interface FilterCounts {
  StatusCounts: Record<string, number>;
  ReasonCounts: Record<string, number>;
  SellerCounts: Record<string, number>;
  ActiveCounts: Record<string, number>;
}

export interface GenericFiltersProps {
  filters: FilterState;
  filterActions: FilterActions;
  filterData: FilterGroup;
  filterCounts: FilterCounts;
  items: ItemProps[];
}

export interface GenericListProps {
  items: ItemProps[];
  handleEditStatus: (id: string) => void;
  handleDelete: (id: string) => void;
  completeItem: (id: string) => void;
  statusList: SelectOption[];
  setItems: (action: (prev: ItemProps[]) => ItemProps[]) => void;
}

export interface GenericItemListProps {
  item: ItemProps;
  handleEditStatus: (id: string) => void;
  handleDelete: (id: string) => void;
  completeItem: (id: string) => void;
  statusList: SelectOption[];
  setItems: (action: (prev: ItemProps[]) => ItemProps[]) => void;
}

export interface GenericFormProps {
  setItems: (action: (prev: ItemProps[]) => ItemProps[]) => void;
  reasonList: SelectOption[];
  sellerList: SelectOption[];
}
