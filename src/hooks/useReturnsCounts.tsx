import { useMemo } from "react";
import { ItemProps, SelectOption } from "../types/types";

const useReturnsCounts = (
  items: ItemProps[],
  statusList: SelectOption[],
  reasonsList: SelectOption[],
  sellersList: SelectOption[],
  activeStatusList: SelectOption[]
) => {
  const StatusCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    statusList.forEach((status) => {
      counts[status.value] = items.filter(
        (item) => item.status === status.value
      ).length;
    });
    return counts;
  }, [items, statusList]);

  const ReasonCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    reasonsList.forEach((reason) => {
      counts[reason.value] = items.filter(
        (item) => item.reason === reason.value
      ).length;
    });
    return counts;
  }, [items, reasonsList]);

  const SellerCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    sellersList.forEach((seller) => {
      counts[seller.value] = items.filter(
        (item) => item.seller === seller.value
      ).length;
    });
    return counts;
  }, [items, sellersList]);

  const ActiveCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    activeStatusList.forEach((active) => {
      counts[active.value] = items.filter(
        (item) => item.active === active.value
      ).length;
    });
    return counts;
  }, [items, activeStatusList]);

  return { StatusCounts, ReasonCounts, SellerCounts, ActiveCounts };
};

export default useReturnsCounts;
