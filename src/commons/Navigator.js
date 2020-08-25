import React, {useEffect, useState} from 'react';
import {Nav, Navbar, Form} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import '../assets/css/main.css';
import logo from '../assets/img/logo2.png';

export const Navigator = () => {
    const [accountInfo] = useState(JSON.parse(sessionStorage.getItem("userData")));
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (accountInfo) {
            setUserId(accountInfo.userId);
        }
    }, [accountInfo]);

    const history = useHistory();
    const handleLogout = () => {
        sessionStorage.clear();
        history.push('/');
        window.location.reload(); // 새로고침버튼처럼 현재 리소스를 다시불러옴
    };
    return (
        <div className="navbar-fixed">
            <Navbar className='navbar-collapse' variant='dark'>
                <Link to='/'>
                    <Navbar.Brand>
                        <img
                            alt=''
                            src={logo}
                            width='75'
                            height='75'
                            className='d-inline-block align-top'
                        />{' '}
                    </Navbar.Brand>
                </Link>
                <Nav className='ml-auto'>
                    <Link to='/'>
                        <Navbar.Brand>HOME</Navbar.Brand>
                    </Link>
                    <Link to='/notice'>
                        <Navbar.Brand>공지사항</Navbar.Brand>
                    </Link>
                    <Link to='/community'>
                        <Navbar.Brand>커뮤니티</Navbar.Brand>
                    </Link>
                    <Link to='/contacts'>
                        <Navbar.Brand>고객지원</Navbar.Brand>
                    </Link>
                    <Link to='/estimate'>
                        <Navbar.Brand>견적신청서</Navbar.Brand>
                    </Link>
                </Nav>
                <Form inline className='ml-auto'>
                    {!userId && (
                        <>
                            <Link to='/login'>
                                <Navbar.Brand>로그인</Navbar.Brand>
                            </Link>
                            <Link to='/signup'>
                                <Navbar.Brand>회원가입</Navbar.Brand>
                            </Link>
                        </>
                    )}
                    {userId && (
                        <>
                            <Navbar.Brand onClick={handleLogout}>로그아웃</Navbar.Brand>
                            {userId === 'slimshady20' && (
                                <Link to='/adminMyPage'>
                                    <Navbar.Brand> MyPage</Navbar.Brand>
                                </Link>
                            )}
                            {userId !== 'slimshady20' && (
                                <Link to='/userMyPage'>
                                    <Navbar.Brand>Mypage</Navbar.Brand>
                                </Link>
                            )}
                        </>

                    )}
                </Form>
            </Navbar>
        </div>
    );
};
export default Navigator;
