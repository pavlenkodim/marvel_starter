import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useMarvelService from "../../services/MarvelService";

import "./searchChar.scss";

const SearchChar = () => {
    const [char, setChar] = useState();

    const { loading, getCharacterByName } = useMarvelService();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitted },
    } = useForm({
        defaultValues: {
            character: "",
        },
        mode: "all",
    });

    const onSubmit = ({ character }) => {
        getCharacterByName(character)
            .then(setChar)
            .catch((er) => {
                throw new Error(er);
            });
    };

    const results = (data) => {
        if (errors.character) {
            return (
                <div className="char__results char__error">
                    {errors.character.message}
                </div>
            );
        }

        if (data) {
            return (
                <div className="char__results char__success">
                    <div>There is! Visit {data.name} page?</div>
                    <button
                        onClick={console.log}
                        className="button button__secondary"
                    >
                        <div className="inner">to page</div>
                    </button>
                </div>
            );
        }
        if (!data && isSubmitted) {
            return (
                <div className="char__results char__error">
                    <div>
                        The character was not found. Check the name and try
                        again
                    </div>
                </div>
            );
        }

        return;
    };

    return (
        <div className="char__search">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="character" className="char__label">
                    Or find a character by name:
                </label>
                <div className="char__basics">
                    <Controller
                        control={control}
                        name="character"
                        rules={{ required: "This field is required" }}
                        render={({ field }) => (
                            <input
                                placeholder="Enter name"
                                className="char__input"
                                name="character"
                                type="text"
                                {...field}
                            />
                        )}
                    />
                    <button type="submit" className="button button__main">
                        <div className="inner">find</div>
                    </button>
                </div>
                {results(char)}
            </form>
        </div>
    );
};

export default SearchChar;
