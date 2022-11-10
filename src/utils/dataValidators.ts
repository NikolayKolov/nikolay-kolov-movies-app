/**
 * Contains methods for form fields validation in front end
 * Provides a quick and convenient way to search for a validator method for a given field name
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dataValidators: any = {
    title: (title: string) => {
        const errorMessage = "Movie title must be between 2 and 50 characters";
        if (typeof(title) === "string") {
            const validTitle = /^[\s\S]{2,50}$/.test(title);

            return validTitle ? {
                isValid: validTitle
            } : {
                isValid: validTitle,
                errorMessage: errorMessage
            };
        }
        else {
            return {
                isValid: false,
                errorMessage: "Unknown error"
            }
        }
    },
    director: (director: string) => {
        const errorMessage = "Movie director must be between 2 and 50 characters and contain only letters, dashes and '";
        if (typeof(director) === "string") {
            const validDirector = /^[a-zA-Z-'\s]{2,50}$/.test(director);

            return validDirector ? {
                isValid: validDirector
            } : {
                isValid: validDirector,
                errorMessage: errorMessage
            };
        }
        else {
            return {
                isValid: false,
                errorMessage: "Unknown error"
            }
        }
    },
    distributor: (distributor: string) => {
        const errorMessage = "Movie distributor must be between 2 and 50 characters";
        if (typeof(distributor) === "string") {
            const validDistributor = /^[\s\S]{2,50}$/.test(distributor);

            return validDistributor ? {
                isValid: validDistributor
            } : {
                isValid: validDistributor,
                errorMessage: errorMessage
            };
        }
        else {
            return {
                isValid: false,
                errorMessage: "Unknown error"
            }
        }
    },
    imdb_rating: (imdb_rating: string) => {
        if (typeof(imdb_rating) === "string") {
            const convertToNumber = parseFloat(imdb_rating);

            if (isNaN(convertToNumber)) {
                return {
                    isValid: false,
                    errorMessage: "Movie IMDB rating must be a valid number"
                }
            }
            else {
                if (convertToNumber < 1 || convertToNumber > 10) {
                    return {
                        isValid: false,
                        errorMessage: "Movie IMDB rating must be a valid number between 1.0 and 10.0"
                    }
                }
                return {
                    isValid: true,
                    value: convertToNumber.toFixed(1)
                }
            }
        } else if (typeof(imdb_rating) === "number" && imdb_rating === 0) {
            /* The user doesn't make a change to the value of input component before submitting */
            return {
                isValid: false,
                errorMessage: "Movie IMDB rating must be a valid number between 1.0 and 10.0"
            }
        } else {
            return {
                isValid: false,
                errorMessage: "Unknown error"
            }
        }
    },
    imdb_votes: (imdb_votes: string) => {
        if (typeof(imdb_votes) === "string") {
            const convertToNumber = parseInt(imdb_votes);

            if (isNaN(convertToNumber)) {
                return {
                    isValid: false,
                    errorMessage: "Movie IMDB votes must be a valid number"
                }
            }
            else {
                if (convertToNumber < 1) {
                    return {
                        isValid: false,
                        errorMessage: "Movie IMDB votes must be a positive number"
                    }
                }
                else if (convertToNumber > 1000000000) {
                    return {
                        isValid: false,
                        errorMessage: "Movie IMDB votes value too large"
                    }
                }
                else return {
                    isValid: true,
                    value: convertToNumber.toString()
                }
            }
        } else if (typeof(imdb_votes) === "number" && imdb_votes === 0) {
            /* The user doesn't make a change to the value of input component before submitting */
            return {
                isValid: false,
                errorMessage: "Movie IMDB votes must be a positive number"
            }
        }
        else {
            return {
                isValid: false,
                errorMessage: "Unknown error"
            }
        }
    }
}

export default dataValidators;