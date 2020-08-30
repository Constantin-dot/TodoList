import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onAddItemClick = () => {
        if(title.trim() !== "") {
            props.addItem(title);
        } else {
            setError("Field is empty!");
        }
        setTitle("");
    }

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            onAddItemClick();
        }
    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                label={'New item'}
                value={title}
                onChange={onTitleChange}
                onKeyPress={onKeyPressAddItem}
                error={!!error}
                helperText={error}
            />
            <IconButton
                onClick={onAddItemClick}
                color={'primary'}
            >
                <ControlPoint />
            </IconButton>
        </div>
    )
});
