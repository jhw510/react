import React, {useState, useReducer} from 'react';
import {
    MDBBtn,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBJumbotron,
    MDBModal,
    MDBModalBody, MDBModalFooter,
    MDBModalHeader, MDBPopover, MDBPopoverBody, MDBPopoverHeader,
    MDBRow, MDBTooltip
} from "mdbreact";
import {Table} from "react-bootstrap";
import axios from 'axios';
import {useHistory} from "react-router";
import '../assets/css/sb-admin-2.css'


const Calcula = () => {


    const initialState = {
        number : 0,
    }

    const count = (state, action) => {
        switch (action.type) {
            case 'increment':
                return {number: state.number + 0.5};
            case 'initialize':
                return {number: 0};
            default:
                throw new Error();
        }
    }
    const [state, dispatch] = useReducer(count, initialState);

    const [movingPrice, setMovingPrice] = useState('');
    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault()
        const price = {
            price : movingPrice
        }
        axios
            .post(`http://localhost:8080/orders/calcula`, price)
            .then(response => {
                alert("성공");
                history.push('/')
            })
            .catch(error => {
                alert("실패")
                throw error;
            })

    }
    return (
        <>
            <div id="wrapper">
                <div id="page-wrap">
                    <div className="row">
                        <div className="col-lg-12"><br/>
                            <h2 className="mt-5 text-center">예상 금액 계산</h2><br/>
                        </div>
                        <MDBContainer className="mt-5 text-center">
                            <MDBRow>
                                <MDBCol>
                                    <MDBJumbotron>
                                        <MDBCardBody>
                                            <Table>
                                                <tbody >
                                                <tr>
                                                    <th>가구</th>
                                                    <th>
                                                        <MDBBtn rounded outline color="warning"
                                                                onClick={ () => dispatch({type: 'increment'})}>
                                                            장농</MDBBtn>
                                                        <MDBBtn rounded outline color="warning"
                                                                onClick={ () => dispatch({type: 'increment'})}>
                                                            침대</MDBBtn>
                                                        <MDBBtn rounded outline color="warning"
                                                                onClick={ () => dispatch({type: 'increment'})}>
                                                            쇼파</MDBBtn>
                                                        <MDBBtn rounded outline color="warning"
                                                                onClick={ () => dispatch({type: 'increment'})}>
                                                            서랍장</MDBBtn>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>전자 제품</th>
                                                    <th>
                                                        <MDBBtn rounded outline color="success"
                                                                onClick={ () => dispatch({type: 'increment'})}>
                                                            냉장고</MDBBtn>
                                                        <MDBBtn rounded outline color="success"
                                                                onClick={ () => dispatch({type: 'increment'})}>
                                                            TV</MDBBtn>
                                                        <MDBBtn rounded outline color="success"
                                                                onClick={ () => dispatch({type: 'increment'})}>
                                                            에어컨</MDBBtn>
                                                        <MDBBtn rounded outline color="success"
                                                                onClick={ () => dispatch({type: 'increment'})}>
                                                            세탁기</MDBBtn>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>기타 용품</th>
                                                    <th>
                                                        <MDBBtn rounded outline color="danger"
                                                                onClick={ () => dispatch({type: 'increment'})}>
                                                            가스레인지</MDBBtn>
                                                        <MDBBtn rounded outline color="danger"
                                                                onClick={ () => dispatch({type: 'increment'})}>
                                                            식기세척기</MDBBtn>
                                                        <MDBBtn rounded outline color="danger"
                                                                onClick={ () => dispatch({type: 'increment'})}>
                                                            헬스기구</MDBBtn>
                                                        <MDBBtn rounded outline color="danger"
                                                                onClick={ () => dispatch({type: 'increment'})}>
                                                            난방기</MDBBtn>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>예상 무게</th>
                                                    <th><h3 id="weight">{state.number}</h3>Ton</th>
                                                </tr>
                                                <tr>
                                                    <th>예상 가격</th>
                                                    <th><h3 id="price">{state.number*50}</h3>만원</th>
                                                </tr>
                                                <th>
                                                    <MDBBtn outline color="danger"
                                                            onClick={ () => dispatch({type: 'initialize'})}>
                                                        초기화</MDBBtn>
                                                </th>
                                                <th>
                                                    <MDBBtn outline color="primary"
                                                            onClick={e => setMovingPrice(state.number*50)}
                                                            onClick={handleSubmit}>제출하기</MDBBtn>
                                                </th>
                                                </tbody>
                                            </Table>
                                        </MDBCardBody>
                                    </MDBJumbotron>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Calcula;