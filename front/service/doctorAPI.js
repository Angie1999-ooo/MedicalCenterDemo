import {$host } from "./index"
import {format} from "date-fns";


export const fetchTimeTable = async ( page,limit) => {
    const {data} = await $host.get('/timetable', {
        params:
            {page, limit}
    })
    return data
}

export const fetchDoctor = async ( page,limit) => {
    const {data} = await $host.get('/doctor', {
        params:
            {page, limit}
    })
    return data
}

export const fetchDoctorBySpeiality = async (speciality, page,limit) => {
    const {data} = await $host.get('/doctor', {
        params:
            {speciality,page, limit}
    })
    return data
}



export const fetchSpetiality = async ()=>{
    const {data} = await $host.get('/speciality',)
    return data;
}

export const fetchAcceptance = async ()=>{
    const {data} = await $host.get('/acceptance')
    return data;
}

export const fetchByAcceptance = async (page,limit)=>{
    const {data} = await $host.get('/acceptance',{
        params:
            {page, limit}
    })
    return data;
}

export const fetchOneDoctor = async (id) =>{
    const {data} = await $host.get('doctor/'+id)
    return data
}

export const fetchOneDoctorByName = async (fullName, page,limit) =>{
    const {data} = await $host.get('/doctor',{params:
            { fullName, page,limit}})
    return data
}

export const fetchTimetableByName = async (fullName, page,limit) =>{
    const {data} = await $host.get('/timetable',{params:
            { fullName, page,limit}})
    return data
}

export const updatePatient = async (acceptance) => {
    const {data} = await $host.put('/patient',acceptance)
    return data
}


export const createPatient = async (patient) => {
    const {data} = await $host.post('/patient', patient
    )
    return data
}


export const addAcceptance = async (patient,doctor,startDate,endDate) => {

    const {data} = await $host.post('/acceptance',patient,{params:
            {doctor,startDate:format(new Date(startDate),"yyyy-MM-dd'T'HH:mm:ss"),endDate:format(new Date(endDate),"yyyy-MM-dd'T'HH:mm:ss")}
    })
    return data
}

export const updateAcceptance = async (acceptance) => {
    const {data} = await $host.put('/acceptance',acceptance)
    return data
}

export const deleteAcceptance = async (id) => {
    const {data} = await $host.delete('acceptance/'+id)
    return data
}


export const createDoctor = async ( doctor) => {
    const {data} = await $host.post('/doctor',doctor)
    return data
}


export const fetchDoctorByTimeTable = async (speciality,page,limit) =>{
    const {data} = await $host.get('/timetable',{ params:
    {speciality,page,limit}
})
    return data
}

export const fetchTimetableBySpeiality = async (speciality, page,limit) => {
    const {data} = await $host.get('/timetable', {
        params:
            {speciality,page, limit}
    })
    return data
}


export const fetchDocTimeTable = async (doctor) =>{
    const {data} = await $host.get('/timetable',{ params:
            {doctor}
    })
    return data
}

export const fetchPatient = async () =>{
    const {data} = await $host.get('/patient',

    )
    return data
}

export const fetchStatistic= async (endDate,period) =>{
    const {data} = await $host.get('/statistic',
        { params:
                {endDate:format(new Date(endDate),"yyyy-MM-dd"),period}
        }
    )
    return data
}

export const addStatistic= async (statistic) =>{
    const {data} = await $host.post('/statistic',statistic
    )
    return data
}

export const deletePatient = async (id) =>{
    const {data} = await $host.delete('patient/'+id,

    )
    return data
}

export const deleteDoctor = async (id) =>{
    const {data} = await $host.delete('doctor/'+id,

    )
    return data
}


export const updateDoctor= async(doctor)=>{

    const {data}= await $host.put('/doctor',doctor)

    return data
}


export const updateTimetable= async(timetable)=>{

    const {data}= await $host.put('/timetable',timetable)

    return data.body
}

export const addTimetable= async(timetable)=>{

    const {data}= await $host.post('/timetable',timetable)

    return data
}

export const deleteTimetable= async(id)=>{

    const {data}= await $host.delete('/timetable/'+id)

    return data
}