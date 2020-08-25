import http from "../../http-common";

const upload = (file, onUploadProgress) => {

    let formData = new FormData();
    console.log(JSON.parse(localStorage.estiDate).orderId);
    formData.append("file", file);
    console.log(file)
    return http.post(`/izzifile/upload/${JSON.parse(localStorage.estiDate).orderId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    });
};

const getFiles = () => {
    return  null/*http.get("/izzifile/files")*/;
};

export default {
    upload,
    getFiles,
};
