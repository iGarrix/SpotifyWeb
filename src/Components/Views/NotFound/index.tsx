import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const foundLogo = require('../../../Assets/Icons/NotFound.png');

export const NotFound: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Helmet>
        <title>Soundwave | Not found, go back</title>
      </Helmet>
      <div className="flex items-center flex-col gap-6">
        <h1 className="font-bold text-3xl dark:text-light-200">{t("Result not found")}</h1>
        <img alt="foundlogo" src={foundLogo} className="bg-cover object-cover" />
      </div>
    </div>
  );
};
