import { ProfileButton } from "../../../Buttons/ProfileButton";

export interface IAnswerAppelationModal {
    answer: string,
    onClose: () => void,
}

export const AnswerAppelationModal : React.FC<IAnswerAppelationModal> = ({...props}) => {
    return (
        <div className="flex flex-col justify-center items-center max-w-[60vh] mm:justify-start rounded-xl mm:rounded-none bg-light-100 dark:bg-dark-100 shadow-xl px-[2%] py-[2%] mm:py-[7%] gap-5 border border-light-200 dark:border-dark-100 mm:h-full sm:full mm:w-full">
            <h1 className="text-2xl font-bold">Answer your question</h1>
            <h1 className="font-medium text-center">{props.answer}</h1>
            <div className="mm:mt-auto">
                <ProfileButton text="Ok" onClick={props.onClose} isSelect />
            </div>
        </div>
    )
}
