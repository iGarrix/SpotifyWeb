import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { ISingleData, singleDataValidate } from "../../../../../Redux/Reducers/UploadReducer/types";
import { ProfileButton } from "../../../../Commons/Buttons/ProfileButton";
import { FormikTextArea } from "../../../../Commons/Inputs/FormikTextArea";

const defaultBg = require('../../../../../Assets/Background1.png');

export const UploadSingleStepTwo: React.FC = () => {

    const nav = useNavigate();
    const reducer = useTypedSelector(state => state.uploadReducer);
    const [image, setImage] = useState<any>(defaultBg);

    const inititalSingleDataValues: ISingleData = {
        title: "",
    };

    // useEffect(() => {
    //     if (!reducer.singlefile) {
    //       nav(-1);  
    //     }
    // }, [reducer.singlefile]);

    const onChangeSingleDataHandle = async (values: ISingleData) => {
        try {
            if (image) {       
                console.log(values);
            }
        } catch (error) {

        }
    };

    const onLoadingImage = (e: any) => {
        if (e) {
            var selectedFile = e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = e => e?.target ? setImage(e.target?.result) : "";
        }
    }

    return (
        <div className="w-full flex flex-col items-center gap-10 h-full relative">
            <div className="flex flex-col pt-[4%] gap-12 w-full h-full">
                <Formik
                    initialValues={inititalSingleDataValues}
                    validationSchema={singleDataValidate}
                    onSubmit={onChangeSingleDataHandle}>
                    <Form className="flex flex-col h-full">
                        <div className="flex px-[30%] w-full gap-4">
                            <div className="h-[264px] w-full relative overflow-hidden rounded-lg shadow-2xl">
                                <div className="w-full h-full transition-all bg-black/60 opacity-0 hover:opacity-100 absolute flex justify-center items-center">
                                    <input type="file" id="file" accept="image/*" onChange={(event: any) => { onLoadingImage(event) }} className="hidden" />
                                    <label htmlFor="file"><FontAwesomeIcon className="invert text-6xl cursor-pointer" icon={faPlus} /> </label>
                                </div>
                                <img alt="single_image" src={image} className="cursor-pointer transition-all object-cover h-[264px] w-[264px]" onError={(tg: any) => { tg.target.src = defaultBg }} />
                            </div>
                            <div className="flex flex-col w-[200%] gap-[20px]">
                                <FormikTextArea name={"title"} label={"Title"} minHeight={100} />
                            </div>
                        </div>
                        {
                            true &&
                            <div className="flex justify-end w-full mt-auto px-[15%] pb-[4%]">
                                <ProfileButton text={"Save"} isSelect onClick={() => { }} />
                            </div>
                        }
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

{/* <div className="w-full flex flex-col items-center gap-10 h-full relative">
            <div className="flex flex-col pt-[4%] gap-12 w-full h-full">
                <div className="flex px-[30%] w-full gap-4">
                    <div className="h-[264px] w-[264px] relative overflow-hidden rounded-lg shadow-2xl">
                        <div className="w-full h-full transition-all bg-black/60 opacity-0 hover:opacity-100 absolute flex justify-center items-center">
                            <input type="file" id="file" accept="image/*" onChange={(event: any) => { onLoadingImage(event) }} className="hidden" />
                            <label htmlFor="file"><FontAwesomeIcon className="invert text-6xl cursor-pointer" icon={faPlus} /> </label>
                        </div>
                        <img alt="single_image" src={image} className="cursor-pointer transition-all object-cover w-full h-full" onError={(tg: any) => { tg.target.src = defaultBg }} />
                    </div>
                    <Formik
                        initialValues={inititalSingleDataValues}
                        validationSchema={singleDataValidate}
                        onSubmit={onChangeSingleDataHandle}>
                        <Form>
                            <div className="flex flex-col w-[200%] gap-[20px]">
                                <FormikTextArea name={"title"} label={"Title"} minHeight={100} />
                                <div className='flex w-full justify-end'>
                                    <ProfileButton text="Send appelation" onClick={() => { }} isSelect />
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
                {
                    true &&
                    <div className="flex justify-end w-full mt-auto px-[15%] pb-[4%]">
                        <ProfileButton text={"Next"} isSelect onClick={() => { }} />
                    </div>
                }
            </div>
        </div> */}