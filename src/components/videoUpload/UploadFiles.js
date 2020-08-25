/*
import React, { useState, useEffect } from "react";
import UploadService from "./UploadService";

const UploadFiles = () => {
    useEffect(() => {
        UploadService.getFiles().then((response) => {
            setFileInfos(response.data);
        });
    }, []);
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [fileInfos, setFileInfos] = useState([]);
    const [orderId,setOrderId]=useState(JSON.parse(localStorage.estiDate).orderId)
    const selectFile = (event) => {
        setSelectedFiles(event.target.files);
    };
    const upload = () => {

        let currentFile = selectedFiles[0];
        setProgress(0);
        setCurrentFile(currentFile);
        setOrderId('');

        UploadService.upload(currentFile, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        })
            .then((response) => {
                setMessage(response.data.message);
                return UploadService.getFiles();
            })
            .then((files) => {
                setFileInfos(files.data);
            })
            .catch(() => {
                setProgress(0);
                setMessage("Could not upload the file!");
                setCurrentFile(undefined);
            });

        setSelectedFiles(undefined);
    };
    return (
        <div>
        <div>
            {currentFile && (
                <div className="progress">
                    <div
                        className="progress-bar progress-bar-info progress-bar-striped"
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: progress + "%" }}
                    >
                        {progress}%
                    </div>
                </div>
            )}

            <label className="btn btn-default">
                <input type="file" onChange={selectFile} />
            </label>

            <button
                className="btn btn-success"
                disabled={!selectedFiles}
                onClick={upload}
            >
                Upload
            </button>

            <div className="alert alert-light" role="alert">
                {message}
            </div>

      {/!*<div className="card">
                <div className="card-header">List of Files</div>
               <ul className="list-group list-group-flush">
                    {fileInfos &&
                    fileInfos.map((file, index) => (
                        <li className="list-group-item" key={2}>
                            <a href={file.url}>{file.name}</a>
                            <h1>{file.url}</h1>
                        </li>

                    ))}
                </ul>
            </div>*!/}
        </div>
        </div>
    );
};

export default UploadFiles;
*/

import React from 'react';

const UploadFiles = () => {
    return (
        <div>
            <h1>d</h1>
        </div>
    );
};

export default UploadFiles;