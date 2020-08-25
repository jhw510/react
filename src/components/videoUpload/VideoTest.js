import React, {useEffect, useRef, useState} from 'react';
import ReactPlayer from 'react-player'
import Duration from './Duration'
import {MDBBtn, MDBInput, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText} from 'mdbreact'
import {SideBar} from "../../commons";
import {Link, useHistory} from 'react-router-dom'
import {Col, Form} from "react-bootstrap";
import {Postcode} from "../../pages/account";
import "../../assets/css/calendar.css";
import DatePicker, {Calendar, utils} from "react-modern-calendar-datepicker";
import axios from "axios";
import {CardDeck,Card} from 'react-bootstrap'
const VideoTest = () => {
    const [accountInfo,setAccountInfo] = useState(JSON.parse(localStorage.estiDate));
    const [state, setState] = useState("")
    const [url, setUrl] = useState(null)
    const [controls, setControls] = useState(false)
    const [light, setLight] = useState(false)
    const [volume, setVolume] = useState(0.8)
    const [muted, setMuted] = useState(false)
    const [duration, setDuration] = useState(0)
    const [playbackRate, setPlaybackRate] = useState(1.0)
    const [loop, setLoop] = useState(false)
    const [pip, setPip] = useState(false)
    const [playing, setPlaying] = useState(true)
    const [seeking, setSeeking] = useState(false)
    const [player, setPlayer] = useState("")
    const [movingDetail, setMovingDetail] = useState('')
    const [movingName, setMovingName] = useState('')
    const [movingWriter, setMovingWriter] = useState('')
    const [movingPhone, setMovingPhone] = useState('');
    const [movingFrom, setMovingFrom] = useState('');
    const [movingTo, setMovingTo] = useState('');
    const [optionalAddrFrom, setOptionalAddrFrom] = useState('')
    const [optionalAddrTo, setOptionalAddrTo] = useState('')
    const [movingType, setMovingType] = useState('')
    const [square,setSquare]=useState('')
    const [strSelectedDay, setStrSelectedDay] = useState("");
    const [selectedDay, setSelectedDay] = useState(utils().getToday());
    const [userId, setUserId] = useState(JSON.parse(sessionStorage.userData).userId);
    const [validated, setValidated] = useState(false);
    const [data, setData] = useState([]);
    const [pbRain, setPbRain] = useState([])
    const [id, setId] = useState('');
    const [movingDate,setMovingDate]=useState('')
    const [orderId,setOrderId]=useState('')
    useEffect(() => {
        if(accountInfo) {
            setMovingName(accountInfo.movingName);
            setMovingPhone(accountInfo.movingPhone);
            setMovingFrom(accountInfo.movingFrom);
            setOptionalAddrFrom(accountInfo.optionalAddr);
            setMovingWriter(accountInfo.movingWriter);
            setMovingDetail(accountInfo.movingDetail);
            setMovingTo(accountInfo.movingTo);
            setSquare(accountInfo.square);
            setMovingType(accountInfo.movingType);
            setOptionalAddrFrom(accountInfo.optionalAddrFrom);
            setOptionalAddrTo(accountInfo.optionalAddrTo);
            setMovingDate(accountInfo.movingDate);
            setOrderId(accountInfo.orderId)
        }
    })
    const load = url => {
        setState({
            url,
            played: 0,
            loaded: 0,
            pip: false
        })
    }
/*
    const renderLoadButton = (url, label) => {
        return (
            <button onClick={() => load(url)}>
                {label}
            </button>
        )
    }
    const handlePlayPause = () => {
        setPlaying(!playing)
    }

    const handleTogglePIP = () => {
        setPip(!pip)
    }

    const handlePlay = () => {
        console.log('onPlay')
        setPlaying(playing)
    }
    const handleEnablePIP = () => {
        console.log('onEnablePIP')
        setPip(true)
    }
    const handleDisablePIP = () => {
        console.log('onDisablePIP')
        setPip(!pip)
    }
    const handlePause = () => {
        console.log('onPause')
        setPlaying(false)//무조건 false로 둘것
    }
    const handleEnded = () => {
        console.log('onEnded')
        setPlaying(loop)
    }
    const handleDuration = (duration) => {
        console.log('onDuration', duration)
        setDuration(duration)
    }*/
    const ref = player => {
        setPlayer(player)
    }
    const playerref = useRef(ref)
    const handleProgress = state => {
      // console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!seeking) {
            setState(state)
        }
    }
    const modifyBtn = (e) => {
        e.preventDefault();
            const data = selectedDay;
            const movingDate = `${data.year}-${data.month}-${data.day}`;
            setStrSelectedDay(movingDate);
            handleSubmit();
    }
    const handleSubmit = () => {
        console.log(strSelectedDay);
        const estiJsnon = {
            movingName: movingName,
            movingPhone: movingPhone,
            movingFrom: movingFrom,
            movingTo: movingTo,
            optionalAddrFrom: optionalAddrFrom,
            optionalAddrTo: optionalAddrTo,
            movingDate: strSelectedDay,
            movingType: movingType,
            movingWriter: movingWriter,
            movingDetail: movingDetail,
            square: square,
            userId: userId,
        };
        if (strSelectedDay === "") {
            alert("내용을 한번 더 확인해 주세요!");

        } else if (strSelectedDay !== "") {
            axios
                .patch(`http://localhost:8080/orders/modifyform/${userId}`, estiJsnon)
                .then(response => {
                    alert('성공');
                    localStorage.setItem('estiDate', JSON.stringify(response.data));
                    setAccountInfo(JSON.parse(localStorage.getItem('estiDate') || '{}'));
                    console.log(response.data);
                    alert('견적서가 변경되었습니다.');
                    window.location.href = '/videotest';
                    /*      history.push('/videotest');*/
                })
                .catch(error => {
                    alert('실패했어요!');
                    throw error;
                });
        }
    }
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
        color: 'red'
    }
    useEffect(() => {
            axios.get(`http://localhost:8080/statistics/pbRain`)
                .then((res) => {
                    const pBRainDate = [];
                    res.data.pbRain.forEach(one => {
                        let obj = {};
                        if (one.rainProb <= 20) {
                            obj.year = 2020;
                            obj.month = Number(one.precipitationDate.split("-")[0]);
                            obj.day = Number(one.precipitationDate.split("-")[1]);
                            obj.className = 'pbRain20';
                            pBRainDate.push(obj);
                        } else if (one.rainProb <= 40) {
                            obj.year = 2020;
                            obj.month = Number(one.precipitationDate.split("-")[0]);
                            obj.day = Number(one.precipitationDate.split("-")[1]);
                            obj.className = 'pbRain40';
                            pBRainDate.push(obj);
                        } else if (one.rainProb <= 60) {
                            obj.year = 2020;
                            obj.month = Number(one.precipitationDate.split("-")[0]);
                            obj.day = Number(one.precipitationDate.split("-")[1]);
                            obj.className = 'pbRain60';
                            pBRainDate.push(obj);
                        } else {
                            obj.year = 2020;
                            obj.month = Number(one.precipitationDate.split("-")[0]);
                            obj.day = Number(one.precipitationDate.split("-")[1]);
                            obj.className = 'pbRain80';
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
    const renderCustomInput = ({ ref }) => (
        <input
            readOnly = "true"
            ref={ref}
            placeholder="Select a Day"
            value ={`${selectedDay.year}/${selectedDay.month}/${selectedDay.day}`}
            style={{
                textAlign: 'center',
                padding: '0.3rem 0.5rem',
                fontSize: 'medium',
                border: '1px solid #184f90',
                borderRadius: '50px',
                boxShadow: '0 0.5rem 1rem rgba(156, 136, 255, 0.2)',
                color: '#184f90',
                outline: 'none',
                margin : '0.3rem'
            }}
            className="my-custom-input-class"
        />
    )
    const [imageList, setImageList] = useState([]);
    const [date,setDate]=useState([]);
    useEffect(() => {
       console.log(JSON.parse(sessionStorage.getItem("userData")).id)
        axios
            .get(`http://localhost:8080/file/geturi/${JSON.parse(localStorage.getItem("estiDate")).orderId}`)
            .then(({data}) => {
                setImageList(data);
                console.log("data :" + data);
                console.log("setImageList :" + imageList);

            })
            .catch(error => {
                throw error;
            });
    }, []);


    return (
        <div>
            <SideBar/>
            <div id="wrapper">
                <div id="page-wrapper">
                    <div className="row">
                        <div className="col-lg-12"><br/>
                            <h2 className="page-header">{userId}견적서 작성 내역</h2><br/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="panel panel-default">
                                <MDBCol style={{maxWidth: "100rem"}}>
                                    <MDBCard>
                                        <ReactPlayer ref={playerref}
                                                     className='react-player'
                                                     width='900px'
                                                     height={'500px'}
                                                     url={"https://youtu.be/NgHu-hnW8KQ"}
                                                     pip={pip}
                                                     playing={playing}
                                                     controls={controls}
                                                     light={light}
                                                     loop={loop}
                                                     playbackRate={playbackRate}
                                                     volume={volume}
                                                     muted={muted}
                                                     onReady={() => console.log('onReady')}
                                                     onStart={() => console.log('onStart')}
                                                     onPlay={() => {
                                                         setPlaying(playing)
                                                     }}
                                                     onEnablePIP={() => setPip(true)}
                                                     onDisablePIP={() => setPip(!pip)}
                                                     onPause={() => setPlaying(false)}
                                                     onBuffer={() => console.log('onBuffer')}
                                                     onSeek={e => console.log('onSeek', e)}
                                                     onEnded={() => setPlaying(loop)}
                                                     onError={e => console.log('onError', e)}
                                                     onProgress={handleProgress}
                                                     onDuration={(duration) => setDuration(duration)}/>
                                        <MDBCardBody>
                                            <MDBCardTitle>영상정보</MDBCardTitle>
                                            <MDBCardText>
                                                <tbody>
                                                <tr>
                                                    <th>영상이</th>
                                                    <td>{playing ? '나오고 있습니다.' : '멈췄습니다.'}</td>
                                                </tr>
                                                <tr>
                                                    <th>볼륨크기</th>
                                                    <td>{volume.toFixed(3)}</td>
                                                </tr>
                                                <tr>
                                                    <th>영상길이</th>
                                                    <td><Duration seconds={duration}/></td>
                                                </tr>
                                                </tbody>
                                            </MDBCardText>
                                            <tr>
                                                <th>재생 버튼</th>
                                                <td>
                                                    <MDBBtn
                                                        onClick={() => {
                                                            setPlaying(!playing)
                                                        }}>{playing ? '일시정지' : '재생시작'}</MDBBtn>
                                                    {light &&
                                                    <MDBBtn onClick={() => player.showPreview()}>Show preview</MDBBtn>}
                                                    {ReactPlayer.canEnablePIP(url) &&
                                                    <MDBBtn
                                                        onClick={() => {
                                                            setPip(!pip)
                                                        }}>{pip ? 'Disable PiP' : 'Enable PiP'}</MDBBtn>}
                                                </td>
                                            </tr>
                                        </MDBCardBody>

                                        <MDBCardBody>
                                            <h1>올린사진</h1>
                                            <h1>{imageList}</h1>
                                                    <img src={imageList}/>
                                        </MDBCardBody>
                                        
                                    </MDBCard>
                                </MDBCol>
                                <form method="post">
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">작성자</label>
                                        <MDBInput
                                            type="text" className="form-control"
                                            id="exampleFormControlInput1" name="crea_id"
                                            value={movingName}
                                            onChange={e=> setMovingName(e.target.value)}/>
                                    </div>
                                    <br/>

                                    <br/>
                                    <Form.Label>신청인 연락처</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        value={movingPhone}
                                    />

                                    <MDBInput
                                        label='아이디'
                                        group
                                        type='text'
                                        validate
                                        value={movingFrom}
                                        onChange={e => setMovingFrom(e.target.value)}

                                    />
                                    <Form.Group as={Col} md="10" controlId="validationCustom03">
                                        <Form.Label>출발지 정보</Form.Label>
                                        <Form.Control
                                            type="text"

                                            required
                                            value={movingFrom}
                                            onChange={e => setMovingFrom(e.target.value)}/>
                                        <div className='input-group-append'>
                                            <Postcode onSelectedAddr={setMovingFrom}/>
                                        </div>
                                        <Form.Control.Feedback type="invalid">
                                            입력란이 비었습니다!
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="10" controlId="validationCustom04">
                                        <Form.Label>상세주소</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="상세주소"
                                            required
                                            value={optionalAddrFrom}
                                            onChange={e => setOptionalAddrFrom(e.target.value)}/>

                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>평수 </Form.Label>
                                        <Form.Control as="select"
                                                      required
                                                      value={square}
                                                      onChange={e => setSquare(e.target.value)}>
                                            <option >선택</option>
                                            <option value={25}>25평 이하</option>
                                            <option value={35}>35평 이하</option>
                                            <option value={40}>40평 이하</option>
                                            <option value={45}>45평 이상</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <div id="wrapper">
                                            <div id="page-wrap">
                                                <section className="select">
                                                    <Form.Label>이사 날짜</Form.Label>
                                                    <div>
                                                        <DatePicker
                                                            value={selectedDay}
                                                            renderInput={renderCustomInput}
                                                            inputClassName="my-custom-input-class"
                                                            shouldHighlightWeekends
                                                        />
                                                    </div>
                                                    <div className="row">
                                                        <Calendar

                                                            value={selectedDay}
                                                            onChange={setSelectedDay}
                                                            minimumDate={utils().getToday()}
                                                            colorPrimary="#00365a"
                                                            calendarClassName="custom-calendar"
                                                            shouldHighlightWeekends
                                                            customDaysClassName={data}
                                                        />
                                                        <section className="card-body">
                                                            <h2>확정 이사 날짜</h2>
                                                            <h2> {movingDate}</h2>
                                                        </section>
                                                    </div>
                                                </section>

                                            </div>
                                        </div>
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>이사 유형</Form.Label>
                                        <Form.Control as="select"
                                                      required
                                                      value={movingType}
                                                      onChange={e => setMovingType(e.target.value)}>
                                            <option >선택</option>
                                            <option value={'집이사'}>집이사</option>
                                            <option value={'사무실이사'}>사무실이사</option>
                                            <option value={'보관이사'}>보관이사</option>
                                            <option value={'소형이사'}>소형이사</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col} md="10" controlId="validationCustom03">
                                        <Form.Label>도착지 정보</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="주소를 입력해 주세요."
                                            required
                                            value={movingTo}
                                           />
                                        <div className='input-group-append'>
                                            <Postcode onSelectedAddr={setMovingTo}/>
                                        </div>
                                    </Form.Group>
                                    <Form.Group as={Col} md="10" controlId="validationCustom04">
                                        <Form.Label>상세주소</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="상세주소"
                                            required={true}
                                            value={optionalAddrTo}
                                        />
                                    </Form.Group>
                                    <div className="form-group">

                                        <label htmlFor="exampleFormControlInput1">제목</label>
                                        <MDBInput
                                            type="text"
                                            validate
                                            value={movingWriter}
                                            onChange={e=> setMovingWriter(e.target.value)}/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlTextarea1">내용</label>
                                        <textarea className="form-control" id="exampleFormControlTextarea1"
                                                  name="contents" rows={10} value={movingDetail}>
                                         </textarea>
                                    </div>
                                    <MDBBtn type="submit" className="btn btn-info" onClick={modifyBtn}>수정하기</MDBBtn>
                                    <Link to={"/videocommunity"}> <MDBBtn type="button"
                                                                          className="btn btn-secondary">목록으로</MDBBtn></Link>
                                </form>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
};

export default VideoTest;