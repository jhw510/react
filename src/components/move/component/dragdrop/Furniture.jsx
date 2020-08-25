import React, {useState} from 'react';
import {useDrop} from "react-dnd";
import {ItemTypes} from "./ItemTypes";

import update from "immutability-helper";

const Furniture = () => {
    const [boxes, setBoxes] = useState({
        a: { top: 20, left: 80, title: 'Drag me around' },
        b: { top: 180, left: 20, title: 'Drag me too' },
    })
    const [, drop] = useDrop({
        accept: ItemTypes.BOX,
        drop(item, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset()
            const left = Math.round(item.left + delta.x)
            const top = Math.round(item.top + delta.y)
            moveBox(item.id, left, top)
            return undefined
        },
    })
    const moveBox = (id, left, top) => {
        setBoxes(
            update(boxes, {
                [id]: {
                    $merge: { left, top },
                },
            }),
        )
    }
    return (
        <div>

        </div>
    );
};

export default Furniture;