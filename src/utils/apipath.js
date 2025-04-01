export const BASE_URL = 'http://localhost:8000';

// utils/api/path.js
export const API_PATH = {
    AUTH:{
        LOGIN:"/api/v1/auth/login",
        REGISTER:"/api/v1/auth/register",
        GET_USER_INFO:"/api/v1/auth/getUser"
    },
    DASHBOARD:{
        GET_DATA:"/api/v1/dashboard",

    },
    INCOME:{
        ADD_INCOME:"/api/v1/income/add",
        GET_ALL_INCOME:"/api/v1/income/get",
        DELETE_INCOME:(incomeId)=>`/api/v1/income/${incomeId}`,
        DOWNLOAD_INCOME:"/api/v1/income/downloadexcel",
    },
    EXPENCE:{
        ADD_EXPENCE:"/api/v1/expence/add",
        GET_ALL_EXPENCE:"/api/v1/expence/get",
        DELETE_EXPENCE:(expenceId)=>`/api/v1/expence/${expenceId}`,
        DOWNLOAD_EXPENCE:"/api/v1/expence/downloadexcel",
    },
    IMAGE:{
        UPLOAD_IMAGE:"/api/v1/auth/upload-image"
    }
}