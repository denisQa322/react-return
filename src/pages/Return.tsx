import React, { useState } from "react";
import Button from "../components/ButtonComponent";
import Input from "../components/InputComponent";
import "../assets/styles/return.scss";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import Select from "../components/SelectComponent";

const Return = () => {
  const [reference, setReference] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const date = format(new Date(), "dd MMMM yyyy", { locale: ru });
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
              label=""
              placeholder=""
              currentValue={}
              onChange={}
              options={}
            />
          </div>
          <Button
            onClick={() => console.log({ reference, quantity, price, date })}
          >
            Добавить
          </Button>
        </div>
      </section>
      <section className="filters"></section>
      <section className="info"></section>
    </main>
  );
};

export default Return;
