import React, { useCallback, useMemo, useState } from "react";
import Button from "../../ButtonComponent";

import { CancellationSchema } from "../../../schemas/CancellationSchema";

import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { v4 as uuidv4 } from "uuid";

import AddButton from "../../../assets/icons/add-button.svg";

import { GenericFormProps, ItemProps } from "../../../types/types";
import Select from "../../SelectComponent";
import Input from "../../InputComponent";

const CancellationForm: React.FC<GenericFormProps> = ({
  setItems,
  sellerList,
  reasonList,
}) => {
  const [reference, setReference] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const date = format(new Date(), "dd MMMM yyyy", { locale: ru });
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [selectedSeller, setSelectedSeller] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

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
    field: keyof typeof CancellationSchema.shape,
    value: unknown
  ) => {
    const schema = CancellationSchema.shape[field];

    const result = schema.safeParse(value);

    setErrors((prev) => ({
      ...prev,
      [field]: result.success
        ? []
        : result.error?.errors.map((e) => e.message) || [],
    }));
  };

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

  const handleReasonChange = useCallback(
    (newReason: string) => {
      setSelectedReason(newReason);
      validateField("reason", newReason);
    },
    [setSelectedReason]
  );
  const handleSellerChange = useCallback(
    (newSeller: string) => {
      setSelectedSeller(newSeller);
      validateField("seller", newSeller);
    },
    [setSelectedSeller]
  );

  const resetForm = () => {
    setReference("");
    setQuantity("");
    setPrice("");
    setSelectedReason("");
    setSelectedSeller("");
    setErrors({});
  };

  const handleAddCancellation = useCallback(() => {
    const newCancellation: ItemProps = {
      id: uuidv4(),
      reference,
      quantity: Number(quantity),
      price: Number(price),
      date,
      reason: selectedReason,
      seller: selectedSeller,
      status: "Новая отмена",
      active: "active",
    };

    const validationResult = CancellationSchema.safeParse(newCancellation);
    if (!validationResult.success) {
      const { fieldErrors } = validationResult.error.flatten();
      setErrors(fieldErrors);
      return;
    }

    setItems((prev) => [...prev, newCancellation]);

    resetForm();
  }, [
    reference,
    quantity,
    price,
    date,
    selectedReason,
    selectedSeller,
    setItems,
  ]);

  return (
    <section className="create">
      <div className="cancellation-create">
        <div className="cancellation-create-inputs">
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
        <div className="cancellation-create-selects">
          <Select
            label="Причина отмены"
            placeholder="Выбери причину"
            cancellationSelect="cancellation-create-reason select"
            currentValue={selectedReason}
            onChange={handleReasonChange}
            options={reasonList}
            error={errors.reason?.[0]}
          />
          <Select
            label="Поставщик"
            placeholder="Выбери поставщика"
            cancellationSelect="cancellation-create-seller select"
            currentValue={selectedSeller}
            onChange={handleSellerChange}
            options={sellerList}
            error={errors.seller?.[0]}
          />
        </div>
        <Button
          btnClass="cancellation-create-icon"
          btnImgSrc={AddButton}
          buttonAlt="Добавить возврат"
          disabled={emptyData}
          onClick={handleAddCancellation}
        />
      </div>
    </section>
  );
};

export default CancellationForm;
