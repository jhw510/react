import React, { useState} from 'react';
import {MDBBtn, MDBCol, MDBCard, MDBCardBody, MDBInput} from 'mdbreact'
import {Button } from 'antd';
import QRcode from '../../assets/img/QRcode.png'
import {Col, Form, Modal} from "react-bootstrap";
import {SideBar} from "../../commons";
import SquareLg from "../move/component/dragdrop/SquareLg";
import UploadFiles from "./UploadFiles";
import axios from "axios";
import {Link, useHistory} from 'react-router-dom'
const UploadPage = () => {
    const [validated, setValidated] = useState(false);
    const [show,setShow]=useState(false)
    const [qrshow,setQrshow]=useState(false)
    const [movingWriter,setMovingWriter]=useState('')
    const [movingDetail,setMovingDetail]=useState('')
    const history = useHistory();
    const handleSubmit = (event) => {
        event.preventDefault()
        const estiJsnon={
            movingWriter:movingWriter,
            movingDetail:movingWriter,
        };
        axios
            .post(`http://localhost:8080/orders/esitmateform`,estiJsnon)
            .then(response => {
                alert('성공');
                sessionStorage.setItem('estiDate', JSON.stringify(response.data));
                console.log(sessionStorage.estiDate);

                history.push('/videotest');
            })
            .catch(error => {
                alert('실패!');
                throw error;
            });
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };
    return <>
        <SideBar/>
        <div style={{maxWidth:'700px',margin:'2rem auto'}}>
            <div style={{textAlign:'center',marginButton:'2rem'}}>
                <h1>2단계.비디오와 가구배치도 올리기</h1>
            </div>
            <MDBCol noValidate validated={validated} onSubmit={handleSubmit}>
                <MDBCard style={{ width: "100%" ,height:"200px"}}>
                    <MDBCardBody>
                        <h3>가구배치도</h3>
                        <MDBBtn color="amber"onClick={e=>setShow(true)}>
                            58평
                        </MDBBtn>
                        <Modal
                            size={"lg"}
                            show={show}
                            onHide={() => setShow(false)}
                            dialogClassName="modal-90w"
                            aria-labelledby="example-custom-modal-styling-title"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-custom-modal-styling-title">
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
            </MDBCol>
            <br/>
            <div style={{marginBottom:50}}>
                <h3>파일 선택 방식</h3>
                <MDBCol>
                    <MDBCard style={{ width: "100%" ,height:"200px"}}>
                        <MDBCardBody>
                            <UploadFiles/>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

            </div>

        </div>
        <div onSubmit>
            <br/>
            <br/>
            <MDBInput label={"제목"}
                      onChange={e=>setMovingWriter(e.target.value)}
                      value={movingWriter}
                  />
            <br/>
            <br/>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>방설명</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Phone Number"
                    value={movingDetail}
                    onChange={e => setMovingDetail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    입력란이 비었습니다!
                </Form.Control.Feedback>
            </Form.Group>

            <br/>
            <br/>
            <Button  onClick={e=>setQrshow(!qrshow)}>
                어플다운받기
                <Modal show={qrshow} size={"sm"}
                       onClick={e=>setQrshow(!qrshow)}
                       onHide={()=>false}>
                    <img src={QRcode}/>
                </Modal>
            </Button>
          <Link to={"/videotest"}> <MDBBtn type={"primary"} onClick={handleSubmit} >
                submit
          </MDBBtn></Link>
        </div>
    </>

}

export default UploadPage;