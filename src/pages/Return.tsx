import React, { useCallback, useEffect, useMemo, useState } from "react";
import "../assets/styles/return.scss";

import Button from "../components/ButtonComponent";
import Input from "../components/InputComponent";
import Select from "../components/SelectComponent";
import useLocalStorage from "../hooks/useLocalStorage";
import useReturnFilters from "../hooks/useReturnFilters ";
import useReturnsCounts from "../hooks/useReturnsCounts";

import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { v4 as uuidv4 } from "uuid";

import DoneButton from "../assets/icons/done-button.svg";
import EditButton from "../assets/icons/edit-button.svg";
import DeleteButton from "../assets/icons/delete-button.svg";
import AddButton from "../assets/icons/add-button.svg";

import { ReturnSchema } from "../schemas/ReturnSchema";
import { ReturnItemProps, returnListOption } from "../types/returns";
import LoadingComponent from "../components/LoadingComponent";

const returnActiveStatusList = [
  { id: 1, value: "active", label: "Активный" },
  { id: 2, value: "finished", label: "Завершенный" },
];

const returnSellersList: returnListOption[] = [
  { id: "АП", value: "АП", label: "АП" },
  { id: "РК", value: "РК", label: "РК" },
  { id: "ЮГ", value: "ЮГ", label: "ЮГ" },
  { id: "EMEX", value: "EMEX", label: "EMEX" },
];

const returnReasonsList: returnListOption[] = [
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

  console.log(selectedActiveFilter);

  const { StatusCounts, ReasonCounts, SellerCounts, ActiveCounts } =
    useReturnsCounts(
      returns,
      returnStatusList,
      returnReasonsList,
      returnSellersList,
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

  const getReturnStatusClass = (status: string) => {
    switch (status) {
      case "Новый возврат":
        return "new-return";
      case "Запрос поставщику":
        return "status-sent";
      case "Запрос на возврат":
        return "status-return-requested";
      case "Запрос на утиль":
        return "status-to-dispose";
      case "Возврат получен":
        return "status-return-received";
      case "Возврат проведен":
        return "status-return-processed";
      case "finished":
        return "status-finished";
      default:
        return "";
    }
  };

  const completeReturn = useCallback(
    (id: string) => {
      setReturns((prevReturns) =>
        prevReturns.map((r) =>
          r.id === id
            ? {
                ...r,
                active: r.active === "active" ? "finished" : "active",
                status: "Завершенный",
              }
            : r
        )
      );
    },
    [setReturns]
  );

  useEffect(() => {
    setLoading(true); // Показываем индикатор загрузки

    setTimeout(() => {
      const savedReturns = JSON.parse(localStorage.getItem("returns") || "[]"); // Имитация загрузки с "сервера"
      setReturns(savedReturns);
      setLoading(false); // Скрываем индикатор после загрузки
    }, 2000); // 2 секунды задержки, можно менять
  }, []);

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
                  options={returnReasonsList}
                  error={errors.reason?.[0]}
                />
                <Select
                  label="Поставщик"
                  placeholder="Выбери поставщика"
                  returnSelect="return-create-seller select"
                  currentValue={selectedSeller}
                  onChange={handleSellerChange}
                  options={returnSellersList}
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
          <section className="filters">
            <Select
              returnSelect="status-filter select"
              label="Фильтр по статусу"
              placeholder="Выбери статус"
              currentValue={selectedStatusFilter}
              onChange={setSelectedStatusFilter}
              options={[
                { id: -1, value: "", label: `Все статусы (${returns.length})` },
                ...returnStatusList.map((status) => ({
                  ...status,
                  label: `${status.label} (${StatusCounts[status.value] ?? 0})`,
                })),
              ]}
            />
            <Select
              returnSelect="reason-filter select"
              label="Фильтр по причине"
              placeholder="Выбери причину"
              currentValue={selectedReasonFilter}
              onChange={setSelectedReasonFilter}
              options={[
                { id: -2, value: "", label: `Все причины (${returns.length})` },
                ...returnReasonsList.map((reason) => ({
                  ...reason,
                  label: `${reason.label} (${ReasonCounts[reason.value] ?? 0})`,
                })),
              ]}
            />
            <Select
              returnSelect="seller-filter select"
              label="Фильтр по поставщику"
              placeholder="Выбери поставщика"
              currentValue={selectedSellerFilter}
              onChange={setSelectedSellerFilter}
              options={[
                {
                  id: -3,
                  value: "",
                  label: `Все поставщики(${returns.length})`,
                },
                ...returnSellersList.map((seller) => ({
                  ...seller,
                  label: `${seller.label} (${SellerCounts[seller.value] ?? 0})`,
                })),
              ]}
            />
            <Select
              returnSelect="active-filter select"
              label="Фильтр по активности"
              placeholder="Выбери активность"
              currentValue={selectedActiveFilter}
              onChange={setSelectedActiveFilter}
              options={[
                {
                  id: -4,
                  value: "",
                  label: `Все заказы (${returns.length})`,
                },
                ...returnActiveStatusList.map((active) => ({
                  ...active,
                  label: `${active.label} (${ActiveCounts[active.value] ?? 0})`,
                })),
              ]}
            />
          </section>
          <section className="info">
            {filteredReturns.length === 0 ? (
              <p className="info-empty">Нет возвратов</p>
            ) : (
              filteredReturns.map((r) => (
                <div
                  key={r.id}
                  className={`return-info ${getReturnStatusClass(r.status)} ${
                    r.active
                  }`}
                >
                  <div className="return-info-content">
                    <div className="return-reference">
                      <label>Референс</label>
                      <p>{r.reference}</p>
                    </div>
                    <div className="return-quantity">
                      <label>Количество</label>
                      <p>{r.quantity}</p>
                    </div>
                    <div className="return-price">
                      <label>Стоимость</label>
                      <p>{r.price}₸</p>
                    </div>
                    <div className="return-date">
                      <label>Дата</label>
                      <p>{r.date}</p>
                    </div>
                    <div className="return-seller">
                      <label>Поставщик</label>
                      <p>{r.seller}</p>
                    </div>
                    <div className="return-reason">
                      <label>Причина возврата</label>
                      <p>{r.reason}</p>
                    </div>
                    <div className="return-status">
                      <label>Статус возврата</label>
                      {r.isEditing ? (
                        <Select
                          placeholder="Выбери статус"
                          returnSelect="return-status select"
                          currentValue={r.status}
                          options={returnStatusList}
                          onChange={(newStatus) => {
                            setReturns((prevReturns) =>
                              prevReturns.map((item) =>
                                item.id === r.id
                                  ? { ...item, status: newStatus }
                                  : item
                              )
                            );
                          }}
                        />
                      ) : (
                        <p>{r.status}</p>
                      )}
                    </div>
                    <div className="return-info-buttons">
                      <Button
                        btnClass="return-done-icon"
                        btnImgSrc={DoneButton}
                        buttonAlt="Завершить возврат"
                        onClick={() => completeReturn(r.id)}
                        disabled={r.active === "finished"}
                      />
                      <Button
                        btnClass="return-edit-icon"
                        btnImgSrc={EditButton}
                        buttonAlt="Изменить возврат"
                        onClick={() => handleEditStatus(r.id)}
                        disabled={r.active === "finished"}
                      />
                      <Button
                        btnClass="return-delete-icon"
                        btnImgSrc={DeleteButton}
                        buttonAlt="Удалить возврат"
                        onClick={() => handleDeleteReturn(r.id)}
                        disabled={r.active === "finished"}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </section>
        </>
      )}
    </main>
  );
};

export default Return;
