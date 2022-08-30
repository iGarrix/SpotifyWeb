import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { ISingleCreateRequest, ISingleData, singleDataValidate } from "../../../../../Redux/Reducers/UploadReducer/types";
import { ProfileButton } from "../../../../Commons/Buttons/ProfileButton";
import { FormikTextArea } from "../../../../Commons/Inputs/FormikTextArea";

const defaultBg = require('../../../../../Assets/Background1.png');
const loader = require('../../../../../Assets/Icons/Loader.png');

export const UploadSingleStepTwo: React.FC = () => {

    const nav = useNavigate();
    const reducer = useTypedSelector(state => state.uploadReducer);
    const [image, setImage] = useState<string | any>(defaultBg);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const user = useTypedSelector(state => state.userReducer.profile);
    const { t } = useTranslation();
    const { setUploadError, initSingleData, uploadSingleApi } = useActions();

    const inititalSingleDataValues: ISingleData = {
        title: "",
        image: ""
    };

    useEffect(() => {
        if (!reducer.singlefile) {
            nav(-1);
        }
    }, [reducer.singlefile]);

    const onChangeSingleDataHandle = async (values: ISingleData) => {
        if (user && reducer.singlefile) {
            try {
                if (imageFile) {
                    const data: ISingleData = {
                        title: values.title,
                        image: image,
                    }
                    initSingleData(data);
                    const rq: ISingleCreateRequest = {
                        name: values.title,
                        image: imageFile,
                        sound: reducer.singlefile,
                        creatorEmail: user.email
                    }
                    await uploadSingleApi(rq);
                    nav("../overview");
                }
                else {
                    setUploadError("Please, choose image for single song");
                }
            } catch (error) {

            }
        }
    };

    const onLoadingImage = (e: any) => {
        if (e) {
            var selectedFile = e.target.files[0];
            setImageFile(selectedFile);
            var reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = e => e?.target ? setImage(e.target?.result) : "";
            if (reducer.error.length > 0) {
                setUploadError("");
            }
        }
    }

    return (
        <div className="w-full flex flex-col items-center gap-10 h-full">
            <div className="flex flex-col pt-[4%] gap-12 w-full h-full">
                <Formik
                    initialValues={inititalSingleDataValues}
                    validationSchema={singleDataValidate}
                    onSubmit={onChangeSingleDataHandle}>
                    <Form className="flex flex-col h-full">
                        <div className="flex justify-center mm:justify-start sm:justify-start md:justify-start
                        mm:flex-col sm:flex-col md:flex-col mm:items-center sm:items-center md:items-center px-[25%] mm:px-[2%] sm:px-[2%] md:px-[2%] lg:px-0 
                        w-full gap-4 h-full ">
                            <div className="h-[264px] mm:h-[232px] sm:h-[232px] w-[264px] mm:w-auto sm:w-auto md:w-auto relative overflow-hidden rounded-lg shadow-2xl">
                                <div className="w-full h-full transition-all bg-black/60 opacity-0 hover:opacity-100 absolute flex justify-center items-center">
                                    <input type="file" id="file" accept="image/*" onChange={(event: any) => { onLoadingImage(event) }} className="hidden" />
                                    <label htmlFor="file"><FontAwesomeIcon className="invert text-6xl cursor-pointer" icon={faPlus} /> </label>
                                </div>
                                <img alt="single_image" src={image} className="cursor-pointer transition-all object-cover h-[264px] w-[264px] mm:h-[232px] mm:w-[232px] sm:h-[232px] sm:w-[232px]" onError={(tg: any) => { tg.target.src = defaultBg }} />
                            </div>
                            <div className="flex flex-col mm:w-full sm:w-full md:w-full gap-[20px] sm:px-[10%] md:px-[10%]">
                                <FormikTextArea name={"title"} label={t("Title")} minHeight={100} />
                            </div>
                        </div>
                        <div className="flex justify-end w-full mt-auto px-[15%] pb-[4%]">
                            {
                                reducer.loading ?
                                    <img alt="loader" src={loader} className="animate-spin w-[48px] h-[48px]" /> :
                                    <ProfileButton text={t("Publish")} isSelect onClick={() => { }} />
                            }
                            {/* <ProfileButton text={reducer.loading ? <FontAwesomeIcon className="animate-spin text-2xl px-2" icon={faSpinner} /> : "Publish"} isSelect onClick={() => { }} /> */}
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}