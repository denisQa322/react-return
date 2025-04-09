import { useState, useMemo, useEffect } from "react";
import { ItemProps } from "../types/types";

const STORAGE_KEY = "cancellationFilters";

const getInitialFilter = (key: string, defaultValue: string) => {
  const storedFilters = localStorage.getItem(STORAGE_KEY);
  const parsedFilters = storedFilters ? JSON.parse(storedFilters) : {};
  return parsedFilters[key] !== undefined ? parsedFilters[key] : defaultValue;
};

const useCancellationFilters = (cancellations: ItemProps[]) => {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState(() =>
    getInitialFilter("status", "")
  );
  const [selectedReasonFilter, setSelectedReasonFilter] = useState(() =>
    getInitialFilter("reason", "")
  );
  const [selectedSellerFilter, setSelectedSellerFilter] = useState(() =>
    getInitialFilter("seller", "")
  );
  const [selectedActiveFilter, setSelectedActiveFilter] = useState(() =>
    getInitialFilter("active", "active")
  );

  const filteredCancellations = useMemo(() => {
    return cancellations.filter((item) => {
      return (
        (!selectedStatusFilter || item.status === selectedStatusFilter) &&
        (!selectedReasonFilter || item.reason === selectedReasonFilter) &&
        (!selectedSellerFilter || item.seller === selectedSellerFilter) &&
        (!selectedActiveFilter || item.active === selectedActiveFilter)
      );
    });
  }, [
    cancellations,
    selectedStatusFilter,
    selectedReasonFilter,
    selectedSellerFilter,
    selectedActiveFilter,
  ]);
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
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
    filteredCancellations,
  };
};

export default useCancellationFilters;
