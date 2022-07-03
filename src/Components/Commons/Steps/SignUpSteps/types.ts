export interface ISignUpSteps {
    children: ISignUpStep[],
    selectedIndex: number,
}

export interface ISignUpStep {
    title: string,
    description: string,
    index: number,
    children: any,
}