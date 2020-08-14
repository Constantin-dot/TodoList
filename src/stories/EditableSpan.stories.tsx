import React from "react";
import {EditableSpan} from "../EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
    title: 'EditableSpan Stories',
    component: EditableSpan
}

export const EditableSpanFormBaseExample = (props: any) => {
    return (
        <EditableSpan title={"StartTitle"} onChange={action("value changed")}/>
    )
}