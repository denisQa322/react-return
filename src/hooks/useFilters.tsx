import { useState, useMemo, useEffect } from "react";
import { ItemProps } from "../types/types";

const getInitialFilter = (
  storageKey: string,
  key: string,
  defaultValue: string
) => {
  const storedFilters = localStorage.getItem(storageKey);
  const parsedFilters = storedFilters ? JSON.parse(storedFilters) : {};
  return parsedFilters[key] !== undefined ? parsedFilters[key] : defaultValue;
};

const useFilters = (items: ItemProps[], storageKey: string) => {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState(() =>
    getInitialFilter(storageKey, "status", "")
  );
  const [selectedReasonFilter, setSelectedReasonFilter] = useState(() =>
    getInitialFilter(storageKey, "reason", "")
  );
  const [selectedSellerFilter, setSelectedSellerFilter] = useState(() =>
    getInitialFilter(storageKey, "seller", "")
  );
  const [selectedActiveFilter, setSelectedActiveFilter] = useState(() =>
    getInitialFilter(storageKey, "active", "active")
  );

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return (
        (!selectedStatusFilter || item.status === selectedStatusFilter) &&
        (!selectedReasonFilter || item.reason === selectedReasonFilter) &&
        (!selectedSellerFilter || item.seller === selectedSellerFilter) &&
        (!selectedActiveFilter || item.active === selectedActiveFilter)
      );
    });
  }, [
    items,
    selectedStatusFilter,
    selectedReasonFilter,
    selectedSellerFilter,
    selectedActiveFilter,
  ]);
  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        status: selectedStatusFilter,
        reason: selectedReasonFilter,
        seller: selectedSellerFilter,
        active: selectedActiveFilter,
      })
    );
  }, [
    selectedStatusFilter,
    selectedReasonFilter,
    selectedSellerFilter,
    selectedActiveFilter,
    storageKey,
  ]);
  return {
    selectedStatusFilter,
    selectedReasonFilter,
    selectedSellerFilter,
    selectedActiveFilter,
    setSelectedStatusFilter,
    setSelectedReasonFilter,
    setSelectedSellerFilter,
    setSelectedActiveFilter,
    filteredItems,
  };
};

export default useFilters;
