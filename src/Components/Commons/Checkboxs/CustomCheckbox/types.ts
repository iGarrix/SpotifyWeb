export interface ICustomCheckbox {
  value: boolean;
  text?: string;
  onCheck: () => void;
}