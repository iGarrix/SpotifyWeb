export interface ISlider {
    min: number,
    max: number,
    value: any,
    onChange: (e: any) => void,
    onKeyPress?: (e: any) => void,
}