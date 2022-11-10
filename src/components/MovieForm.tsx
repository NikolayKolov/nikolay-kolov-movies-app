/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MovieState } from "../store/moviesSlice"
import dataValidators from "../utils/dataValidators";
import InputText from "./inputs/InputText";
import InputLabel from "./inputs/InputLabel";
import { useNavigate } from "react-router";
import Modal from "./modals/Modal";

interface MovieInt extends MovieState {
    id: string;
}

interface MovieFormProps {
    mode: "edit" | "new";
    onSubmit: (_data: any) => void;
    movieObject?: MovieInt;
}

interface FormDataInt {
    [key: string]: {
        errorMessage: string;
        valid: boolean;
        value: string | number;
    }
}

const MovieForm = (props: MovieFormProps) => {
    const { mode, onSubmit, movieObject } = props;
    const [ formData, setFormData ] = useState<FormDataInt>({
        title: {
            errorMessage: "",
            valid: true,
            value: movieObject?.title ? movieObject.title : ""
        },
        director: {
            errorMessage: "",
            valid: true,
            value: movieObject?.director ? movieObject.director : ""
        },
        distributor: {
            errorMessage: "",
            valid: true,
            value: movieObject?.distributor ? movieObject.distributor : ""
        },
        imdb_rating: {
            errorMessage: "",
            valid: true,
            value: movieObject?.imdb_rating ? movieObject.imdb_rating : 0
        },
        imdb_votes: {
            errorMessage: "",
            valid: true,
            value: movieObject?.imdb_votes ? movieObject.imdb_votes : 0
        },
    });
    const [openModal, setOpenModal] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        const formDataUpdate: FormDataInt = { ...formData };
        for (const property in movieObject) {
            if (property !== "id") {
                formDataUpdate[property].value = movieObject[property as keyof typeof movieObject].toString();
            }
        }
        setFormData(formDataUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movieObject]);

    // use useCallback and functional form of setState to avoid unnecessary rerenders of InputText
    const handleInputChange = useCallback((e: { id: string, value: string }) => {
        const field: string = e.id;
        const fieldValue: string = e.value;

        setFormData(formData => ({
            ...formData,
            [field]: {
                ...formData[field],
                value: fieldValue,
            }
        }));
    }, [setFormData])

    // use useCallback and functional form of setState to avoid unnecessary rerenders of InputText
    const handleInputValidate = useCallback((e: { id: string, value: string }) => {
        const field: string = e.id;
        const fieldValue: string = e.value;
        const validateMethod = dataValidators[field];
        if (validateMethod) {
            const validateResult = validateMethod(fieldValue);
            setFormData(formData => ({
                ...formData,
                [field]: {
                    valid: validateResult.isValid,
                    value: validateResult?.value ? validateResult.value : fieldValue,
                    errorMessage: validateResult?.errorMessage? validateResult.errorMessage : ""
                }
            }));
        }
    }, [setFormData]);

    const onHandleSubmit = () => {
        const fields = ["title", "director", "distributor", "imdb_rating", "imdb_votes"];
        let isValidSubmit = true;
        let formDataNew = { ...formData };
        fields.forEach((field: string) => {
            const validateMethod = dataValidators[field];
            if (validateMethod) {
                const validateResult = validateMethod(formData[field].value);
                if (validateResult.isValid === false && isValidSubmit) isValidSubmit = false;
                formDataNew = {
                    ...formDataNew,
                    [field]: {
                        valid: validateResult.isValid,
                        value: validateResult?.value ? validateResult.value : formData[field].value,
                        errorMessage: validateResult?.errorMessage? validateResult.errorMessage : ""
                    }
                }
                /*setFormData({
                    ...formData,
                    [field]: {
                        valid: validateResult.isValid,
                        value: validateResult?.value ? validateResult.value : formData[field].value,
                        errorMessage: validateResult?.errorMessage? validateResult.errorMessage : ""
                    }
                });*/
            }
        });

        setFormData(formDataNew);

        if (isValidSubmit) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const movieObjPrep: any = {
                title: formData.title.value,
                director: formData.director.value,
                distributor: formData.distributor.value,
                imdb_rating: typeof(formData.imdb_rating.value) === "string" ?
                    parseFloat(formData.imdb_rating.value) :
                    formData.imdb_rating.value,
                imdb_votes: typeof(formData.imdb_votes.value) === "string" ?
                    parseInt(formData.imdb_votes.value) :
                    formData.imdb_votes.value
            }

            if (mode === "edit" && movieObject !== undefined) {
                movieObjPrep.id = movieObject.id;
            }

            setOpenModal(true);
            onSubmit && onSubmit(movieObjPrep);
        }
    }

    const onHandleCancel = useCallback(() => {
        navigate("/movies");
    }, [navigate]);

    const handleOnModalClose = useCallback((isModalOpen: boolean) => {
        setOpenModal(isModalOpen);
        mode === "new" && navigate("/movies");
    }, [setOpenModal, mode, navigate]);

    const handleModalCloseGoHome = useCallback(() => {
        navigate("/movies");
        setOpenModal(false);
    }, [navigate, setOpenModal]);

    // avoid unnecessary rerenders in Modal component
    const ModalChild = useMemo(() => (
        <>
            <div>
                The changes you made were successful.<br />
                {
                    mode === "new" ?
                        "After closing this window you will be redirected to home page" :
                        "Click the home button to go to home page, or close modal to make more changes."
                }
                
            </div>
            <div className="buttons">
                <div className="button" onClick={handleModalCloseGoHome}>Home</div>
            </div>
        </>
    ), [handleModalCloseGoHome, mode]);

    return (
        <>
            <section className="movie-form">
                <h1>
                    {
                        mode === "edit" ?
                            "Update an existing movie" :
                            "Enter a new movie"
                    }
                </h1>
                <form>
                    <div className="form-row">
                        <InputLabel id="movie-title" label="Title: " required={mode === "new"} />
                        <InputText
                            id="movie-title"
                            name="title"
                            placeholder="Enter movie title"
                            value={formData.title.value.toString()}
                            valid={formData.title.valid}
                            errorMessage={formData.title.errorMessage}
                            onChange={handleInputChange}
                            onBlur={handleInputValidate}
                        />
                    </div>
                    <div className="form-row">
                        <InputLabel id="movie-director" label="Director: " required={mode === "new"} />
                        <InputText
                            id="movie-director"
                            name="director"
                            placeholder="Enter movie director"
                            value={formData.director.value.toString()}
                            valid={formData.director.valid}
                            errorMessage={formData.director.errorMessage}
                            onChange={handleInputChange}
                            onBlur={handleInputValidate}
                        />
                    </div>
                    <div className="form-row">
                        <InputLabel id="movie-distributor" label="Distributor: " required={mode === "new"} />
                        <InputText
                            id="movie-distributor"
                            name="distributor"
                            placeholder="Enter movie distributor"
                            value={formData.distributor.value.toString()}
                            valid={formData.distributor.valid}
                            errorMessage={formData.distributor.errorMessage}
                            onChange={handleInputChange}
                            onBlur={handleInputValidate}
                        />
                    </div>
                    <div className="form-row">
                        <InputLabel id="movie-imdb_rating" label="IMDB Rating: " required={mode === "new"} />
                        <InputText
                            id="movie-imdb_rating"
                            name="imdb_rating"
                            placeholder="Number will be rounded till first decimal place"
                            value={formData.imdb_rating.value.toString()}
                            valid={formData.imdb_rating.valid}
                            errorMessage={formData.imdb_rating.errorMessage}
                            onChange={handleInputChange}
                            onBlur={handleInputValidate}
                        />
                    </div>
                    <div className="form-row">
                        <InputLabel id="movie-imdb_votes" label="IMDB number of votes:" required={mode === "new"} />
                        <InputText
                            id="movie-imdb_votes"
                            name="imdb_votes"
                            placeholder="Number will be rounded till nearest number"
                            value={formData.imdb_votes.value.toString()}
                            valid={formData.imdb_votes.valid}
                            errorMessage={formData.imdb_votes.errorMessage}
                            onChange={handleInputChange}
                            onBlur={handleInputValidate}
                        />
                    </div>
                    <div className="form-actions">
                        <div className="action action__submit" onClick={onHandleSubmit}>
                            SUBMIT
                        </div>
                        <div className="action action__cancel" onClick={onHandleCancel}>
                            CANCEL
                        </div>
                    </div>
                </form>
            </section>
            <Modal 
                title={mode === "edit"? "Edit Successful" : "New Movie Added"}
                isOpen={openModal}
                onClose={handleOnModalClose}>
                {ModalChild}
            </Modal>
        </>
    );
};

export default MovieForm;