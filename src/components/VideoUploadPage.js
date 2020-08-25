import React, { useState} from 'react';
import {MDBBtn, MDBCol, MDBCard, MDBCardBody, MDBInput,MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem} from 'mdbreact'
import { Upload, message, Button } from 'antd';
import QRcode from '../assets/img/QRcode.png'
import {Modal} from "react-bootstrap";
import {SideBar} from "../commons";
import http from "../../src/http-common";
import SquareLg from "./move/component/dragdrop/SquareLg";



const VideoUploadPage = () => {
    const [description,setDescription]=useState("")
    const [privates,setPrivates]=useState("")
    const [videoTitle,setVideoTitle]=useState("")
    const [show,setShow]=useState(false)
    const [qrshow,setQrshow]=useState(false)
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [message, setMessage] = useState("");
    const PrivateOptions=[
        {value:0,label:"Private"},
        {value:1,label:"Public"},
    ]
    const CategoryOptions=[
        {value:0,label:"안방"},
        {value:1,label:"작은 방"},
        {value:2,label:"기타 방"},
        {value:3,label:"거실"},
        {value:4,label:"부엌"},
        {value:5,label:"화장실"},
    ]

    const onClickShow=()=>{
        setShow(!show)
    }
    const uploadService = file => {
        let formData = new FormData();
        formData.append("file", file);
        return http.post("/izzifile/imageUpload/456", formData, {});
    };
    const selectFile = (event) => {
        setSelectedFiles(event.target.files);
    };
    const upload = () => {
        let currentFile = selectedFiles[0];
        setCurrentFile(currentFile);
        console.log("ddd")
        uploadService(currentFile, e => {})
            .then((response) => {
                setMessage(response.data);

            })
            .catch(() => {
                setMessage("파일 업로드 실패");
                setCurrentFile(undefined);
            });

        setSelectedFiles(undefined);
    };
    return <>
        <SideBar/>
        <div style={{maxWidth:'700px',margin:'2rem auto'}}>
            <div style={{textAlign:'center',marginButton:'2rem'}}>
                <h1>2단계.비디오와 가구배치도 올리기</h1>
            </div>
            <MDBCol>
                <MDBCard style={{ width: "100%" ,height:"200px"}}>
                    <MDBCardBody>
            <h3>가구배치도</h3>
            <MDBBtn color="amber"onClick={onClickShow}>
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
                            <div>
                                <label className="btn btn-default">
                                    <input type="file" onChange={selectFile} />
                                </label>

                                <button
                                    className="btn btn-success"
                                    disabled={!selectedFiles}
                                    onClick={upload}>
                                    Upload
                                </button>

                                <div className="alert alert-light" role="alert">
                                    {message}
                                </div>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

            </div>
            <div>
                <h3>드래그 방식</h3>
                <MDBCol>
                    <MDBCard style={{ width: "100%" ,height:"200px"}}>
                        <MDBCardBody>

                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

            </div>

        </div>
        <div onSubmit>
            <br/>
            <br/>
            <MDBInput label={"제목"}
                      onChange={e=>setVideoTitle(e.currentTarget.value)}
                      value={videoTitle}
                      placeholder={"   원룸입니다."}/>
            <br/>
            <br/>
            <MDBInput label={"방설명"}
                      onChange={e=>setDescription(e.currentTarget.value)}
                      value={e=>setPrivates(e.currentTarget.value)}
                      placeholder={"   집안에 짐이 많고..."}/>
            <MDBDropdown>
                <MDBDropdownToggle nav caret color="success">
                    공개여부
                </MDBDropdownToggle>
                <MDBDropdownMenu color="success">
                    <MDBDropdownItem>비공개</MDBDropdownItem>
                    <MDBDropdownItem>공개</MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>
            <MDBDropdown>
                <MDBDropdownToggle nav caret color="success">
                    방구분
                </MDBDropdownToggle>
                <MDBDropdownMenu color="success">
                    <MDBDropdownItem>안방</MDBDropdownItem>
                    <MDBDropdownItem>거실</MDBDropdownItem>
                    <MDBDropdownItem>작은방</MDBDropdownItem>
                    <MDBDropdownItem>화장실</MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>
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
            <MDBBtn type={"primary"} onClick href={"/videotest"}>
                submit
            </MDBBtn>
        </div>
    </>

}

export default VideoUploadPage;