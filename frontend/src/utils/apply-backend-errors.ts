import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

export type ApiError<E> = {
  message: string;
  statusCode: number;
  errors?: Partial<Record<keyof E, string[]>>
};


function applyBackendErrors<T extends FieldValues>(
  error: ApiError<T>,
  setError: UseFormSetError<T>
) {
  setError('root', { type: 'server', message: error?.message });

  if (!error?.errors?.body) return;

  Object.entries(error.errors?.body).forEach(([field, messages]) => {
    if (!messages?.length) return;

    setError(field as Path<T>, {
      type: "server",
      message: messages[0],
    });
  });
}

export default applyBackendErrors;