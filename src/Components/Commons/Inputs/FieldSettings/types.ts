export interface IFieldSettings {
    name: string;
    placeholder: string,
    value?: string,
    isOutline?: boolean,
    type?: "text" | "password" | "email" | "number",
    onSumbit: (e: any) => void,
}