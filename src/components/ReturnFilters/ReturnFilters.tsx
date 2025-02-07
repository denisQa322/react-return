import Select from "../SelectComponent";
import { ReturnFiltersProps } from "../../types/returns";

const ReturnFilters: React.FC<ReturnFiltersProps> = ({
  selectedStatusFilter,
  setSelectedStatusFilter,
  selectedReasonFilter,
  setSelectedReasonFilter,
  selectedSellerFilter,
  setSelectedSellerFilter,
  selectedActiveFilter,
  setSelectedActiveFilter,
  returnStatusList,
  returnReasonList,
  returnSellerList,
  returnActiveStatusList,
}) => {
  return (
    <section className="filters">
      <Select
        label="Фильтр по статусу"
        placeholder="Выбери статус"
        currentValue={selectedStatusFilter}
        onChange={setSelectedStatusFilter}
        options={returnStatusList}
      />
      <Select
        label="Фильтр по причине"
        placeholder="Выбери причину"
        currentValue={selectedReasonFilter}
        onChange={setSelectedReasonFilter}
        options={returnReasonList}
      />
      <Select
        label="Фильтр по поставщику"
        placeholder="Выбери поставщика"
        currentValue={selectedSellerFilter}
        onChange={setSelectedSellerFilter}
        options={returnSellerList}
      />
      <Select
        label="Фильтр по активности"
        placeholder="Выбери активность"
        currentValue={selectedActiveFilter}
        onChange={setSelectedActiveFilter}
        options={returnActiveStatusList}
      />
    </section>
  );
};

export default ReturnFilters;
