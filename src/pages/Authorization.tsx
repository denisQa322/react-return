import React, { useCallback, useState } from "react";
import Input from "../components/InputComponent";
import { useNavigate } from "react-router-dom";
import "../assets/styles/authorization.scss";

import { AuthorizationSchema } from "../schemas/AuthorizationSchema";

const Authorization = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const navigate = useNavigate();

  const validateField = (
    field: keyof typeof AuthorizationSchema.shape,
    value: unknown
  ) => {
    const schema = AuthorizationSchema.shape[field];
    const result = schema.safeParse(value);

    setErrors((prev) => ({
      ...prev,
      [field]: result.success
        ? []
        : result.error?.errors.map((e) => e.message) || [],
    }));
  };

  const handleSubmit = useCallback(
    (newLogin: string, newPassword: string) => {
      const result = AuthorizationSchema.safeParse({
        login: newLogin,
        password: newPassword,
      });
      if (!result.success) {
        const fieldErrors: Record<string, string[]> = {};
        result.error.errors.forEach((e) => {
          if (!fieldErrors[e.path[0]]) fieldErrors[e.path[0]] = [];
          fieldErrors[e.path[0]].push(e.message);
        });
        setErrors(fieldErrors);
        return;
      }

      localStorage.setItem("login", newLogin);
      localStorage.setItem("password", newPassword);

      navigate("/home");
    },
    [navigate]
  );

  return (
    <section className="authorization">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(login, password);
        }}
      >
        <h1 className="authorization-header">Вход в кабинет</h1>
        <Input
          label="Логин"
          type="text"
          value={login}
          onChange={(val) => {
            setLogin(val);
            validateField("login", val);
          }}
          error={errors.login?.[0]}
        />
        <Input
          label="Пароль"
          type="password"
          value={password}
          onChange={(val) => {
            setPassword(val);
            validateField("password", val);
          }}
          error={errors.password?.[0]}
        />
        <button className="authorization btn" type="submit">
          Войти
        </button>
      </form>
      ;
    </section>
  );
};

export default Authorization;
