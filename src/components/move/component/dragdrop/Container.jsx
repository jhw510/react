import React, { useState } from 'react'
import { useDrop} from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import { Box } from './Box'
import update from 'immutability-helper'
import tv from '../../../../assets/img/tv.png'
import ji from '../../../../assets//img/ji.png'
import ex from '../../../../assets/img/ex.jpg'
import couch from '../../../../assets/img/couch.png'
import table from '../../../../assets/img/table.png'


const styles = {
    width: 1300,
    height: 700,
    border: '1px solid black',
    position: 'relative',
}
export const Container = ({ hideSourceOnDrag }) => {
    const [boxes, setBoxes] = useState([
        { id:'a',top: 450, left: 20, title: '냉장고', image:ji,width:'100px',height:'100px'},
        {id:'b', top: 450, left:120, title: '쇼파' ,image: couch,width:'100px',height:'150px'},
        {id:'c', top: 450, left: 220, title: 'TV' ,image: tv,width:'100px',height:'150px'},
        {id:'d', top: 530, left:20, title: '식탁' ,image: table,width:'100px',height:'100px'},
    ])
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
        <div ref={drop} style={styles}>
            {Object.keys(boxes).map((key) => {
                const { left, top, title ,image,width,height} = boxes[key]
                return (
                    <Box
                        key={key}
                        id={key}
                        left={left}
                        top={top}
                        hideSourceOnDrag={hideSourceOnDrag}
                    >
                        <img src={image} width={width} height={height}/>
                        <div style={{position:'absolute',
                            top:'70px',right:'50px'}}>{title}</div>
                    </Box>
                )
            })}
            <img src={ex}/>
        </div>
    )
}