import React from "react";
import MovieForm from "./MovieForm";
import { useDispatch } from "react-redux";
import { addMovie } from "../store/moviesSlice";

const MovieCreate = () => {
    const dispatch = useDispatch();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = (movieNew: any) => {
        dispatch(addMovie(movieNew));
    }
    return (
        <MovieForm mode="new" onSubmit={handleSubmit} />
    );
}

export default MovieCreate;