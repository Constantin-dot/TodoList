import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
        <input
            type={'text'}
            value={title}
            onChange={onTitleChange}
            onKeyPress={onAddTaskPress}
        />
        <button onClick={addItem}>Add</button>
        {error && <div className={"error-message"}>{error}</div>}
    </div>
}

export default AddItemForm;