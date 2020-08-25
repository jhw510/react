import React, {useEffect, useState} from 'react';

import {SideBar} from '../../commons/index';
import axios from 'axios';

import {Link, useHistory} from 'react-router-dom';
import {MDBBtn} from 'mdbreact';
import MaterialTable from "material-table";

const Market = () => {
	const [articlesList, setArticlesList] = useState([]);
	const history =useHistory()
	useEffect(() => {
		axios
			.get(`http://localhost:8080/articles/list`)
			.then(({data}) => {
				setArticlesList(data.list);
				console.log(data.list);
			})
			.catch(error => {
				throw error;
			});
	}, []);
	const columns=[
		{title: '번호', field: 'articleId'},
		{title: '제목', field: 'title'},
		{title: '글쓴이', field: 'writer'},
		{title: '희망 거래 장소', field: 'address'},
		{title: '작성일', field: 'regDate'},
	]
	return (
		<>
			<SideBar />
			<div style={{padding: '2rem', margin: '0 auto', maxWidth: 1200}}>
				<div className='row'>
					<div className='col-sm-12'>
						<div className='card'>
							<div className='card-body'>
								<div id='batchDelete' className='transactions'>
									<MaterialTable
										title='중고 게시판'
										columns={columns}
										data={articlesList}
										options={{
											search: true,
											pageSize: 10,
											columnsButton: true,
											maxBodyHeight: 700,
											grouping: true,
										}}
										onRowClick={((event, rowData) => {
											sessionStorage.userData ? (	history.push(`/userInfo/${rowData.articleId}`))
												: history.push('/login')
										})}
									/>
								</div>
								{sessionStorage.userData && (
									<Link to='/write'>
										<MDBBtn className='btn blue-gradient'>글쓰기</MDBBtn>
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Market;