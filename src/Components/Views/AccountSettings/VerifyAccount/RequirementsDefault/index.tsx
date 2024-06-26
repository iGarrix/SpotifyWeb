import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { VerifyType } from "../../../../../types";

export const RequirementsDefault = () => {
    const user = useTypedSelector(state => state.userReducer.profile);
    const { t } = useTranslation();
    return (
        <div className="flex flex-col py-5 items-center justify-center bg-green-500 text-light-100 rounded-xl">
            <Helmet>
                <title>Soundwave | Your verified plan</title>
            </Helmet>
            {
                user?.verify === VerifyType.verify ?
                    <h1 className="text-center text-lg">{t("Your profile is currently registered as verified account")}</h1>
                    :
                    <h1 className="text-center text-lg">{t("Your profile is currently registered as client account")}</h1>
            }
        </div>
    )
}