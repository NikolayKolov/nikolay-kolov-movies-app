/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { MovieState } from "../store/moviesSlice";
import recycleBin from "../assets/icons/recycle-bin.svg";
import edit from "../assets/icons/edit.svg";

interface MovieCardProps extends MovieState {
    id: string;
    highlightText?: string;
    highlightField?: string[];
    onDelete?: (id: string) => void;
    onEdit?: (id: string) => void;
}

const MovieCard = (props: MovieCardProps) => {
    const {
        id,
        title,
        distributor,
        highlightText,
        highlightField = ["title", "director", "distributor"],
        director,
        imdb_rating,
        imdb_votes,
        onDelete,
        onEdit
    } = props;
    const [ isDeleteOverlay, setDeleteOverlay ] = useState(false);
    let titleDisplay = <span>{title}</span>;
    let directorDisplay = <span title={"Directed by " + director}>{director}</span>;
    let distributorDisplay = <span title={"Distributed by " + distributor}>{distributor}</span>;

    if (highlightText) {
        if (highlightField.includes("title")) {
            const indexSearch = title.toLowerCase().indexOf(highlightText.toLowerCase());
            if (indexSearch > -1)
                titleDisplay = <span>
                    {title.substring(0, indexSearch)}<span className="highlight">
                        {title.substring(indexSearch, indexSearch + highlightText.length)}
                    </span>{title.substring(indexSearch + highlightText.length)}
                </span>;
        }

        if (highlightField.includes("director")) {
            const indexSearch = director.toLowerCase().indexOf(highlightText.toLowerCase());
            if (indexSearch > -1)
                directorDisplay = <span title={"Directed by " + director}>
                    {director.substring(0, indexSearch)}<span className="highlight">
                        {director.substring(indexSearch, indexSearch + highlightText.length)}
                    </span>{director.substring(indexSearch + highlightText.length)}
                </span>;
        }

        if (highlightField.includes("distributor")) {
            const indexSearch = distributor.toLowerCase().indexOf(highlightText.toLowerCase());
            if (indexSearch > -1)
                distributorDisplay = <span title={"Distributed by " + distributor}>
                    {distributor.substring(0, indexSearch)}<span className="highlight">
                        {distributor.substring(indexSearch, indexSearch + highlightText.length)}
                    </span>{distributor.substring(indexSearch + highlightText.length)}
                </span>;
        }
    }

    const handleDeleteOverlay = () => {
        setDeleteOverlay(!isDeleteOverlay);
    }

    const handleDeleteConfirm = () => {
        onDelete && onDelete(id);
    }

    const handleEdit = () => {
        onEdit && onEdit(id);
    }

    return (
        <div className="movie-card">
            <div className={isDeleteOverlay ? "movie-card--delete-overlay movie-card--delete-overlay__display" : "movie-card--delete-overlay"}>
                <div>
                    Are you sure you want to delete {title}?
                </div>
                <div className="actions">
                    <div className="action action__confirm" onClick={handleDeleteConfirm}>Yes</div>
                    <div className="action action__cancel" onClick={handleDeleteOverlay}>Cancel</div>
                </div>
            </div>
            <article>
                <div className={"movie-rating movie-rating__" + imdb_rating.toFixed(0)}>
                    {imdb_rating.toFixed(1)}<span className="movie-rating--title">/10</span>
                    <span className="movie-rating--votes">{imdb_votes.toLocaleString("en-US")} votes</span></div>
                <div className="movie-card--info">
                    <span className="movie-title">{titleDisplay}</span>
                    <div className="info--container__bottom">
                        <div className="info--details">
                            <span className="movie-director">
                                <span
                                    className="movie-director--label"
                                    title={"Directed by " + director}>
                                    Directed by 
                                </span>
                                {directorDisplay}
                            </span>
                            <span className="movie-distributor">
                                <span
                                    className="movie-distributor--label"
                                    title={"Distributed by " + distributor}>
                                    Distributed by 
                                </span>
                                {distributorDisplay}
                            </span>
                        </div>
                        <div className="info--actions">
                            <div className="action action__delete" onClick={handleDeleteOverlay}>
                                <img src={recycleBin} title="delete" />
                                <span>Delete</span>
                            </div>
                            <div className="action action__edit" onClick={handleEdit}>
                                <img src={edit} title="edit" />
                                <span>Edit</span>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default React.memo(MovieCard);