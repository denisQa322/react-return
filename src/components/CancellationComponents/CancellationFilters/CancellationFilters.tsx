import Select from "../../SelectComponent";
import { GenericFiltersProps } from "../../../types/types";

const CancellationFilters: React.FC<GenericFiltersProps> = ({
  filters,
  filterActions,
  filterData,
  filterCounts,
  items,
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
        label: `${defaultLabel} (${items.length})`,
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
        cancellationSelect="status-filter select"
        label="Фильтр по статусу"
        placeholder="Выбери статус"
        currentValue={filters.selectedStatusFilter}
        onChange={(value) =>
          handleFilterChange("setSelectedStatusFilter", value)
        }
        options={generateFilterOptions(
          filterData.StatusList,
          filterCounts.StatusCounts,
          "Все статусы"
        )}
      />
      <Select
        cancellationSelect="reason-filter select"
        label="Фильтр по причине"
        placeholder="Выбери причину"
        currentValue={filters.selectedReasonFilter}
        onChange={(value) =>
          handleFilterChange("setSelectedReasonFilter", value)
        }
        options={generateFilterOptions(
          filterData.ReasonList,
          filterCounts.ReasonCounts,
          "Все причины"
        )}
      />
      <Select
        cancellationSelect="seller-filter select"
        label="Фильтр по поставщику"
        placeholder="Выбери поставщика"
        currentValue={filters.selectedSellerFilter}
        onChange={(value) =>
          handleFilterChange("setSelectedSellerFilter", value)
        }
        options={generateFilterOptions(
          filterData.SellerList,
          filterCounts.SellerCounts,
          "Все поставщики"
        )}
      />
      <Select
        cancellationSelect="active-filter select"
        label="Фильтр по активности"
        placeholder="Выбери активность"
        currentValue={filters.selectedActiveFilter}
        onChange={(value) =>
          handleFilterChange("setSelectedActiveFilter", value)
        }
        options={generateFilterOptions(
          filterData.ActiveStatusList,
          filterCounts.ActiveCounts,
          "Вся активность"
        )}
      />
    </section>
  );
};

export default CancellationFilters;
