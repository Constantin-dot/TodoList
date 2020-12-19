import React from "react";
import {action} from "@storybook/addon-actions";
import {AddItemForm} from "../components/AddItemForm";

export default  {
    title: 'AddItemForm Component',
    component: AddItemForm
}

const asyncCallback = async (...params: any[]) => {
    action('Button add was pressed inside the form')(...params)
}

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addItem={asyncCallback}/>
}

export const AddItemFormDisabledExample = (props: any) => {
    return <AddItemForm
        addItem={asyncCallback}
        disabled={true}
    />
}