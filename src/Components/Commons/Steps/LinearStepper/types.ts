export interface ILinearStepper {
    paddingX: number | any,
    selectedIndex: number,
    isError?: boolean,
    stepsItem: Array<ILinearStepperItem>,
}

export interface ILinearStepperItem {
    key: number,
    title: string | any,
}