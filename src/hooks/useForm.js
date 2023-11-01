import { useState } from 'react';

const useForm = (onSubmit) => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

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

    setIsValid(input.form.checkValidity());
  };

  const setInitialState = (initialState) => {
    setForm(initialState);
    setErrors({});
    setIsValid(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(form);
  };

  return { form, errors, isValid, handleChange, handleSubmit, setInitialState };
};

export default useForm;
