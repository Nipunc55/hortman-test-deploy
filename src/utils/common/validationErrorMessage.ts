import { type FormikErrors } from "formik";
import { toast } from "react-toastify";

export const checkValidations = (errors: any) => {
  const typedErrors: FormikErrors<any> = errors;

  const firstErrorValue = (Object.values(typedErrors) as string[])[0];

  if (!firstErrorValue) return true;

  toast.error(firstErrorValue);
  return false;
};
