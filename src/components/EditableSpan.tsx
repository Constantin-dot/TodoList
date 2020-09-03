import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string,
    onChange: (newTitle: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('Span is called')
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState("");

    const onEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }

    const offEditMode = () => {
        setEditMode(false);
        props.onChange(title);
    }

    const changeTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    return editMode
        ? <TextField
            variant={'outlined'}
            value={title}
            autoFocus={true}
            onBlur={offEditMode}
            onChange={changeTitle}
        />
        : <span
            onDoubleClick={onEditMode}
        >{props.title}</span>

});

