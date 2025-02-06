import React, { useMemo, useState } from "react";
import "../assets/styles/return.scss";

import Button from "../components/ButtonComponent";
import Input from "../components/InputComponent";
import Select from "../components/SelectComponent";
import useLocalStorage from "../hooks/useLocalStorage";

import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { v4 as uuidv4 } from "uuid";

import DoneButton from "../assets/icons/done-button.svg";
import EditButton from "../assets/icons/edit-button.svg";
import DeleteButton from "../assets/icons/delete-button.svg";
import AddButton from "../assets/icons/add-button.svg";

import { ReturnSchema } from "../schemas/ReturnSchema";
import { ReturnItem, returnListOption } from "../types/returns";

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
  const [selectedStatus, setSelectedStatus] = useState<string>("Новый возврат");
  const [isEditingStatus, setIsEditingStatus] = useState<boolean>(false);
  const [tempStatus, setTempStatus] = useState<string>(selectedStatus); // Временный статус
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { state: returns, update: setReturns } = useLocalStorage<ReturnItem[]>(
    "returns",
    []
  );

  const emptyData = useMemo(() => {
    return (
      reference.trim() === "" ||
      quantity.trim() === "" ||
      price.trim() === "" ||
      !selectedReason ||
      !selectedSeller ||
      Object.values(errors).some((errArray) => errArray.length > 0)
    );
  }, [reference, quantity, price, selectedReason, selectedSeller, errors]);

  const handleSellerChange = (newSeller: string) => {
    setSelectedSeller(newSeller);
  };
  const handleReasonChange = (newReason: string) => {
    setSelectedReason(newReason);
  };

  const handleReferenceChange = (newReference: string) => {
    setReference(newReference);

    // Если ошибка была связана с длиной reference, очищаем её
    if (newReference.length >= 7 && errors.reference) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors.reference;
        return updatedErrors;
      });
    }
  };

  const handleQuantityChange = (newQuantity: string) => {
    setQuantity(newQuantity);
  };

  const handlePriceChange = (newPrice: string) => {
    setPrice(newPrice);
  };

  const resetForm = () => {
    setReference("");
    setQuantity("");
    setPrice("");
    setSelectedReason("");
    setSelectedSeller("");
    setErrors({});
  };

  const handleAddReturn = () => {
    const newReturn: ReturnItem = {
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
  };

  const handleDeleteReturn = (id: string) => {
    const updatedReturns = returns.filter((ret) => ret.id !== id);
    setReturns(updatedReturns);
  };

  const handleEditStatus = (id: string) => {
    if (isEditingStatus) {
      setSelectedStatus(tempStatus);

      const updatedReturns = returns.map((r) =>
        r.id === id ? { ...r, status: tempStatus } : r
      );
      setReturns(updatedReturns);
    }
    setIsEditingStatus(!isEditingStatus);
  };

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

  const completeReturn = (id: string) => {
    setReturns((prevReturns) =>
      prevReturns.map((r) =>
        r.id === id
          ? {
              ...r,
              active: r.active === "active" ? "finished" : "active",
              status: "finished",
            }
          : r
      )
    );
  };

  return (
    <main className="container">
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
              type="string"
              value={quantity}
              onChange={handleQuantityChange}
              error={errors.quantity?.[0]}
            />
            <Input
              label="Стоимость"
              type="string"
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
      <section className="filters"></section>
      <section className="info">
        {returns.length === 0 ? (
          <p className="info-empty">Нет возвратов</p>
        ) : (
          returns.map((r) => (
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
                  {isEditingStatus ? (
                    <Select
                      placeholder="Выбери статус"
                      returnSelect="return-status select"
                      currentValue={tempStatus}
                      onChange={(newStatus) => {
                        setTempStatus(newStatus);
                      }}
                      options={returnStatusList}
                    />
                  ) : (
                    <p>{selectedStatus}</p>
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
    </main>
  );
};

export default Return;
