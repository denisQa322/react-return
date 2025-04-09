import React, { useCallback, useEffect, useState } from "react";
import "../assets/styles/cancellation.scss";

import useLocalStorage from "../hooks/useLocalStorage";
import useFilters from "../hooks/useFilters";
import useCounts from "../hooks/useCounts";

import { ItemProps, SelectOption } from "../types/types";

import LoadingComponent from "../components/LoadingIndicator/LoadingComponent";
import CancellationFilters from "../components/CancellationComponents/CancellationFilters/CancellationFilters";
import CancellationList from "../components/CancellationComponents/CancellationList/CancellationList";
import CancellationForm from "../components/CancellationComponents/CancellationForm/CancellationForm";

const ActiveStatusList: SelectOption[] = [
  { id: 1, value: "active", label: "Активный" },
  { id: 2, value: "finished", label: "Завершенный" },
];

const SellerList: SelectOption[] = [
  { id: "АП", value: "АП", label: "АП" },
  { id: "РК", value: "РК", label: "РК" },
  { id: "ЮГ", value: "ЮГ", label: "ЮГ" },
  { id: "EMEX", value: "EMEX", label: "EMEX" },
  { id: "VIVAT", value: "VIVAT", label: "VIVAT" },
];

const ReasonList: SelectOption[] = [
  { id: 1, value: "Отказ клиента", label: "Отказ клиента" },
  { id: 2, value: "Сроки истекли", label: "Сроки истекли" },
  { id: 3, value: "Ошибка синхронизации", label: "Ошибка синхронизации" },
];

const StatusList: SelectOption[] = [
  { id: 1, value: "Новая отмена", label: "Новая отмена" },
  { id: 2, value: "Запрос отправлен", label: "Запрос поставщику" },
  { id: 3, value: "Отмена принята", label: "Отмена принята" },
];

const Cancellation: React.FC = () => {
  const { state: cancellations, update: setCancellations } = useLocalStorage<
    ItemProps[]
  >("cancellations", []);

  const [loading, setLoading] = useState<boolean>(true);

  const {
    selectedStatusFilter,
    setSelectedStatusFilter,
    selectedReasonFilter,
    setSelectedReasonFilter,
    selectedSellerFilter,
    setSelectedSellerFilter,
    selectedActiveFilter,
    setSelectedActiveFilter,
    filteredItems,
  } = useFilters(cancellations, "cancellationFilters");

  const { StatusCounts, ReasonCounts, SellerCounts, ActiveCounts } = useCounts(
    cancellations,
    StatusList,
    ReasonList,
    SellerList,
    ActiveStatusList
  );

  const handleDeleteCancellation = useCallback(
    (id: string) => {
      const updatedCancellations = cancellations.filter((c) => c.id !== id);
      setCancellations(updatedCancellations);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setCancellations]
  );

  const handleEditStatus = useCallback(
    (id: string) => {
      setCancellations((prevCancellations) =>
        prevCancellations.map((c) =>
          c.id === id && c.active !== "finished"
            ? { ...c, isEditing: !c.isEditing }
            : c
        )
      );
    },
    [setCancellations]
  );

  const completeCancellation = useCallback(
    (id: string) => {
      setCancellations((prevCancellations) => {
        const updatedCancellations = prevCancellations.map((c) =>
          c.id === id
            ? {
                ...c,
                active:
                  c.active === "active"
                    ? "finished"
                    : ("active" as "active" | "finished"),
                status: "Завершенный",
              }
            : c
        );
        localStorage.setItem(
          "cancellations",
          JSON.stringify(updatedCancellations)
        );
        return updatedCancellations;
      });
    },
    [setCancellations]
  );

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const savedCancellations = JSON.parse(
        localStorage.getItem("cancellations") || "[]"
      );
      setCancellations(savedCancellations);
      setLoading(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className="container">
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <CancellationForm
            setItems={setCancellations}
            reasonList={ReasonList}
            sellerList={SellerList}
          />
          <CancellationFilters
            filters={{
              selectedStatusFilter,
              selectedSellerFilter,
              selectedReasonFilter,
              selectedActiveFilter,
            }}
            filterActions={{
              setSelectedStatusFilter,
              setSelectedReasonFilter,
              setSelectedSellerFilter,
              setSelectedActiveFilter,
            }}
            filterCounts={{
              StatusCounts,
              ReasonCounts,
              SellerCounts,
              ActiveCounts,
            }}
            filterData={{
              StatusList,
              SellerList,
              ReasonList,
              ActiveStatusList,
            }}
            items={cancellations}
          />
          <CancellationList
            setItems={setCancellations}
            items={filteredItems}
            handleEditStatus={handleEditStatus}
            handleDelete={handleDeleteCancellation}
            completeItem={completeCancellation}
            statusList={StatusList}
          />
        </>
      )}
    </main>
  );
};

export default Cancellation;
