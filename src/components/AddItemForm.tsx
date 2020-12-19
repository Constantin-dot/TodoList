import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {IconButton, TextField} from "@material-ui/core"
import {ControlPoint} from "@material-ui/icons"

export type AddItemFormSubmitHelperType = { setError: (error: string | null) => void, setTitle: (title: string) => void }

type AddItemFormPropsType = {
    addItem: (title: string, helper: AddItemFormSubmitHelperType) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = async () => {
        if(title.trim() !== "") {
            addItem(title, {setError, setTitle})
        } else {
            setError("Field is empty!")
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addItemHandler()
        }
    }

    return (
        <div>
            <TextField
                disabled={disabled}
                variant={'outlined'}
                label={'New item'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressAddItem}
                error={!!error}
                helperText={error}
            />
            <IconButton
                disabled={disabled}
                onClick={addItemHandler}
                color={'primary'}
                style={{marginLeft: '5px'}}
            >
                <ControlPoint />
            </IconButton>
        </div>
    )
})
