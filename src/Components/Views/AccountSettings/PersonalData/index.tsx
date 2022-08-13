import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useActions } from '../../../../Hooks/useActions';
import { useTypedSelector } from '../../../../Hooks/useTypedSelector';
import {
    changeDataAccountValidate, changeEmailAccountValidate, changeEmojieAccountValidate,
    changeOtherDataAccountValidate, changePasswordAccountValidate, IChangeDataAccountForm,
    IChangeDataAccountRequest, IChangeEmailAccountForm, IChangeEmailAccountRequest, IChangeEmojieForm,
    IChangeEmojieRequest, IChangeOtherDataAccountForm, IChangePasswordAccountForm, IChangePasswordAccountRequest,
    IChangePhoneAccountRequest, IUpdatePersonalData
} from '../../../../Redux/Reducers/UserReducer/types';
import { defaultAvatarImage, defaultBackgroundImage, DeviceType, GetUserAvatar, GetUserBackground } from '../../../../types';
import { SettingsDropdownFormik } from '../../../Commons/AccountSettingsSideBar/SettingsDropdownFormik';
import { ProfileButton } from '../../../Commons/Buttons/ProfileButton';
import { FormikField } from '../../../Commons/Inputs/FormikField';
import { DefaultPhoneInput } from '../../../Commons/Inputs/PhoneInput';

