import { useState } from 'react';

const useForm = (initialState, onSubmit) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const input = e.target;

    setErrors({
      ...errors,
      [input.name]: input.validationMessage,
    });

    setForm({
      ...form,
      [input.name]: input.value,
    });

    setIsDirty(initialState[input.name] !== input.value);
    setIsValid(input.form.checkValidity());
  };

  const reset = (values) => {
    setForm(values);
    setErrors({});
    setIsDirty(false);
    setIsValid(true);
  };

  return {
    form,
    errors,
    isDirty,
    isValid,
    handleChange,
    reset,
  };
};

export default useForm;
