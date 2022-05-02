export type FormikDefaultInputProps = {
  value?: string;
  field: string;
  touched?: boolean | null;
  error?: string | null;
  placeholder?: string;
  type?: "text" | "email" | "password";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