export const PersonalData: React.FC = () => {
    const user = useTypedSelector(state => state.userReducer.profile);
    const error = useTypedSelector(state => state.userReducer.error);
    const { updateEmojieUser, updatePDUser, updateNicknameUser, updatePhoneUser, updateEmailUser, updatePasswordUser } = useActions();
    const [successMessage, setSuccessMessage] = useState("");
    useEffect(() => {
        if (error) {
            document.documentElement.scrollTo(0, 0);
        }
    }, [error]);
    const initialChangeEmojieValues: IChangeEmojieForm = {
        emojie: "",
    };
    const initialChangeDataAccountValues: IChangeDataAccountForm = {
        name: user ? user.name : "",
        surname: user ? user.surname : "",
        username: user ? user.username : ""
    };
    const initialChangeOtherDataAccountValues: IChangeOtherDataAccountForm = {
        date: user ? new Date(user.birthday).getDate().toString() : '',
        month: user ? new Date(user.birthday).getMonth().toString() : '',
        years: user ? new Date(user.birthday).getFullYear().toString() : '',
        gender: user ? user.gender : "",
        country: user ? user.country : "",
    };
    const [number, setNumber] = useState(user ? user.phone.toString() : "");
    const initialChangeEmailAccountValues: IChangeEmailAccountForm = {
        email: "",
    };
    const initialChangePasswordAccountValues: IChangePasswordAccountForm = {
        oldPassword: '',
        password: '',
        passwordConfirm: ''
    };
    const onChangeEmojieHandle = async (values: IChangeEmojieForm) => {
        if (user) {
            try {
                const request: IChangeEmojieRequest = {
                    findEmail: user.email,
                    newEmojie: values.emojie,
                    device: DeviceType.desktop
                }
                await updateEmojieUser(request);
                setSuccessMessage("You successfully change emojie");
            } catch (error) {

            }
        }
    };
    const onChangeDataAccountHandle = async (values: IChangeDataAccountForm) => {
        if (user) {
            try {
                const request: IUpdatePersonalData = {
                    findEmail: user.email,
                    newName: values.name,
                    newSurname: values.surname,
                    newBirthday: user.birthday,
                    newGender: user.gender,
                    newCountry: user.country,
                    device: DeviceType.desktop,
                }
                const request2: IChangeDataAccountRequest = {
                    findEmail: user.email,
                    newUserName: values.username,
                    device: DeviceType.desktop
                }
                await updatePDUser(request);
                await updateNicknameUser(request2);
                setSuccessMessage("You successfully change personal data");
            } catch (error) {

            }
        }
    };
    const onChangeOtherDataAccountHandle = async (values: IChangeOtherDataAccountForm) => {
        if (user && number && number.length === 13) {
            try {
                const request: IUpdatePersonalData = {
                    findEmail: user.email,
                    newName: user.name,
                    newSurname: user.surname,
                    newBirthday: new Date(Number.parseInt(values.years), Number.parseInt(values.month), Number.parseInt(values.date)),
                    newGender: values.gender,
                    newCountry: values.country,
                    device: DeviceType.desktop,
                }
                const request2: IChangePhoneAccountRequest = {
                    findEmail: user.email,
                    newPhone: number,
                    device: DeviceType.desktop,
                }
                await updatePDUser(request);
                await updatePhoneUser(request2);
                setSuccessMessage("You successfully change other data");
            } catch (error) {

            }
        }
    };
    const onChangeEmailAccountHandle = async (values: IChangeEmailAccountForm) => {
        if (user) {
            try {
                const request: IChangeEmailAccountRequest = {
                    findEmail: user.email,
                    newEmail: values.email,
                    device: DeviceType.desktop
                }
                await updateEmailUser(request);
                setSuccessMessage("You successfully change email");
            } catch (error) {

            }
        }
    };
    const onChangePasswordAccountHandle = async (values: IChangePasswordAccountForm) => {
        if (user) {
            try {
                const request: IChangePasswordAccountRequest = {
                    findEmail: user.email,
                    oldPassword: values.oldPassword,
                    newPassword: values.passwordConfirm,
                    device: DeviceType.desktop,
                }
                await updatePasswordUser(request);
                setSuccessMessage("You successfully change password");
            } catch (error) {

            }
        }
    };
    return (
        <>
            <Helmet>
                <title>Soundwave | Personal Data</title>
            </Helmet>
            {
                user ?
                    <div className="flex flex-col items-center h-full py-[50px] px-[25%] mm:px-[5%] sm:px-[10%] md:px-[15%] lg:px-[15%] xl:px-[20%] gap-[40px] text-dark-200 dark:text-light-200">
                        <div className='flex flex-col h-full gap-[40px]'>
                            <div className='flex w-full justify-center'>
                                <div className="rounded-xl shadow-2xl flex flex-col items-center bg-light-200 dark:bg-dark-200/80 gap-[20px] relative overflow-hidden mm:w-full sm:w-full">
                                    <div className="absolute top-0 left-0 w-full h-full grid grid-rows-10">
                                        <div className="row-span-2 overflow-hidden relative w-full h-full">
                                            <div className="absolute w-full h-full bg-black/30"></div>
                                            <img alt="backgroundimage" className="bg-cover bg-no-repeat object-cover w-full h-full" src={GetUserBackground(user)} onError={(tg: any) => { tg.target.src = defaultBackgroundImage}} />
                                        </div>
                                    </div>
                                    <div className="p-[50px] pb-[20px] z-10 flex flex-col gap-[20px] mm:gap-[5px] sm:gap-[15px] md:gap-[15px]">
                                        <div className="flex mm:flex-col md:flex-col lg:flex-col justify-between gap-[43px] mm:gap-[20px] sm:gap-[20px] md:gap-[20px] items-end lg:items-center md:items-center sm:items-center mm:items-center">
                                            <img alt="avatar" src={GetUserAvatar(user)} className="transition-all bg-cover bg-no-repeat object-cover rounded-lg w-[150px] h-[150px] shadow-2xl"
                                            onError={(tg: any) => { tg.target.src = defaultAvatarImage }} />
                                            <div className="pb-[20px] flex flex-col">
                                                <h2 className="text-dark-200 dark:text-light-200 font-bold text-2xl whitespace-nowrap">{user.name} {user.surname}</h2>
                                                <p className="text-dark-200/80 dark:text-light-200/80 font-medium">{user.username}</p>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <Formik
                                                initialValues={initialChangeEmojieValues}
                                                validationSchema={changeEmojieAccountValidate}
                                                onSubmit={onChangeEmojieHandle}>
                                                <Form>
                                                    <FormikField placeholder="Emojie" type="text" value={user.emojie} isOutline onSumbit={() => { }} name={'emojie'} />
                                                </Form>
                                            </Formik>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                error ?
                                    <div className='w-full bg-red-500/80 rounded-lg flex items-center justify-center overflow-hidden py-[20px] px-[20px]'>
                                        <p className='font-medium text-light-100 text-center'>{error}</p>
                                    </div>
                                    : successMessage &&
                                    <div className='w-full bg-green-500/60 rounded-lg flex items-center justify-center overflow-hidden py-[20px] px-[20px]'>
                                        <p className='font-medium text-light-100 text-lg text-center'>{successMessage}</p>
                                    </div>
                            }
                            <Formik
                                initialValues={initialChangeDataAccountValues}
                                validationSchema={changeDataAccountValidate}
                                onSubmit={onChangeDataAccountHandle}>
                                <Form>
                                    <div className='flex flex-col gap-[30px]'>
                                        <h1 className='font-bold text-3xl mm:text-2xl text-center'>Change data account</h1>
                                        <div className='grid grid-cols-2 gap-[30px]'>
                                            <FormikField placeholder='Name' type="text" value={user.name} onSumbit={() => { }} name={'name'} />
                                            <FormikField placeholder='Surname' type="text" value={user.surname} onSumbit={() => { }} name={'surname'} />
                                        </div>
                                        <FormikField placeholder='Nickname' type="text" value={user.username} onSumbit={() => { }} name={'username'} />
                                        <div className='flex w-full justify-end'>
                                            <ProfileButton text="Save changes" onClick={() => { }} isSelect />
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                            <Formik
                                initialValues={initialChangeOtherDataAccountValues}
                                validationSchema={changeOtherDataAccountValidate}
                                onSubmit={onChangeOtherDataAccountHandle}>
                                <Form>
                                    <div className='flex flex-col gap-[30px]'>
                                        <h1 className='font-bold text-3xl mm:text-2xl text-center'>Change other data</h1>
                                        <div className='grid grid-cols-3 gap-[30px]'>
                                            <FormikField placeholder='Day' type="text" value={new Date(user.birthday).getDate().toString()} onSumbit={() => { }} name={'date'} />
                                            <FormikField placeholder='Month' type="text" value={new Date(user.birthday).getMonth().toString()} onSumbit={() => { }} name={'month'} />
                                            <FormikField placeholder='Years' type="text" value={new Date(user.birthday).getFullYear().toString()} onSumbit={() => { }} name={'years'} />
                                        </div>
                                        <DefaultPhoneInput onChange={(e: any) => { setNumber(e) }} name={'phone'} label={'Phone'} value={number} error={'Invalid phone'} />
                                        <div className='grid grid-cols-2 gap-[30px]'>
                                            <SettingsDropdownFormik name={'gender'} title={'Gender'} value={user.gender} options={["Male", "Female", "Other"]} />
                                            <SettingsDropdownFormik name={'country'} title={'Country'} value={user.country} options={["Ukraine", "USA", "Other"]} />
                                        </div>
                                        <div className='flex w-full justify-end'>
                                            <ProfileButton text="Save changes" onClick={() => { }} isSelect />
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                            <Formik
                                initialValues={initialChangeEmailAccountValues}
                                validationSchema={changeEmailAccountValidate}
                                onSubmit={onChangeEmailAccountHandle}>
                                <Form>
                                    <div className='flex flex-col gap-[30px]'>
                                        <h1 className='font-bold text-3xl mm:text-2xl text-center'>Change email</h1>
                                        <FormikField placeholder='Email' type="email" onSumbit={() => { }} value={user.email} name={'email'} />
                                        <div className='flex w-full justify-end'>
                                            <ProfileButton text="Save changes" onClick={() => { }} isSelect />
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                            <Formik
                                initialValues={initialChangePasswordAccountValues}
                                validationSchema={changePasswordAccountValidate}
                                onSubmit={onChangePasswordAccountHandle}>
                                <Form>
                                    <div className='flex flex-col gap-[30px]'>
                                        <h1 className='font-bold text-3xl mm:text-2xl text-center'>Change password</h1>
                                        <FormikField placeholder='Old password' type='password' onSumbit={() => { }} name={'oldPassword'} />
                                        <FormikField placeholder='New password' type='password' onSumbit={() => { }} name={'password'} />
                                        <FormikField placeholder='Confirm new password' type='password' onSumbit={() => { }} name={'passwordConfirm'} />
                                        <div className='flex w-full justify-end'>
                                            <ProfileButton text="Save changes" onClick={() => { }} isSelect />
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                    :
                    <div>

                    </div>

            }
        </>
    )
}