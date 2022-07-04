import { Helmet } from "react-helmet";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { VerifyType } from "../../../../../types";

export const RequirementsDefault = () => {
    const user = useTypedSelector(state => state.userReducer.profile);
    return (
        <div className="flex flex-col py-5 items-center justify-center bg-green-500 text-light-100 rounded-xl">
            <Helmet>
                <title>Soundwave | Your verified plan</title>
            </Helmet>
            {
                user?.verify === VerifyType.verify ?
                    <h1 className="text-center text-lg">Your profile is currently registered as verified account</h1>
                    : user?.verify === VerifyType.artist ?
                        <h1 className="text-center text-lg">Your profile is currently registered as artist & creator</h1>
                        :
                        <h1 className="text-center text-lg">Your profile is currently registered as client account</h1>
            }
        </div>
    )
}