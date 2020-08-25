import React, {useEffect, useState} from "react";
import "../assets/css/calendar.css";
import DatePicker, { Calendar,utils } from "react-modern-calendar-datepicker";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
const MCalendar = () => {
    //multiSelect
    const [selectedDay, setSelectedDay] = useState("");
    const [validated, setValidated] = useState(false);
    const[pbRain, setPbRain] = useState([])
    //console.log(movingDate)
    const [data, setData] = useState([]);
    const history = useHistory();
    const handleSubmit = (event) => {
        event.preventDefault()
        const estiJsnon={
            movingDate:selectedDay,
        };
        axios
            .post(`http://localhost:8080/orderlist/esitmateform`,estiJsnon)
            .then(response => {
                alert('성공');
                history.push('/videoform');
            })
            .catch(error => {
                alert('실패');
                throw error;
            });
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };
    //greenDay = handDay, redDay = holiDay, primaryDay = saleDay
    /*year: 2020,
        month: 8,
        day: 18,
        className: 'handDay'*/
    const goodDays = [
        {
            year: 2020,
            month: 8,
            day: 18,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 8,
            day: 27,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 8,
            day: 28,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 9,
            day: 6,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 9,
            day: 7,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 9,
            day: 16,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 9,
            day: 25,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 9,
            day: 26,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 9,
            day: 30,
            className: 'holiDay'
        },
        {
            year: 2020,
            month: 10,
            day: 1,
            className: 'holiDay'
        },
        {
            year: 2020,
            month: 10,
            day: 2,
            className: 'holiDay'
        },
        {
            year: 2020,
            month: 10,
            day: 3,
            className: 'holiDay'
        },
        {
            year: 2020,
            month: 10,
            day: 5,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 10,
            day: 6,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 10,
            day: 9,
            className: 'holiDay'
        },
        {
            year: 2020,
            month: 10,
            day: 15,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 10,
            day: 16,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 10,
            day: 25,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 10,
            day: 26,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 11,
            day: 4,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 11,
            day: 5,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 11,
            day: 9,
            className: 'saleDay'
        },
        {
            year: 2020,
            month: 11,
            day: 10,
            className: 'saleDay'
        },
        {
            year: 2020,
            month: 11,
            day: 11,
            className: 'saleDay'
        },
        {
            year: 2020,
            month: 11,
            day: 12,
            className: 'saleDay'
        },
        {
            year: 2020,
            month: 11,
            day: 13,
            className: 'saleDay'
        },
        {
            year: 2020,
            month: 11,
            day: 16,
            className: 'saleDay'
        },
        {
            year: 2020,
            month: 11,
            day: 17,
            className: 'saleDay'
        },
        {
            year: 2020,
            month: 11,
            day: 18,
            className: 'saleDay'
        },
        {
            year: 2020,
            month: 11,
            day: 19,
            className: 'saleDay'
        },
        {
            year: 2020,
            month: 11,
            day: 20,
            className: 'saleDay'
        },
        {
            year: 2020,
            month: 11,
            day: 14,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 11,
            day: 23,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 11,
            day: 24,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 12,
            day: 3,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 12,
            day: 4,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 12,
            day: 13,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 12,
            day: 14,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 12,
            day: 23,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 12,
            day: 24,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 12,
            day: 25,
            className: 'holiDay'
        },
    ];
    const priceStyle = {
        color : 'red'
    }
    useEffect(() => {
            axios.get(`http://localhost:8080/statistics/pbRain`)
                .then((res) => {
                    const pBRainDate = [];
                    res.data.pbRain.forEach(one => {
                        let obj = {};
                        if(one.rainProb <= 20) {
                            obj.year = 2020;
                            obj.month = Number(one.precipitationDate.split("-")[0]);
                            obj.day = Number(one.precipitationDate.split("-")[1]);
                            obj.className = 'purpleDay';
                            pBRainDate.push(obj);
                        } else if(one.rainProb <= 40) {
                            obj.year = 2020;
                            obj.month = Number(one.precipitationDate.split("-")[0]);
                            obj.day = Number(one.precipitationDate.split("-")[1]);
                            obj.className = 'handDay';
                            pBRainDate.push(obj);
                        }else if(one.rainProb <= 60) {
                            obj.year = 2020;
                            obj.month = Number(one.precipitationDate.split("-")[0]);
                            obj.day = Number(one.precipitationDate.split("-")[1]);
                            obj.className = 'navyBlueDay';
                            pBRainDate.push(obj);
                        }else if(one.rainProb <= 80) {
                            obj.year = 2020;
                            obj.month = Number(one.precipitationDate.split("-")[0]);
                            obj.day = Number(one.precipitationDate.split("-")[1]);
                            obj.className = 'handDay';
                            pBRainDate.push(obj);
                        } else {
                            obj.year = 2020;
                            obj.month = Number(one.precipitationDate.split("-")[0]);
                            obj.day = Number(one.precipitationDate.split("-")[1]);
                            obj.className = "holiDay";
                            pBRainDate.push(obj);
                        }
                    });
                    setData(pBRainDate);
                    setPbRain(res.data.pbRain)
                }).catch(
                error => {
                    throw(error)
                }
            )
            setData(goodDays)
        }
        , [])
   /* console.log(selectedDay)*/
    return (
        <div id="wrapper">
            <div id="page-wrap">
                <div className="row">
                    <section className="select">
                        {/*<Calendar
                            value={selectedDay}
                            onClick={setSelectedDay}
                            minimumDate={utils().getToday()}
                            shouldHighlightWeekends
                            customDaysClassName={data}
                        />*/}
                        <DatePicker
                            value={selectedDay}
                            onChange={setSelectedDay}
                            inputPlaceholder="Select a day"
                            minimumDate={utils().getToday()}
                            shouldHighlightWeekends
                            customDaysClassName={data}
                        />
                    </section>
                    <section className="card-body">
                        <br/>
                        <p className="color-a"><h4>＊손 없는 날</h4><h5 style={priceStyle}>35% 추가 금액 적용</h5></p>
                        <p className="color-b"><h4>＊공휴일</h4><h5 style={priceStyle}>15% 추가 금액 적용</h5></p>
                        <p className="color-c"><h4>＊특가 기간</h4><h5 style={priceStyle}>20% 할인 금액 적용</h5></p>
                    </section>
                    {/*// 주말월말에는 평일에 비해서 이사가 많아 가격이 15% 비싸요
                    // 손 없는날은 35퍼*/}
                </div>
            </div>
        </div>
    );
};
export default MCalendar;