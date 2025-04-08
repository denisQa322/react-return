import Select from "../../SelectComponent";
import { ReturnFiltersProps } from "../../../types/types";
import "./returnFilters.scss";

const ReturnFilters: React.FC<ReturnFiltersProps> = ({
  filters,
  filterActions,
  filterReturns,
  filterCounts,
  returns,
}) => {
  const handleFilterChange = (
    key: keyof typeof filterActions,
    value: string
  ) => {
    filterActions[key](value);
  };

  const generateFilterOptions = (
    list: { id: number | string; value: string; label: string }[],
    countMap: Record<string, number>,
    defaultLabel: string
  ) => {
    const prefix = defaultLabel.replace(/ /g, "-");

    return [
      {
        id: `${prefix}-all`,
        value: "",
        label: `${defaultLabel} (${returns.length})`,
      },
      ...list.map((item) => ({
        ...item,
        label: `${item.label} (${countMap[item.value] ?? 0})`,
      })),
    ];
  };

  return (
    <section className="filters">
      <Select
        returnSelect="status-filter select"
        label="Фильтр по статусу"
        placeholder="Выбери статус"
        currentValue={filters.selectedStatusFilter}
        onChange={(value) =>
          handleFilterChange("setSelectedStatusFilter", value)
        }
        options={generateFilterOptions(
          filterReturns.returnStatusList,
          filterCounts.StatusCounts,
          "Все статусы"
        )}
      />
      <Select
        returnSelect="reason-filter select"
        label="Фильтр по причине"
        placeholder="Выбери причину"
        currentValue={filters.selectedReasonFilter}
        onChange={(value) =>
          handleFilterChange("setSelectedReasonFilter", value)
        }
        options={generateFilterOptions(
          filterReturns.returnReasonList,
          filterCounts.ReasonCounts,
          "Все причины"
        )}
      />
      <Select
        returnSelect="seller-filter select"
        label="Фильтр по поставщику"
        placeholder="Выбери поставщика"
        currentValue={filters.selectedSellerFilter}
        onChange={(value) =>
          handleFilterChange("setSelectedSellerFilter", value)
        }
        options={generateFilterOptions(
          filterReturns.returnSellerList,
          filterCounts.SellerCounts,
          "Все поставщики"
        )}
      />
      <Select
        returnSelect="active-filter select"
        label="Фильтр по активности"
        placeholder="Выбери активность"
        currentValue={filters.selectedActiveFilter}
        onChange={(value) =>
          handleFilterChange("setSelectedActiveFilter", value)
        }
        options={generateFilterOptions(
          filterReturns.returnActiveStatusList,
          filterCounts.ActiveCounts,
          "Вся активность"
        )}
      />
    </section>
  );
};

export default ReturnFilters;
