import React, {Component, createRef, useState} from 'react';

import axios from 'axios'

const UploadTest = () => {

    const teacherStreamingTypes = {REQUEST: "teacherStreaming/REQUEST",
        POST : "teacherStreaming/POST",
        GETFILE :"teacherStreaming/GETFILE",
        DOWNLOAD : "teacherStreaming/DOWNLOAD",
        DELETE : "teacherStreaming/DELETE"}
    const Request = (data) => ({type: teacherStreamingTypes.REQUEST, payload: data})
    const Post = (data) => ({type: teacherStreamingTypes.POST, payload: data})
    const GetFile = (data) => ({type: teacherStreamingTypes.GETFILE, payload: data})
    const DownloadFile = (data) => ({type: teacherStreamingTypes.DOWNLOAD, payload: data})
    const DeleteFile = (data)=> ({type : teacherStreamingTypes.DELETE, payload : data})
    const Apis = () => dispatch => {
        axios.get(`http://localhost:8080/streamings/teacher/100000301`)
            .then(({data})=>{
                dispatch(Request(data))
                console.log(data.classCode)
                console.log(data.studentList)
            })
            .catch(error => {throw (error)})
    }
    const fileListApis = ()=>dispatch => {
        axios.get(`http://localhost:8080/file/list/subject/1`)
            .then(({data})=>{
                dispatch(GetFile(data))
                console.log(data.fileList)
            })
    }
    const postApis = (payload)=>{
        alert("postApis")
        const orderId = JSON.parse(localStorage.estiDate).orderId
        axios.post(`http://localhost:8080/file/upload/${orderId}`,payload,{
            authorization: 'JWT fefege..',
            Accept : 'application/json',
            'Content-Type': 'multipart/form-data'
        })
            .then(res=>
                alert("성공")
            )
    }
    const fileDownloadApis = (fileId, fileName)=>dispatch => {
        console.log(`fileDownloadApis ${fileId}`)
        axios.get(`http://localhost:8080/file/download/${fileId}`,{
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
            }
        }).then(res =>{
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
        })
    }
   /* const fileDeleteApis = (fileId)=>dispatch =>{
        console.log(`fileDeleteApis ${fileId}`)
        axios.get(`http://localhost:5000/file/delete/${fileId}`)
            .then(res=>{
                dispatch(DeleteFile())
            })
    }*/
    const handlePost=()=>{
        alert("hanclePost")
        const formData = new FormData()
        formData.append('file', upload)
        postApis(formData)
     fileListApis()
    }
   /* const [downloadFile,setDownloadFile]=(e,fileId,fileName)=>{
        e.preventDefault()
        fileDownloadApis(fileId,fileName);

    }*/
  /*  const [deleteFile,setDeleteFile]=(e,fileId)=>{
        e.preventDefault()
        fileDeleteApis(fileId)
      fileListApis()
    }*/
    const [upload,setUpload]=useState(null);
    return (
        <div>
            <input type="file" name="file" onChange={e=>setUpload(e.target.files[0])}/>
            <button type="button" onClick={handlePost}>업로드</button>
        </div>
    );
};

export default UploadTest;