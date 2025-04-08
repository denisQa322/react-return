import { useState, useCallback, useMemo, useEffect } from "react";
import "../assets/styles/rejects.scss";

import Input from "../components/InputComponent";
import Select from "../components/SelectComponent";
import Button from "../components/ButtonComponent";
import LoadingComponent from "../components/LoadingIndicator/LoadingComponent";

import { ItemProps, SelectOption } from "../types/types";
import { RejectSchema } from "../schemas/RejectSchema";

import AddButton from "../assets/icons/add-button.svg";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { v4 as uuidv4 } from "uuid";

import useLocalStorage from "../hooks/useLocalStorage";

// const rejectActiveStatusList = [
//   { id: 1, value: "active", label: "Активный" },
//   { id: 2, value: "finished", label: "Завершенный" },
// ];

const rejectSellerList: SelectOption[] = [
  { id: "АП", value: "АП", label: "АП" },
  { id: "РК", value: "РК", label: "РК" },
  { id: "ЮГ", value: "ЮГ", label: "ЮГ" },
  { id: "EMEX", value: "EMEX", label: "EMEX" },
  { id: "VIVAT", value: "VIVAT", label: "VIVAT" },
];

const rejectReasonList: SelectOption[] = [
  { id: 1, value: "Отказ клиента", label: "Отказ клиента" },
  { id: 2, value: "Сроки истекли", label: "Сроки истекли" },
  { id: 3, value: "Ошибка синхронизации", label: "Ошибка синхронизации" },
];

// const rejectStatusList: SelectOption[] = [
//   { id: 1, value: "Новая отмена", label: "Новая отмена" },
//   { id: 2, value: "Запрос отправлен", label: "Запрос поставщику" },
//   { id: 3, value: "Отмена принята", label: "Отмена принята" },
// ];

const Reject: React.FC = () => {
  const [reference, setReference] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const date = format(new Date(), "dd MMMM yyyy", { locale: ru });
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [selectedSeller, setSelectedSeller] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { state: rejects, update: setRejects } = useLocalStorage<ItemProps[]>(
    "rejects",
    []
  );

  const [loading, setLoading] = useState<boolean>(true);

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
    field: keyof typeof RejectSchema.shape,
    value: unknown
  ) => {
    const schema = RejectSchema.shape[field];

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

  const handleAddReturn = useCallback(
    () => {
      const newReject: ItemProps = {
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
      console.log("data is okay");
      const validationResult = RejectSchema.safeParse(newReject);
      console.log(validationResult);
      if (!validationResult.success) {
        const { fieldErrors } = validationResult.error.flatten();
        setErrors(fieldErrors);
        return;
      }
      console.log("validation success");
      setRejects([...rejects, newReject]);
      console.log("reject setted");
      resetForm();
      console.log("form reseted");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      reference,
      quantity,
      price,
      date,
      selectedReason,
      selectedSeller,
      setRejects,
    ]
  );

  // const handleDeleteReject = useCallback(
  //   (id: string) => {
  //     const updatedRejects = rejects.filter((rej) => rej.id !== id);
  //     setRejects(updatedRejects);
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [setRejects]
  // );

  // const handleEditStatus = useCallback(
  //   (id: string) => {
  //     setRejects((prevRejects) =>
  //       prevRejects.map((r) =>
  //         r.id === id && r.active !== "finished"
  //           ? { ...r, isEditing: !r.isEditing }
  //           : r
  //       )
  //     );
  //   },
  //   [setRejects]
  // );

  // const completeReject = useCallback(
  //   (id: string) => {
  //     setRejects((prevRejects) => {
  //       const updatedRejects = prevRejects.map((r) =>
  //         r.id === id
  //           ? {
  //               ...r,
  //               active:
  //                 r.active === "active"
  //                   ? "finished"
  //                   : ("active" as "active" | "finished"),
  //               status: "Завершенный",
  //             }
  //           : r
  //       );
  //       localStorage.setItem("rejects", JSON.stringify(updatedRejects));
  //       return updatedRejects;
  //     });
  //   },
  //   [setRejects]
  // );

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const savedRejects = JSON.parse(localStorage.getItem("rejects") || "[]");
      setRejects(savedRejects);
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
          <section className="create">
            <div className="reject-create">
              <div className="reject-create-inputs">
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
              <div className="reject-create-selects">
                <Select
                  label="Причина отмены"
                  placeholder="Выбери причину"
                  rejectSelect="reject-create-reason select"
                  currentValue={selectedReason}
                  onChange={handleReasonChange}
                  options={rejectReasonList}
                  error={errors.reason?.[0]}
                />
                <Select
                  label="Поставщик"
                  placeholder="Выбери поставщика"
                  rejectSelect="reject-create-seller select"
                  currentValue={selectedSeller}
                  onChange={handleSellerChange}
                  options={rejectSellerList}
                  error={errors.seller?.[0]}
                />
              </div>
              <Button
                btnClass="reject-create-icon"
                btnImgSrc={AddButton}
                buttonAlt="Добавить возврат"
                disabled={emptyData}
                onClick={handleAddReturn}
              />
            </div>
          </section>
          <section className="filters"></section>
        </>
      )}
    </main>
  );
};

export default Reject;
