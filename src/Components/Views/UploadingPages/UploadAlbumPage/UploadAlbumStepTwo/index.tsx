import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { IUserSearch } from "../../../../../Redux/Reducers/SearchReducer/types";
import { albumDataValidate, IAddInviteRequest, IAddTrackToAlbumRequest, IAlbumCreateRequest, IAlbumData } from "../../../../../Redux/Reducers/UploadReducer/types";
import { ProfileButton } from "../../../../Commons/Buttons/ProfileButton";
import { FormikTextArea } from "../../../../Commons/Inputs/FormikTextArea";
import { ListField } from "../../../../Commons/Inputs/ListField";
import { FullScreenModal } from "../../../../Commons/Modals/FullScreenModal";
import { AddCreatorToAlbumModal } from "../../../../Commons/Modals/FullScreenModal/AddCreatorToAlbumModal";
import { RemoveCreatorWithAlbumModal } from "../../../../Commons/Modals/FullScreenModal/RemoveCreatorWithAlbumModal";

const defaultBg = require('../../../../../Assets/Background1.png');
const UploadBg = require('../../../../../Assets/UploadBg.png');
const loader = require('../../../../../Assets/Icons/Loader.png');

export const UploadAlbumStepTwo: React.FC = () => {
    const { t } = useTranslation();
    const nav = useNavigate();
    const reducer = useTypedSelector(state => state.uploadReducer);
    const [image, setImage] = useState<string | any>(defaultBg);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageBack, setImageBack] = useState<string | any>(UploadBg);
    const [imageFileBack, setImageFileBack] = useState<File | null>(null);
    const [creatorNicknames, setCreatorNicknames] = useState<Array<IUserSearch>>([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleDelModal, setVisibleDelModal] = useState(false);
    const [processing, setProcessing] = useState(0);
    const user = useTypedSelector(state => state.userReducer.profile);

    const { setUploadError, setUploadLoader, uploadAlbumApi, addTrackToAlbumApi, sendInviteApi, initAlbumData } = useActions();

    const inititalAlbumDataValues: IAlbumData = {
        title: "",
        image: "",
        description: ""
    };

    useEffect(() => {
        if (!reducer.albumfiles && !reducer.loading) {
            nav(-1);
        }
    }, [reducer.albumfiles]);

    useEffect(() => {
        if (reducer && reducer.uploadedAlbumId) {
            try {
                const processingNext = async () => {
                    if (processing === 33) {
                        await onUploadTrackToAlbum(reducer.uploadedAlbumId);
                    }
                    if (processing === 66) {
                        await onSendInvites(reducer.uploadedAlbumId);
                    }
                    if (processing === 100) {
                        setUploadLoader(false);
                        nav("../overview");
                    }
                }
                processingNext();
            } catch (error) {
            }

        }
    }, [reducer.uploadedAlbumId, processing])

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

    const onLoadingImageBack = (e: any) => {
        if (e) {
            var selectedFile = e.target.files[0];
            setImageFileBack(selectedFile);
            var reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = e => e?.target ? setImageBack(e.target?.result) : "";
            if (reducer.error.length > 0) {
                setUploadError("");
            }
        }
    }

    const onUploadAlbumDataHandle = async (values: IAlbumData) => {
        if (user) {
            try {
                if (imageFile && imageFileBack) {
                    if (!reducer.albumfiles) {
                        setUploadError("Please, upload songs");
                        return;
                    }
                    const rq: IAlbumCreateRequest = {
                        userCreatorEmails: [user.email],
                        name: values.title,
                        releasealbom: new Date(),
                        image: imageFile,
                        templateimage: imageFileBack,
                        description: values.description,
                        isSingle: false
                    }
                    const data: IAlbumData = {
                        title: values.title,
                        image: image,
                        description: values.description
                    }
                    initAlbumData(data);
                    setUploadError("");
                    await uploadAlbumApi(rq);
                    setProcessing(33);
                }
                else {
                    setUploadError("Please, choose images for album");
                }
            } catch (error) {

            }
        }
    };

    const onSendInvites = async (albumId: string | null) => {
        if (creatorNicknames && albumId) {
            creatorNicknames.forEach(async f => {
                const inviterq: IAddInviteRequest = {
                    receiverUsername: f.username,
                    albumId: albumId
                }
                await sendInviteApi(inviterq);
            })
            setProcessing(100);
        }
    }

    const onUploadTrackToAlbum = async (albumId: string | null) => {
        if (imageFile && reducer.albumfiles && user && albumId) {
            reducer.albumfiles.forEach(async f => {
                if (f.file) {
                    const addrq: IAddTrackToAlbumRequest = {
                        id: albumId,
                        name: f.name,
                        image: imageFile,
                        sound: f.file,
                        userCreatorEmails: [user.email]
                    }
                    await addTrackToAlbumApi(addrq);
                }
            })
            setProcessing(66);
        }
    }

    const onAddLocalCreators = (item: IUserSearch) => {
        let creators = creatorNicknames;
        if (item.username !== user?.username) {
            creators.push(item);
            let dist = creators.filter((item,
                index) => creators.indexOf(item) === index);
            setCreatorNicknames(dist);
        }
    }
    const onRemoveLocalCreators = (item: IUserSearch) => {
        let creators = creatorNicknames.filter(filt => filt.username !== item.username);
        setCreatorNicknames(creators);
    }

    return (
        <div className="w-full flex flex-col items-center gap-10 h-full relative">
            <FullScreenModal center visible={visibleModal}>
                <AddCreatorToAlbumModal onClose={() => { setVisibleModal(false) }} onAdd={onAddLocalCreators} />
            </FullScreenModal>
            <FullScreenModal center visible={visibleDelModal}>
                <RemoveCreatorWithAlbumModal artists={creatorNicknames} onClose={() => { setVisibleDelModal(false) }} onRemove={onRemoveLocalCreators} />
            </FullScreenModal>
            <Formik
                initialValues={inititalAlbumDataValues}
                validationSchema={albumDataValidate}
                onSubmit={onUploadAlbumDataHandle}>
                <Form className="flex flex-col pt-[4%] w-full h-full">
                    <div className="px-[27%] mm:px-3 sm:px-[5%] md:px-[5%] lg:px-[5%] xl:px-[15%] pb-[5%]">
                        <div className="flex flex-col h-full p-[30px] shadow-2xl bg-light-200 dark:bg-dark-200/30 gap-6 rounded-xl overflow-hidden relative">
                            <img alt="bgimage" className="absolute top-0 left-0 w-full h-[25%] object-cover bg-cover"
                                src={imageBack} onError={(tg: any) => { tg.target.src = defaultBg }} />
                            <div className="w-full gap-6 flex mm:flex-col sm:flex-col mm:items-center sm:items-center z-10">
                                <div className="w-auto">
                                    <div className="h-[264px] w-[264px] relative overflow-hidden rounded-lg shadow-2xl">
                                        <div className="h-full w-full transition-all bg-black/60 opacity-0 hover:opacity-100 absolute flex justify-center items-center">
                                            <input type="file" id="file" accept="image/*" onChange={(event: any) => { onLoadingImage(event) }} className="hidden" />
                                            <label htmlFor="file"><FontAwesomeIcon className="invert text-6xl cursor-pointer" icon={faPlus} /> </label>
                                        </div>
                                        <img alt="single_image" src={image} className="cursor-pointer transition-all object-cover w-full h-full" onError={(tg: any) => { tg.target.src = defaultBg }} />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between w-full">
                                    <div className="flex justify-end">
                                        <input type="file" id="fileBack" accept="image/*" onChange={(event: any) => { onLoadingImageBack(event) }} className="hidden" />
                                        <label htmlFor="fileBack"><FontAwesomeIcon icon={faPlus} className="flex items-center justify-center text-center rounded-lg cursor-pointer bg-light-200 ml-auto px-2.5 py-2 text-3xl" /></label>
                                    </div>
                                    <FormikTextArea name={"title"} label={t("Title")} minHeight={100} />
                                </div>
                            </div>
                            <div className="grid grid-rows-1 grid-cols-2 mm:grid-cols-1 gap-6 z-10">
                                <div>
                                    <FormikTextArea name={"description"} label={t("Description")} minHeight={100} />
                                </div>
                                <div>
                                    <ListField value={creatorNicknames && creatorNicknames.length > 0 ? creatorNicknames[creatorNicknames.length - 1].username : ""}
                                        placeholder={t("Creators list")} items={creatorNicknames} title={t("Adding creators")}
                                        onOpenList={() => { setVisibleModal(true) }}
                                        onRemove={() => { setVisibleDelModal(true) }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end w-full px-[20%] sm:px-[5%] md:px-[5%] lg:px-[5%] xl:px-[15%] pb-[3%] gap-6">
                        {
                            reducer.loading || processing > 0 &&
                            <h1 className="h-full text-lg bg-dark-200 rounded-xl px-4 py-1 text-light-100 whitespace-nowrap"><span className="text-light-100">Processing:</span> <span className="font-bold text-light-100">{processing}%</span></h1>
                        }
                        {
                            reducer.loading ?
                                <img alt="loader" src={loader} className="animate-spin w-[48px] h-[48px]" /> :
                                <ProfileButton text={t("Publish")} isSelect onClick={() => { }} />
                        }
                    </div>
                </Form>
            </Formik>
        </div>
    )
}