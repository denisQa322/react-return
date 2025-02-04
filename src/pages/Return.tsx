import React, { useState } from "react";
import Button from "../components/ButtonComponent";
import Input from "../components/InputComponent";
import "../assets/styles/return.scss";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import Select from "../components/SelectComponent";
import { v4 as uuidv4 } from "uuid";

interface returnListOption {
  id: string | number;
  value: string;
  label: string;
}

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

const Return = () => {
  const [reference, setReference] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const date = format(new Date(), "dd MMMM yyyy", { locale: ru });
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [selectedSeller, setSelectedSeller] = useState<string>("");
  const selectedActive = "Активный";
  const [selectedStatus, setSelectedStatus] = useState<string>("Новый возврат");
  const [isEditingStatus, setIsEditingStatus] = useState<boolean>(false);

  const handleSellerChange = (newSeller: string) => {
    setSelectedSeller(newSeller);
  };
  const handleReasonChange = (newReason: string) => {
    setSelectedReason(newReason);
  };
  const handleStatusChange = (newStatus: string) => {
    setSelectedStatus(newStatus);
  };

  const handleReferenceChange = (newReference: string) => {
    setReference(newReference);
  };

  const handleQuantityChange = (newQuantity: string) => {
    setQuantity(newQuantity);
  };

  const handlePriceChange = (newPrice: string) => {
    setPrice(newPrice);
  };

  return (
    <main className="container">
      <section className="create">
        <div className="return-create">
          <div className="return-create-inputs">
            <Input
              label="Референс"
              type="string"
              value={reference}
              onChange={handleReferenceChange}
            />
            <Input
              label="Количество"
              type="string"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <Input
              label="Стоимость"
              type="string"
              value={price}
              onChange={handlePriceChange}
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
            />
            <Select
              label="Поставщик"
              placeholder="Выбери поставщика"
              returnSelect="return-create-seller select"
              currentValue={selectedSeller}
              onChange={handleSellerChange}
              options={returnSellersList}
            />
          </div>
          <Button
            onClick={() =>
              console.log({
                id: uuidv4(),
                reference,
                quantity,
                price,
                date,
                selectedReason,
                selectedSeller,
                selectedActive,
              })
            }
          >
            Добавить
          </Button>
        </div>
      </section>
      <section className="filters"></section>
      <section className="info">
        <div className="return-info">
          <div className="return-reference">
            <label>Референс</label>
            <p>{reference}</p>
          </div>
          <div className="return-quantity">
            <label>Количество</label>
            <p>{quantity}</p>
          </div>
          <div className="return-price">
            <label>Стоимость</label>
            <p>{price}₸</p>
          </div>
          <div className="return-date">
            <label>Дата</label>
            <p>{date}</p>
          </div>
          <div className="return-seller">
            <label>Поставщик</label>
            <p>{selectedSeller}</p>
          </div>
          <div className="return-reason">
            <label>Причина возврата</label>
            <p>{selectedReason}</p>
          </div>
          <div className="return-status">
            <label>Статус возврата</label>
            {isEditingStatus ? (
              <Select
                label="Статус возврата"
                placeholder="Выбери статус"
                returnSelect="return-status select"
                currentValue="selectedStatus"
                onChange={(newStatus) => {
                  handleStatusChange(newStatus);
                  setIsEditingStatus(false);
                }}
                options={returnStatusList}
              />
            ) : (
              <p onClick={() => setIsEditingStatus(true)}>{selectedStatus}</p>
            )}
          </div>
        </div>
        <div className="return-info-buttons">
          <Button
            onClick={() =>
              console.log({
                id: uuidv4(),
                reference,
                quantity,
                price,
                date,
                selectedReason,
                selectedSeller,
                selectedActive,
              })
            }
          ></Button>
          <Button
            onClick={() =>
              console.log({
                id: uuidv4(),
                reference,
                quantity,
                price,
                date,
                selectedReason,
                selectedSeller,
                selectedActive,
              })
            }
          ></Button>
          <Button
            onClick={() =>
              console.log({
                id: uuidv4(),
                reference,
                quantity,
                price,
                date,
                selectedReason,
                selectedSeller,
                selectedActive,
              })
            }
          ></Button>
        </div>
      </section>
    </main>
  );
};

export default Return;
