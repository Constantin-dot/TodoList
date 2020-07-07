import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState<string>("");
    let [error, setError] = useState<string | null>(null);

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
    const onAddTaskPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if(e.charCode === 13) {
            addItem();
        }
    }
    const addItem = () => {
        if (title.trim() !== ""){
            props.addItem(title.trim());
        } else {
            setError("Title is required");
        }
        setTitle("");
    }

    return <div>
        <TextField
            label={'New item'}
            error={!!error}
            helperText={error}
            variant={'outlined'}
            value={title}
            onChange={onTitleChange}
            onKeyPress={onAddTaskPress}
        />
        <IconButton
            color={'primary'}
            onClick={addItem}
        >
            <AddBox />
        </IconButton>
    </div>
}

export default AddItemForm;