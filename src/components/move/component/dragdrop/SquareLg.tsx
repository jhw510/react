import React, { Fragment, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { useCapture } from './capture/index'
import {Capture} from './capture/Capture'

const Wrapper = styled.div`
  text-align: center;
`
const Headline = styled.h1`
  font-family: 'Open Sans Condensed', sans-serif;
  font-weight: 700;
`

const Subline = styled.p`
  font-family: 'Rubik', sans-serif;
  font-weight: 300;
`

const ComponentWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto ;
  
  
`
const Button = styled.input.attrs({ type: 'button' })``
const SquareLg=()=> {
    const { snap } = useCapture()
    const element = useRef(null)
    const onClick = useCallback(() => {
        snap(element, { file: 'download.png' })
    }, [snap, element])
    return (
        <div className="App">
            <Fragment>
                <Wrapper>
                    <Headline>캡쳐</Headline>
                    <ComponentWrapper ref={element}>
                        <Capture/>
                    </ComponentWrapper>
                    <br/>
                    <br/>
                    <Button onClick={onClick} value="캡쳐하고 다운받기" />
                </Wrapper>
            </Fragment>

            {/*         <DndProvider backend={HTML5Backend}>

                <Cindex/>
                <br/>
                <br/>
                <Example />

            </DndProvider>*/}
        </div>
    )
}

export default SquareLg;