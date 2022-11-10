import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moviesList from "../assets/moviesInit.json";

export interface MovieState {
    title: string,
    director: string,
    distributor: string,
    imdb_rating: number,
    imdb_votes: number
}

export interface MoviesState {
    [key: string]: MovieState
}

const objMovies = moviesList.reduce((obj, movie) => {
    const key: number = movie.id;
    const movieObj: MovieState = {
        title: movie.title.toString(),
        director: movie.director,
        distributor: movie.distributor,
        imdb_rating: movie.imdb_rating,
        imdb_votes: movie.imdb_votes
    };

    return Object.assign(obj, { [key]: movieObj })
}, {});

const initialState: MoviesState = objMovies;
  
export const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        addMovie: (state, action: PayloadAction<MovieState>) => {
            const arrayIds: string[] = Object.keys(state);
            let maxId: number = parseInt(arrayIds[0]);
            arrayIds.forEach((id: string) => {
                if (maxId < parseInt(id)) {
                    maxId = parseInt(id);
                }
            });

            const newMaxID = (maxId + 1).toString();

            state[newMaxID] = {
                ...action.payload
            };
        },
        deleteMovie: (state, action: PayloadAction<string>) => {
            const idToDelete = action.payload
            delete state[idToDelete];
        },
        editMovie: (state, action: PayloadAction<{ id: string, movie: MovieState} >) => {
            const idToEdit = action.payload.id;
            state[idToEdit] = {
                ...action.payload.movie
            }
        }
    },
});

// Action creators are generated for each case reducer function
export const { addMovie, deleteMovie, editMovie } = moviesSlice.actions

export default moviesSlice.reducer