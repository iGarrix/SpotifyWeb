export interface IField {
    placeholder: string,
    value?: string,
    icon?: any,
    visiblePlaceholder?: boolean,
    onChange: (e: any) => void,
}