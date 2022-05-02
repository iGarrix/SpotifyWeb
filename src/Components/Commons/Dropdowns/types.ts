export type FormikDefaultDropdownProps = {
  value?: string;
  field: string;
  touched?: boolean | null;
  error?: string | null;
  placeholder?: string;
  options: Array<string>;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
