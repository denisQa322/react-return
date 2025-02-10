import React, { useCallback, useEffect, useMemo, useState } from "react";
import "../assets/styles/return.scss";

import Button from "../components/ButtonComponent";
import Input from "../components/InputComponent";
import Select from "../components/SelectComponent";
import useLocalStorage from "../hooks/useLocalStorage";
import useReturnFilters from "../hooks/useReturnFilters";
import useReturnsCounts from "../hooks/useReturnsCounts";

import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { v4 as uuidv4 } from "uuid";
import AddButton from "../assets/icons/add-button.svg";

import { ReturnSchema } from "../schemas/ReturnSchema";
import { ReturnItemProps, returnListOption } from "../types/returns";
import LoadingComponent from "../components/LoadingIndicator/LoadingComponent";
import ReturnFilters from "../components/ReturnFilters/ReturnFilters";
import ReturnList from "../components/ReturnList/ReturnList";

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
  const [reference, setReference] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const date = format(new Date(), "dd MMMM yyyy", { locale: ru });
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [selectedSeller, setSelectedSeller] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
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

  const emptyData = useMemo(() => {
    return (
      reference.length < 7 ||
      !quantity ||
      !price ||
      !selectedReason ||
      !selectedSeller ||
      Object.values(errors).some((e) => e.length > 0)
    );
  }, [reference, quantity, price, selectedReason, selectedSeller, errors]);

  const validateField = (
    field: keyof typeof ReturnSchema.shape,
    value: unknown
  ) => {
    const schema = ReturnSchema.shape[field];

    const result = schema.safeParse(value);

    setErrors((prev) => ({
      ...prev,
      [field]: result.success
        ? []
        : result.error?.errors.map((e) => e.message) || [],
    }));
  };

  const handleSellerChange = useCallback(
    (newSeller: string) => {
      setSelectedSeller(newSeller);
      validateField("seller", newSeller);
    },
    [setSelectedSeller]
  );
  const handleReasonChange = useCallback(
    (newReason: string) => {
      setSelectedReason(newReason);
      validateField("reason", newReason);
    },
    [setSelectedReason]
  );

  const handleReferenceChange = useCallback(
    (newReference: string) => {
      setReference(newReference);
      if (newReference.length > 0) {
        validateField("reference", newReference);
      } else {
        setErrors((prev) => ({ ...prev, reference: [] }));
      }
    },
    [setReference]
  );

  const handleQuantityChange = useCallback(
    (newQuantity: string) => {
      const numValue = newQuantity === "" ? 0 : Number(newQuantity);
      setQuantity(newQuantity);
      validateField("quantity", isNaN(numValue) ? undefined : numValue);
    },
    [setQuantity]
  );

  const handlePriceChange = useCallback(
    (newPrice: string) => {
      const numValue = newPrice === "" ? 0 : Number(newPrice);
      setPrice(newPrice);
      validateField("price", isNaN(numValue) ? undefined : numValue);
    },
    [setPrice]
  );

  const resetForm = () => {
    setReference("");
    setQuantity("");
    setPrice("");
    setSelectedReason("");
    setSelectedSeller("");
    setErrors({});
  };

  const handleAddReturn = useCallback(
    () => {
      const newReturn: ReturnItemProps = {
        id: uuidv4(),
        reference,
        quantity: Number(quantity),
        price: Number(price),
        date,
        reason: selectedReason,
        seller: selectedSeller,
        status: "Новый возврат",
        active: "active",
      };
      const validationResult = ReturnSchema.safeParse(newReturn);

      if (!validationResult.success) {
        const { fieldErrors } = validationResult.error.flatten();
        setErrors(fieldErrors);
        return;
      }
      setReturns([...returns, newReturn]);
      resetForm();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      reference,
      quantity,
      price,
      date,
      selectedReason,
      selectedSeller,
      setReturns,
    ]
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

  const filterProps = useReturnFilters(returns);

  return (
    <main className="container">
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <button
            onClick={() => {
              localStorage.clear();
              location.reload();
            }}
          >
            Очистить Local Storage
          </button>
          <section className="create">
            <div className="return-create">
              <div className="return-create-inputs">
                <Input
                  label="Референс"
                  type="text"
                  value={reference}
                  onChange={handleReferenceChange}
                  error={errors.reference?.[0]}
                />
                <Input
                  label="Количество"
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  error={errors.quantity?.[0]}
                />
                <Input
                  label="Стоимость"
                  type="number"
                  value={price}
                  onChange={handlePriceChange}
                  error={errors.price?.[0]}
                />
                <Input label="Дата" type="text" disabled={true} value={date} />
              </div>
              <div className="return-create-selects">
                <Select
                  label="Причина возврата"
                  placeholder="Выбери причину"
                  returnSelect="return-create-reason select"
                  currentValue={selectedReason}
                  onChange={handleReasonChange}
                  options={returnReasonList}
                  error={errors.reason?.[0]}
                />
                <Select
                  label="Поставщик"
                  placeholder="Выбери поставщика"
                  returnSelect="return-create-seller select"
                  currentValue={selectedSeller}
                  onChange={handleSellerChange}
                  options={returnSellerList}
                  error={errors.seller?.[0]}
                />
              </div>
              <Button
                btnClass="return-create-icon"
                btnImgSrc={AddButton}
                buttonAlt="Добавить возврат"
                disabled={emptyData}
                onClick={handleAddReturn}
              />
            </div>
          </section>
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
            returns={filterProps.filteredReturns}
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
