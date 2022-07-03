export interface IFormikField {
    name: string;
    placeholder: string,
    value?: string,
    isOutline?: boolean,
    disable?: boolean,
    type?: "text" | "password" | "email" | "number",
    className?: string,
    onSumbit?: (e: any) => void,
}