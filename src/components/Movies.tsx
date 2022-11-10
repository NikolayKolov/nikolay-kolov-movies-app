import React, { useCallback, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteMovie, MoviesState, MovieState } from "../store/moviesSlice";
import { RootState } from "../store/store";
import MovieCard from "./MovieCard";
import MovieSearch from "./MovieSearch";
import category from "../assets/icons/category.svg";
import sort from "../assets/icons/sort.svg";
import add from "../assets/icons/add.svg";

export interface ISearchMovieObj {
    name: string;
    value?: string;
}

const Movies = () => {
    const movies: MoviesState = useSelector((state: RootState) => (state.movies));
    const [ filterMovies, setFilterMovies ] = useState({
        searchString: "",
        searchType: "title",
        sortType: "default"
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let visibleMovies: string[] = Object.keys(movies);

    // used to avoid extra rerenderings of MovieCard components
    const handleDelete = useCallback((id: string) => {
        dispatch(deleteMovie(id));
        // remove here as well due to async react rerenders
        // setVisibleMovies(visibleMovies.filter(movieId => movieId !== id));
    }, [dispatch]);

    // used to avoid extra rerenderings of MovieCard components
    const handleEdit = useCallback((id: string) => {
        navigate(`edit/${id}`)
    }, [navigate]);

    const handleAdd = () => {
        navigate("create");
    }

    const { searchString, searchType, sortType } = filterMovies;

    // used to avoid extra rerenderings of MovieCard components
    const searchTypes = useMemo(() => {
        if (searchType !== "all") {
            return ["title", "director", "distributor"].filter(type => type === searchType);
        } else {
            return ["title", "director", "distributor"];
        }
    }, [searchType]);

    const onSearchChange = useCallback((obj: ISearchMovieObj) => {
        setFilterMovies((prev) => ({
            ...prev,
            [obj.name]: obj.value
        }));
    }, []);

    const searchSelectsObject = useMemo(() => ({
        searchType: {
            name: "searchType",
            label: "Search by",
            icon: <img src={category} title="Search by" />,
            defaultValue: "title",
            options: [
                { value: "title", label: "Title" },
                { value: "director", label: "Director" },
                { value: "distributor", label: "Distributed By" },
                { value: "all", label: "All" },
            ]
        },
        sort: {
            name: "sortType",
            label: "Sort by",
            icon: <img src={sort} title="Sort" />,
            defaultValue: "default",
            options: [
                { value: "default", label: "Default" },
                { value: "imdb_desc", label: "IMDB Score Descending" },
                { value: "imdb_asc", label: "IMDB Score Ascending" },
            ]
        }
    }), []);

    // set search placeholder text
    let placeholder = "Search here by "
    if (searchTypes.length === 1 && searchTypes[0] === "title") placeholder += "title";
    else if (searchTypes.length === 1 && searchTypes[0] === "director") placeholder += "director";
    else if (searchTypes.length === 1 && searchTypes[0] === "distributor") placeholder += "distributor";
    else placeholder = "Search for movies here";

    // update list of visible movies during render
    // this way we avoid extra rerenders and we don't use useEffect hook
    if (searchString.length > 2) {

        visibleMovies = visibleMovies.filter((id: string) => {
            const result = searchTypes.reduce((acc: number, currType: string) => {
                const movieSt = movies[id] as MovieState;
                const searchMovieProperty: string = movieSt[currType as keyof typeof movieSt].toString().toLowerCase();
                if (searchMovieProperty.indexOf(searchString.toLowerCase()) > -1) {
                    return acc + 1;
                }
                else {
                    return acc;
                }
            }, -1);
            return result > -1;
        });
    }

    if (sortType) {
        const sortDefault = (a: string, b: string): number => {
            if (a > b) return 1;
            else if (a < b) return -1;
            else return 0; 
        }
        const sortIMDBDesc = (a: string, b: string): number => {
            if (movies[b].imdb_rating > movies[a].imdb_rating) return 1;
            else if (movies[b].imdb_rating < movies[a].imdb_rating) return -1;
            else return 0;
        }
        const sortIMDBAsc = (a: string, b: string): number => {
            return sortIMDBDesc(a, b) * -1;
        }

        let sortFunc;
        switch (sortType) {
            case "imdb_desc":
                sortFunc = sortIMDBDesc;
                break;
            case "imdb_asc":
                sortFunc = sortIMDBAsc;
                break;
            default:
                sortFunc = sortDefault;
        }

        visibleMovies = visibleMovies.sort(sortFunc);
    }

    return (
        <section>
            <div className="movies-actions__label">Search movies</div>
            <section className="movies--actions">
                <div>
                    <MovieSearch 
                        name="searchString"
                        placeholder={placeholder}
                        onChange={onSearchChange}
                        selectObject={searchSelectsObject} />
                </div>
            </section>
            <section className="movies-list">
                <div className="movies-list--header">
                    Movie results: {visibleMovies.length}
                    <div className="action action__add" onClick={handleAdd}>
                        <img src={add} title="Add Movie" />
                        ADD MOVIE
                    </div>
                </div>
                <div className="movies-container">
                    {
                        visibleMovies.map((key: string) => (
                            <MovieCard
                                key={key}
                                id={key}
                                title={movies[key].title}
                                director={movies[key].director}
                                distributor={movies[key].distributor}
                                imdb_rating={movies[key].imdb_rating}
                                imdb_votes={movies[key].imdb_votes}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                                highlightText={filterMovies.searchString.length > 2 ? filterMovies.searchString : ""}
                                highlightField={searchTypes}
                            />
                        ))
                    }
                </div>
            </section>
        </section>
    );
}

export default Movies;