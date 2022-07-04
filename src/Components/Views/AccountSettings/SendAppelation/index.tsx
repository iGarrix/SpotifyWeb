import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { appelationMessageValidate, ISendAppelationForm, ISendAppelationRequest } from "../../../../Redux/Reducers/UserReducer/types";
import { ProfileButton } from "../../../Commons/Buttons/ProfileButton";
import { FormikTextArea } from "../../../Commons/Inputs/FormikTextArea";
import { FullScreenModal } from "../../../Commons/Modals/FullScreenModal";

export const SendAppelation: React.FC = () => {
    const nav = useNavigate();
    const user = useTypedSelector(state => state.userReducer.profile);
    const error = useTypedSelector(state => state.userReducer.error);
    const [open, setOpen] = useState(false);
    const { appelate } = useActions();
    const initialSendAppelationValues: ISendAppelationForm = {
        message: "",
    };
    const onSendAppelationHandle = async (values: ISendAppelationForm) => {
        if (user) {
            try {
                const request: ISendAppelationRequest = {
                    Message: values.message,
                    FindEmail: user.email
                }
                await appelate(request);
                setOpen(true);
            } catch (error) {

            }
        }
    };
    return (
        <>
            <Helmet>
                <title>Soundwave | Send Appelation</title>
            </Helmet>
            {
                user ?
                    <div className="flex flex-col h-full py-[50px] px-[5%] text-dark-200 gap-[20px]">
                        <FullScreenModal visible={open} center>
                            <div className="flex flex-col justify-center items-center rounded-xl bg-light-100 shadow-xl px-[2%] py-[5%] border border-light-200">
                                <FontAwesomeIcon icon={faCircleCheck} className="text-9xl" />
                                <div className="flex flex-col items-center mt-[20px] mb-[30px] gap-[10px]">
                                    <h2 className="font-bold text-2xl">Your letter has been sent</h2>
                                    <p>the administration will consider it within
                                        3 working days</p>
                                </div>
                                <span className="shadow-2xl shadow-dark-200/60">
                                    <ProfileButton text="Go to the profile" onClick={() => { nav('/profile'); }} isSelect />
                                </span>
                            </div>
                        </FullScreenModal>
                        <div>
                            <h1 className="font-bold text-3xl">Appelations</h1>
                            <p className="font-medium">
                                If you have a problem with your account, you can file an appeal <br></br>
                                and the administration will review it within 3 business days.
                            </p>
                        </div>
                        {
                            error &&
                            <div className="w-full flex items-center justify-center rounded-xl py-3 bg-red-500/80">
                                <h2 className="text-light-100 font-medium">{error}fgfgfgfgf</h2>
                            </div>
                        }
                        <Formik
                            initialValues={initialSendAppelationValues}
                            validationSchema={appelationMessageValidate}
                            onSubmit={onSendAppelationHandle}>
                            <Form>
                                <div className="flex flex-col w-full gap-[20px]">
                                    <FormikTextArea name={"message"} label={"Message"} />
                                    <div className='flex w-full justify-end'>
                                        <ProfileButton text="Send appelation" onClick={() => { }} isSelect />
                                    </div>
                                </div>
                            </Form>
                        </Formik>

                    </div>
                    :
                    <div>

                    </div>

            }
        </>
    )
}