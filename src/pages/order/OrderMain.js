import React from 'react';
import {MDBDataTableV5} from 'mdbreact';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/sb-admin-2.css'
import {UserSideBar} from '../../commons/index'

export default function SelectSearchTopReverse() {
    const fetchData = e => {
        e.preventDefault();
        axios.get(``);
    };
    const [datatable, setDatatable] = React.useState({
        columns: [
            {
                label: '주문 일자',
                field: 'date',
                width: 150,
                sort: 'asc',

            },
            {
                label: '주문 정보',
                field: 'info',
                sort: 'asc',
                width: 270,
            },
            {
                label: '결제 금액',
                field: 'price',
                sort: 'asc',
                width: 100,
            },
            {
                label: '주문 상태',
                field: 'state',
                sort: 'asc',
                width: 200,
            },
        ],
        rows: [
            {
                date: <Link to="/orderdetail">테스트</Link>,
                info: (
                    <Link to="/orderdetail">하는</Link>
                ),
                price: 1,
                state: <Link to="/orderdetail">중입니다</Link>,
            },
            {
                date: <Link to="/orderdetail">테스트</Link>,
                info: (
                    <Link to="/orderdetail">하는</Link>
                ),
                price: '2',
                state: <Link to="/orderdetail">중입니다</Link>,
            },
        ],
    });

    return (
        <>
        <UserSideBar/>
        <div style={{padding: '1rem', margin: '0 auto', maxWidth: 1000}}>
            <h1 className='text-center' style={{padding: '1rem'}}>
                주문 내역{' '}
            </h1>
            <div id="wrapper">
            <MDBDataTableV5
                // bordered 테두리
                hover
                entriesOptions={[5, 10, 20]}
                entries={10}
                pagesAmount={4}
                data={datatable}
                pagingTop
                searchTop
                searchBottom={false}
                barReverse
                style={{padding: '1rem', margin: '0 auto', maxWidth: 1200}}
            />
            </div>
        </div>
        </>
    );
}
