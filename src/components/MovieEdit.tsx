/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useParams } from "react-router-dom";
import MovieForm from "./MovieForm";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { editMovie } from "../store/moviesSlice";
import { useNavigate } from "react-router";

const MovieEdit = () => {
    const params = useParams();
    const movieId = params?.id ? params.id : "";
    const movieEditRedux = useSelector((state: RootState) => (state.movies[movieId]));
    const dispatch = useDispatch();
    let isMovieFound = false;
    let movieEdit: any = undefined;
    if (movieEditRedux !== undefined) {
        isMovieFound = true;
        movieEdit = {
            ...movieEditRedux,
            id: movieId
        }
    }

    const navigate = useNavigate();
    const navigateIndex = () => {
        navigate("/");
    }

    const handleSubmit = (movieEdited: any) => {
        const movieNoId: any = { ...movieEdited };
        delete movieNoId.id;
        dispatch(editMovie({
            id: movieEdited.id,
            movie: movieNoId
        }));
    }

    return (
        <>
            {
                isMovieFound ?
                    <MovieForm mode="edit" onSubmit={handleSubmit} movieObject={movieEdit} /> :
                    <section className="movie-form">
                        <h1>No movie found for this id, <span className="link__index" onClick={navigateIndex}>click here to return to main</span></h1>
                    </section>
            }
        </>
    );
}

export default MovieEdit;