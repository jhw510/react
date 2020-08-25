import React, {useEffect, useState} from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBInput} from 'mdbreact';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';

const UserMypage = () => {
	const [accountInfo] = useState(JSON.parse(sessionStorage.userData));
	const [id, setId] = useState('');
	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [addr, setAddr] = useState('');
	const [email, setEmail] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [gender, setGender] = useState('');
	const [userData, setUserData] = useState(
		JSON.parse(sessionStorage.getItem('userData') || '{}'),
	);
	const history = useHistory();
	useEffect(() => {
		if(accountInfo) {
			setId(userData.id);
			setBirthDate(userData.birthDate);
			setGender(userData.gender);
			setAddr(userData.address);
			setName(userData.name);
			setUserId(accountInfo.userId);
			setPhoneNumber(accountInfo.phoneNumber);
			setEmail(accountInfo.email);
		}
	}, [userData]);

	const handleSubmit = e => {
		e.preventDefault();
		const userJson = {
			userId: userId,
			password: password,
			phoneNumber: phoneNumber,
			email: email,
		};
		axios
			.patch(`http://localhost:8080/users/modify/${userId}`, userJson)
			.then(response => {
				sessionStorage.setItem('userData', JSON.stringify(response.data));
				setUserData(JSON.parse(sessionStorage.getItem('userData') || '{}'));
				console.log(response.data);
				alert('회원 정보가 변경되었습니다.');
				history.push('/');
			})
			.catch(error => {
				alert('회원 정보 변경 실패');
				throw error;
			});
	};
	const handleDelete = e => {
		e.preventDefault();
		axios
			.delete(`http://localhost:8080/users/delete/${id}`)
			.then(() => {
				sessionStorage.clear();
				alert('회원 탈퇴 완료');
				history.push('/');
				window.location.reload();
			})
			.catch(error => {
				throw error;
			});
	};
	return (
		<>
			<form
				style={{
					padding: '6rem',
					margin: '0 auto',
					maxWidth: 800,
					maxHeight: 1000,
				}}
			>
				<section>
					<div className='container' style={{maxHeight: 1000}}>
						<div className='row'>
							<MDBCol>
								<MDBCard>
									<MDBCardBody className='mx-4'>
										<div className='text-center'>
											<h3 className='dark-grey-text mb-5'>
												<strong>{name} 님 회원 정보</strong>
											</h3>
										</div>
										<MDBInput
											label='아이디'
											group
											type='text'
											validate
											value={userId}
										/>
										<MDBInput
											label='변경할 비밀번호를 입력해주세요'
											group
											type='text'
											validate
											value={password}
											onChange={e => setPassword(e.target.value)}
										/>

										<MDBInput
											label='생년월일'
											group
											type='date'
											validate
											containerClass='mb-0'
											value={birthDate}
										/>
										<MDBInput label='성별' required value={gender}></MDBInput>
										<MDBInput
											label='변경할 전화번호를 입력해주세요'
											group
											type='text'
											validate
											containerClass='mb-0'
											value={phoneNumber}
											onChange={e => setPhoneNumber(e.target.value)}
										/>
										<MDBInput
											label='주소지'
											group
											type='text'
											validate
											containerClass='mb-0'
											value={addr}
										/>
										<MDBInput
											label='변경할 이메일 주소를 입력해주세요'
											group
											type='email'
											validate
											containerClass='mb-0'
											value={email}
											onChange={e => setEmail(e.target.value)}
										/>
										<div className='text-center mb-3'>
											<MDBBtn
												type='submit'
												gradient='blue'
												rounded
												className='btn-block z-depth-1a'
												onClick={handleSubmit}
											>
												수정하기
											</MDBBtn>
										</div>
										<div className='text-center mb-3'>
											<MDBBtn
												type='submit'
												gradient='blue'
												rounded
												className='btn-block z-depth-1a'
												onClick={handleDelete}
											>
												탈퇴하기
											</MDBBtn>
										</div>

										<div className='row my-3 d-flex justify-content-center'></div>
									</MDBCardBody>
								</MDBCard>
							</MDBCol>
						</div>
					</div>
				</section>
			</form>
		</>
	);
};

export default UserMypage;
