import axios from "axios"
const EMPLOYEE_API_BASE_URL = "http://localhost:8080";

const $host = axios.create({
    baseURL: EMPLOYEE_API_BASE_URL
})

export {
    $host
}