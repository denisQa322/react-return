import React, { useState } from "react";
import Button from "../components/ButtonComponent";
import Input from "../components/InputComponent";

const Return = () => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (newValue: string) => {
    const numValue = Number(newValue);

    if (newValue === "") {
      setError("");
    } else if (isNaN(numValue)) {
      setError("Введите число");
    } else if (numValue < 0) {
      setError("Число не может быть отрицательным");
    } else {
      setError("");
    }

    setValue(newValue);
  };

  return (
    <main className="container">
      <section className="create">
        <div className="return-create">
          <div className="return-create-inputs">
            <Input
              label="Референс"
              type="number"
              value={value}
              error={error}
              onChange={handleChange}
            />
          </div>
          <div className="return-create-selects"></div>
          <Button />
        </div>
      </section>
      <section className="filters"></section>
      <section className="info"></section>
    </main>
  );
};

export default Return;
