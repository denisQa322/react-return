import { useMemo } from "react";
import { ItemProps, SelectOption } from "../types/types";

const useReturnsCounts = (
  returns: ItemProps[],
  returnStatusList: SelectOption[],
  returnReasonsList: SelectOption[],
  returnSellersList: SelectOption[],
  returnActiveStatusList: SelectOption[]
) => {
  const StatusCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    returnStatusList.forEach((status) => {
      counts[status.value] = returns.filter(
        (item) => item.status === status.value
      ).length;
    });
    return counts;
  }, [returns, returnStatusList]);

  const ReasonCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    returnReasonsList.forEach((reason) => {
      counts[reason.value] = returns.filter(
        (item) => item.reason === reason.value
      ).length;
    });
    return counts;
  }, [returns, returnReasonsList]);

  const SellerCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    returnSellersList.forEach((seller) => {
      counts[seller.value] = returns.filter(
        (item) => item.seller === seller.value
      ).length;
    });
    return counts;
  }, [returns, returnSellersList]);

  const ActiveCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    returnActiveStatusList.forEach((active) => {
      counts[active.value] = returns.filter(
        (item) => item.active === active.value
      ).length;
    });
    return counts;
  }, [returns, returnActiveStatusList]);

  return { StatusCounts, ReasonCounts, SellerCounts, ActiveCounts };
};

export default useReturnsCounts;
