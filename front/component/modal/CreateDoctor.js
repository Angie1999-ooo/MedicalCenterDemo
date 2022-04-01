import React, {useContext, useEffect, useState,Fragment} from 'react';
import {
    addTimetable,
    createDoctor,
}
    from "../../service/doctorAPI";
import {Context} from "../../index";

import {Dropdown, Form, Modal} from "react-bootstrap";

import {Button} from "@mui/material";

import {format} from "date-fns";

import ModalEditFragment from "./ModalEditFragment";

import ModalReadFragment from "./ModalReadFragment";

import AddCircleIcon from "@mui/icons-material/AddCircle";


const CreateDoctor = () => {

    const {doctor} = useContext(Context)

    const [inputField,setInputField]=useState([])

    const dayOfWeek=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];

    const [dayJob,setDayJob]=useState("");

    const [show,setShow]=useState(false)

    const [show1,setShow1]=useState(false)

    const [newAdd,setNewAdd]=useState([])

    const [speciality, setSpeciality] = useState(null);

    const handleCloses = () => setShow1(false);


    const [editFormData, setEditFormData] = useState([{
        speciality:'',
        firstName: '',
        secondName: '',
        middleName: '',
        education: '',

    }]);
    const  [editDate,setEditDate]=useState([{
        doctor:null,
        dayWeek:'',
        startTime:new Date(),
        endTime:new Date()
    }])

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true)



    const dayWeek = [0, 1, 2, 3, 4, 5, 6];



    useEffect(()=> {

        let weekDay=[]

        dayWeek.map(day => {
            weekDay.push({id: null, day: day, startTime: '', endTime: ''})
        })

        setInputField(weekDay)

    },[])



    const handleEditFormChange = (event) => {

        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        console.log(fieldValue)

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    const handleEditFormSubmit = async(event) => {

        event.preventDefault();
        console.log(speciality)
        const editedDoctor = {
            speciality:speciality,
            firstName: editFormData.firstName,
            secondName: editFormData.secondName,
            middleName: editFormData.middleName,
            education: editFormData.education,

        };

        setEditFormData(editedDoctor)

        await   createDoctor(editedDoctor)

        setShow1(true)

    };

    const EditClick = (event, timetab) => {

        event.preventDefault();
        setDayJob(timetab.day)
        const formValues = {
            doctor:null,
            dayWeek: timetab.day,
            startTime: timetab.startTime,
            endTime: timetab.endTime

        };

        setEditDate(formValues);

    };

    const EditFormChange = (event) => {

        const fieldName = event.target.name;

        const fieldValue = format(event.target.value,"HH:mm:ss");

        const newFormData = { ...editDate };

        newFormData[fieldName] = fieldValue;

        setEditDate(newFormData);
    };

    const EditFormSubmit = (event) => {

        event.preventDefault();

        let startToday = new Date();
        let endToday = new Date();
        if(typeof editDate.startTime == 'string') {
            const start = editDate.startTime.split(':');
            startToday.setHours(+start[0], 0, 0);
        }
        else{

            startToday=editDate.startTime
        }
        if(typeof editDate.endTime == 'string') {
            const end = editDate.endTime.split(':');


            endToday.setHours(+end[0], 0, 0);
        }

        else{

            endToday = editDate.endTime
        }

        const newTime = {
            day: dayJob,
            doctor:doctor,
            startTime:startToday,
            endTime: endToday
        };

        const editedTimetable = {
            doctor:null,
            dayWeek: dayJob,
            startTime: format (new Date( startToday),"HH:mm:ss"),
            endTime: format (new Date( endToday),"HH:mm:ss")
        };

        const newTimetable = [...inputField];

        const index = inputField.findIndex((time) => time.day === dayJob);

        newTimetable[index] = newTime;

        setInputField(newTimetable)

        newAdd.push(editedTimetable)

        setDayJob(null);

    };

    const putTimetable=async()=>

    {
        await createDoctor(editFormData).then((newDoctor)=> {
            console.log(newDoctor)
        }
        )

        console.log(newAdd)

        if(newAdd.length !==0) {

         setTimeout (addTimetable(newAdd),100)

            handleCloses()
        }
        handleClose()



    }

    const handleCancelClickTime = () => {

        setEditDate(null)
    };

    const makeDayWeek = (event,timetab) => {

        event.preventDefault();
        setDayJob(timetab.day)
        const formValues = {
            dayWeek: timetab.day,
            startTime: '',
            endTime: '',

        };

        setEditDate(formValues);
    };


    return (
        <div>
            <>
                <Button variant="outlined" color="success" onClick={handleShow}>
                    Добавить врача
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавить врача</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle >{speciality===null? "Выберите специальность"  : speciality.speciality }</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {doctor.specialties.map(special =>
                                        <Dropdown.Item
                                            onClick={() => setSpeciality(special)}
                                            key={special.id}
                                        >
                                            {special.speciality}
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>

                            <Form.Control
                                name="firstName"
                                value={editFormData.firstName}
                                onChange={(event)=>handleEditFormChange(event)}
                                className="mt-3"
                                placeholder="Введите имя"
                                type="text"
                                requared
                            />
                            <Form.Control
                                name="secondName"
                                value={editFormData.secondName}
                                onChange={(event)=>handleEditFormChange(event)}
                                className="mt-3"
                                placeholder="Введите фамилию"
                                type="text"
                                requared
                            />

                            <Form.Control
                                name="middleName"
                                value={editFormData.middleName}
                                onChange={(event)=>handleEditFormChange(event)}
                                className="mt-3"
                                placeholder="Введите отчество"
                                type="text"
                                requared
                            />
                            <Form.Control
                                name="education"
                                value={editFormData.education}
                                onChange={(event)=>handleEditFormChange(event)}
                                className="mt-3"
                                placeholder="Введите название образовательного учереждения"
                                type="text"
                                requared
                            />


                            <Button  onClick={handleEditFormSubmit}><AddCircleIcon/>Расписание</Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary"onClick={handleEditFormSubmit}>
                           Сохранить
                        </Button>
                        <Button variant="primary"onClick={handleClose}>
                            Отмена
                        </Button>

                    </Modal.Footer>
                </Modal>



                <Modal show={show1} onHide={handleCloses}>
                    <Modal.Header closeButton>
                        <Modal.Title align='center'>Расписание</Modal.Title>
                    </Modal.Header>

                    {inputField.map((weekDay) => (
                        <Fragment>
                            {dayJob === weekDay.day ? (
                                <ModalEditFragment
                                    dayOfWeek={dayOfWeek}
                                    editDate={editDate}
                                    EditFormChange={EditFormChange}
                                    EditFormSubmit={EditFormSubmit}
                                    makeDayWeek={makeDayWeek}
                                />
                            ) : (
                                <ModalReadFragment
                                    dayOfWeek={dayOfWeek}
                                    weekDay={weekDay}
                                    EditClick={EditClick}
                                />
                            )}
                        </Fragment>
                    ))}

                    <Modal.Footer>
                        <Button  onClick={putTimetable}>Сохранить</Button>
                        <Button type="button" onClick={handleCancelClickTime}>
                            Отмена
                        </Button>

                    </Modal.Footer>
                </Modal>
            </>


        </div>
    );
};

export default CreateDoctor;