import React, { ReactNode } from "react";
import { ISearchMovieObj } from "./Movies";
import search from "../assets/icons/search.svg";

/**
 * The search bar has a text input field and optional dropdown select options.
 * The latter are defined with this object
 */
export interface IMovieSearchSelectOptions {
    [key: string]: {
        // The name that will be given to the dropdown select component, used to differentiate it from others
        name: string;
        // icon that sits at start of dropdown section
        icon?: ReactNode;
        // label that sits before the dropdown, informs user of purpose of dropdown
        label: string;
        // dropdown select options list
        options: Array<{value: string; label: string}>;
        // id of the value selected by default
        defaultValue?: string;
    }
}

interface IMovieSearch {
    // name for the input text search, must be different from names for dropdown selects
    name: string;
    // text placeholder for the input text search
    placeholder?: string;
    onChange: (_: ISearchMovieObj) => void;
    selectObject?: IMovieSearchSelectOptions;
}

const MovieSearch = (props: IMovieSearch) => {
    const { name, placeholder, onChange, selectObject } = props;
    const arraySelects = Object.keys(selectObject || []);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement;
        onChange && onChange(
            {
                name: target.name,
                value: target.value
            }
        );
    }

    return (
        <div className="search-bar--main">
            <div className="search-bar--input">
                <img src={search} title="search" />
                <div>
                    <input type="text" name={name} placeholder={placeholder} onChange={handleOnChange} />
                </div>
            </div>
            {
                selectObject && arraySelects.map((select: string) => (
                    <div key={select}>
                        {selectObject[select].icon}
                        <span>{selectObject[select].label}</span>
                        <select
                            defaultValue={selectObject[select].defaultValue}
                            onChange={handleOnChange}
                            name={selectObject[select].name}
                            id={selectObject[select].name}>
                            {
                                selectObject[select].options.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))
                            }
                        </select>
                    </div>
                ))
            }
        </div>
    );
};

export default React.memo(MovieSearch);