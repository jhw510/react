import React from 'react'

import './Capture.css'
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Example} from "../Example";


export const Capture = () => {
    return (
        <div className={"box"}>
            <DndProvider backend={HTML5Backend}>
                <Example />

            </DndProvider>
        </div>
    )
}