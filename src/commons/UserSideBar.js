import React from 'react';
import '../assets/css/main.css'
import {MDBInput} from 'mdbreact'

const UserSideBar = () => {
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
                </ul>
            </nav>
        </>
    );
};

export default UserSideBar;