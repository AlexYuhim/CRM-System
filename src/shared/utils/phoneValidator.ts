import type { Rule } from "antd/es/form";

export const phoneValidator = (_: Rule, value: string) => {
  if (!value) return Promise.resolve();
  const regex = /^\+?[0-9\s\-\(\)]{10,15}$/;
  if (!regex.test(value)) {
    return Promise.reject("Некорректный формат телефона");
  }
  return Promise.resolve();
};
