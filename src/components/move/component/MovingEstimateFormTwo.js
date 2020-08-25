import React, {useEffect, useState, useReducer} from 'react';
import {Table, Form, Modal, Button, Col} from 'react-bootstrap'
import {
    MDBBtn,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBContainer,
    MDBRow,
    MDBJumbotron,
    MDBCardTitle
} from 'mdbreact'

import {Postcode} from "../../../pages/account";
import axios from 'axios'
import SquareLg from "./dragdrop/SquareLg";
import UploadFiles from "../../videoUpload/UploadFiles";
import {useHistory} from "react-router";
import QRcode from "../../../assets/img/QRcode.png";
import DatePicker, {Calendar, utils} from "react-modern-calendar-datepicker";
import "../../../assets/css/calendar.css";
import '../../modalTest/modal.css'

import '../../../assets/css/sb-admin-2.css'

function MovingEstimateFormTwo() {


    /*   const handleSubmit = () => {
           console.log(strSelectedDay);
           const estiJsnon = {
               movingName: movingName,
               movingPhone: movingPhone,
               movingFrom: movingFrom,
               movingTo: movingTo,
               optionalAddrFrom: optionalAddrFrom,
               optionalAddrTo: optionalAddrTo,
               movingDate: strSelectedDay,
               movingType: movingType,
               movingWriter: movingWriter,
               movingDetail: movingDetail,
               square: square,
               userId: userId,
           };
           if (strSelectedDay === "") {
               alert("내용을 한번 더 확인해 주세요!");

           } else if (strSelectedDay !== "") {
               axios
                   .post(`http://localhost:8080/orders/esitmateform/${id}`, estiJsnon)
                   .then(response => {
                       alert('성공');
                       localStorage.setItem('estiDate', JSON.stringify(response.data));
                       window.location.href = '/videotest';
                       /!*      history.push('/videotest');*!/
                   })
                   .catch(error => {
                       alert('실패했어요!');
                       throw error;
                   });
           }*/

    //}
    /*const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }*/






const postApis = (payload) => {

    const orderId = JSON.parse(localStorage.estiDate).orderId
    axios.post(`http://localhost:8080/file/upload/${orderId}/null`, payload, {
        authorization: 'JWT fefege..',
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
    })
        .then(res => {
            alert("이미지 업로드 완료")
            window.location.href = '/videotest';
        })
}
const handlePost = () => {
    const formData = new FormData()
    formData.append('file', upload)
    postApis(formData)
}

const [show, setShow] = useState(false)
const [qrshow, setQrshow] = useState(false)
const [data, setData] = useState([]);
const [check, setCheck] = useState(false)

const [upload, setUpload] = useState(null);
return (
    <>
        <div id="wrapper">
            <div>
                <div className="row">
                    <MDBContainer className="mt-5 text-center">
                        <MDBRow>
                            <MDBCol>
                                <MDBJumbotron>
                                    <MDBCardBody>

                                        <MDBCardTitle className="h2" style={{
                                            textAlign: 'center',
                                            marginButton: '2rem'
                                        }}>{/*가구배치*/}
                                            2단계 내 방 비디오와 원하는 위치 가구배치도 올리기
                                        </MDBCardTitle>
                                            <MDBCard style={{width: "100%", height: "200px"}}>
                                                <MDBCardBody>
                                                    <h3>가구배치도</h3>
                                                    <MDBBtn color="amber" onClick={e => setShow(true)}>
                                                        58평
                                                    </MDBBtn>
                                                    <Modal
                                                        show={show}
                                                        onHide={() => setShow(false)}
                                                        dialogClassName='custom-dialog'
                                                        aria-labelledby="example-custom-modal-styling-title"
                                                    >
                                                        <Modal.Header closeButton>
                                                            <Modal.Title
                                                                id="example-custom-modal-styling-title">
                                                                58평
                                                            </Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <a className="list">
                                                                <SquareLg/>
                                                            </a>
                                                        </Modal.Body>
                                                    </Modal>
                                                </MDBCardBody>
                                            </MDBCard>


                                        <MDBCol>{/*파일업로드*/}
                                            <MDBCard style={{width: "100%", height: "200px"}}>
                                                <MDBCardBody>
                                                    <h3>내 방 비디오 올리기</h3>
                                                    <input type="file" name="file"
                                                           onChange={e => setUpload(e.target.files[0])}/>
                                                    <button type="button" onClick={handlePost}>업로드</button>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                        <br/>
                                        <br/>

                                        <MDBCardTitle className="h2" style={{
                                            textAlign: 'center',
                                            marginButton: '2rem'
                                        }}>{/*가구배치*/}
                                           {/* <Form.Group>
                                                <Form.Check
                                                    required
                                                    label="개인정보 제공에 동의합니다."
                                                    feedback="You must agree before submitting."
                                                    value={check}
                                                    onClick={() => setCheck(true)}
                                                />
                                            </Form.Group>*/}
                                            <Button onClick={e => setQrshow(!qrshow)}>
                                                어플다운받기
                                                <Modal show={qrshow} size={"sm"}
                                                       onClick={e => setQrshow(!qrshow)}
                                                       onHide={() => false}>
                                                    <img src={QRcode}/>
                                                </Modal>
                                            </Button>
                                            {sessionStorage.userData && (
                                                <Button type='submit' >
                                                    Submit form
                                                </Button>
                                            )}

                                            {!sessionStorage.userData && (
                                                <Button type="submit" onClick={() => alert("로그인을 해주세요")}>Submit
                                                    form</Button>)}
                                        </MDBCardTitle>
                                    </MDBCardBody>

                                </MDBJumbotron>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
        </div>
        <div>
            <div style={{textAlign: 'center', marginButton: '2rem'}}>
            </div>
        </div>
    </>
);


}

export default MovingEstimateFormTwo;