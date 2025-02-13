import React, { useCallback, useEffect, useState } from "react";
import "../assets/styles/return.scss";

import useLocalStorage from "../hooks/useLocalStorage";
import useReturnFilters from "../hooks/useReturnFilters";
import useReturnsCounts from "../hooks/useReturnsCounts";

import { ReturnItemProps, returnListOption } from "../types/returns";

import LoadingComponent from "../components/LoadingIndicator/LoadingComponent";
import ReturnFilters from "../components/ReturnFilters/ReturnFilters";
import ReturnList from "../components/ReturnList/ReturnList";
import ReturnForm from "../components/ReturnForm/ReturnForm";

const returnActiveStatusList = [
  { id: 1, value: "active", label: "Активный" },
  { id: 2, value: "finished", label: "Завершенный" },
];

const returnSellerList: returnListOption[] = [
  { id: "АП", value: "АП", label: "АП" },
  { id: "РК", value: "РК", label: "РК" },
  { id: "ЮГ", value: "ЮГ", label: "ЮГ" },
  { id: "EMEX", value: "EMEX", label: "EMEX" },
];

const returnReasonList: returnListOption[] = [
  { id: 1, value: "Б/У", label: "Б/У" },
  { id: 2, value: "Брак", label: "Брак" },
  { id: 3, value: "Неверное вложение", label: "Неверное вложение" },
  { id: 4, value: "Некомплект/Недостача", label: "Некомплект/Недостача" },
  { id: 5, value: "Повреждение", label: "Повреждение" },
];

const returnStatusList: returnListOption[] = [
  { id: 0, value: "Новый возврат", label: "Новый возврат" },
  { id: 1, value: "Запрос поставщику", label: "Запрос поставщику" },
  { id: 2, value: "Запрос на возврат", label: "Запрос на возврат" },
  { id: 3, value: "Запрос на утиль", label: "Запрос на утиль" },
  { id: 4, value: "Возврат получен", label: "Возврат получен" },
  { id: 5, value: "Возврат проведен", label: "Возврат проведен" },
];

const Return: React.FC = () => {
  const { state: returns, update: setReturns } = useLocalStorage<
    ReturnItemProps[]
  >("returns", []);
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
    filteredReturns,
  } = useReturnFilters(returns);

  const { StatusCounts, ReasonCounts, SellerCounts, ActiveCounts } =
    useReturnsCounts(
      returns,
      returnStatusList,
      returnReasonList,
      returnSellerList,
      returnActiveStatusList
    );

  const handleDeleteReturn = useCallback(
    (id: string) => {
      const updatedReturns = returns.filter((ret) => ret.id !== id);
      setReturns(updatedReturns);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setReturns]
  );

  const handleEditStatus = useCallback(
    (id: string) => {
      setReturns((prevReturns) =>
        prevReturns.map((r) =>
          r.id === id && r.active !== "finished"
            ? { ...r, isEditing: !r.isEditing }
            : r
        )
      );
    },
    [setReturns]
  );

  const completeReturn = useCallback(
    (id: string) => {
      setReturns((prevReturns) => {
        const updatedReturns = prevReturns.map((r) =>
          r.id === id
            ? {
                ...r,
                active:
                  r.active === "active"
                    ? "finished"
                    : ("active" as "active" | "finished"),
                status: "Завершенный",
              }
            : r
        );

        localStorage.setItem("returns", JSON.stringify(updatedReturns));
        return updatedReturns;
      });
    },
    [setReturns]
  );

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const savedReturns = JSON.parse(localStorage.getItem("returns") || "[]");
      setReturns(savedReturns);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <main className="container">
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <button
            className="clean-storage"
            onClick={() => {
              localStorage.clear();
              location.reload();
            }}
          >
            Очистить Local Storage
          </button>
          <ReturnForm
            setReturns={setReturns}
            returnReasonList={returnReasonList}
            returnSellerList={returnSellerList}
          />
          <ReturnFilters
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
            filterReturns={{
              returnStatusList,
              returnSellerList,
              returnReasonList,
              returnActiveStatusList,
            }}
            returns={returns}
          />
          <ReturnList
            setReturns={setReturns}
            returns={filteredReturns}
            handleEditStatus={handleEditStatus}
            handleDeleteReturn={handleDeleteReturn}
            completeReturn={completeReturn}
            returnStatusList={returnStatusList}
          />
        </>
      )}
    </main>
  );
};

export default Return;
