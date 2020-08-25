import React from 'react';
import {Pagination} from "../../commons";
import {Table} from "react-bootstrap";

import '../../assets/css/sb-admin-2.css'
import {MDBInput} from "mdbreact";
import {Link} from "react-router-dom";

const OrderMains = () => {
    return (
        <>
            <nav className="sidebar sidebar-offcanvas">
                <ul className="nav">
                    <li className="nav-item nav-category"><h3>마이 페이지</h3></li>
                    <li className="nav-item">
                        <a className="nav-link" href="/ordermain">
                            <span className="menu-title">주문 내역</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <span className="menu-title">내 글 보기</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <span className="menu-title">이사 정보</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/">
                            <span className="menu-title">개인 정보 수정</span>
                        </a>
                    </li>
                    <li>
                        <MDBInput label="Search" size="sm" />
                    </li>
                </ul>
            </nav>
            <div id="wrapper">
                <div id="page-wrapper">
                    <div className="row">
                        <div className="col-lg-12"><br/>
                            <h2 className="page-header">주문 내역</h2><br/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="panel panel-default">

                                <div className="panel-body">
                                    <Table responsive hover style={{ textAlign: "center" }}>
                                        <thead >
                                        <tr>
                                            <th>주문 일자</th>
                                            <th>주문 정보</th>
                                            <th>결제 금액</th>
                                            <th>주문 상태</th>
                                        </tr>
                                        </thead>
                                        <tbody >
                                        <tr>
                                            <th><Link to="/orderdetail">
                                                테스트</Link></th>
                                            <th>하는</th>
                                            <th>중</th>
                                            <th>입니다.</th>
                                        </tr>
                                        <tr>
                                            <th>테스트</th>
                                            <th>하는</th>
                                            <th>중</th>
                                            <th>입니다.</th>
                                        </tr>
                                        </tbody>
                                    </Table>
                                    <Pagination/>
                                </div>
                                {/* /.panel-body */}
                            </div>
                            {/* /.panel */}
                        </div>
                        {/* /.col-lg-12 */}
                    </div>
                </div>
                {/* /#page-wrapper */}
            </div>
        </>
    );
};

export default OrderMains;