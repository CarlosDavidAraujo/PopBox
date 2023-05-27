import { useState } from "react";
import { api } from "../services/api";

export function useFormPost({ endpoint, onSuccess }) {
  const [error, setError] = useState();

  const handleSubmit = async (values) => {
    const { data } = await api.post(endpoint, values);

    if (data.error) {
      return setError(data.error);
    }

    return onSuccess();
  };

  return [error, handleSubmit];
}
