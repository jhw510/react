import React from 'react';
import '../../assets/css/sb-admin-2.css'
import {MDBBtn, MDBCardBody, MDBCol, MDBContainer, MDBJumbotron, MDBRow} from "mdbreact";
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {UserSideBar} from "../../commons";


const OrderDetail = () => {
    return (
        <>
           <UserSideBar/>
            <div id="wrapper">
                <div id="page-wrapper">
                    <div className="row">
                        <div className="col-lg-12"><br/>
                            <h2 className="page-header">상세 주문</h2><br/>
                        </div>
                        <MDBContainer className="mt-5 text-center">
                            <MDBRow>
                                <MDBCol>
                                    <MDBJumbotron>
                                        <MDBCardBody>
                                            <Table responsive hover style={{ textAlign: "center" }}>
                                                <thead >
                                                <tr>
                                                    <th>출발 날짜</th>
                                                    <th>출발 예정지</th>
                                                    <th>도착 예정지</th>
                                                    <th>이사 규모</th>
                                                    <th>사다리차 신청</th>
                                                    <th>예상 금액</th>
                                                </tr>
                                                </thead>
                                                <tbody >

                                                <tr>
                                                    <th>yyyy/mm/dd</th>
                                                    <th>" "</th>
                                                    <th>" "</th>
                                                    <th>x ton</th>
                                                    <th>유</th>
                                                    <th>원</th>
                                                </tr>
                                                </tbody>
                                            </Table>
                                        </MDBCardBody>
                                    </MDBJumbotron>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                        <div className="lowBtn">
                            <Link to="/ordermain"><MDBBtn className="btn blue-gradient">목록으로</MDBBtn></Link>
                            <Link to="/ordermain"><MDBBtn className="btn blue-gradient">결제하기</MDBBtn></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderDetail;