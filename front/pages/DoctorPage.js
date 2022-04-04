import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Card, Col, Container, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {useNavigate} from 'react-router';
import {
    addAcceptance,
    addTimetable, createPatient, deleteAcceptance,
    deleteDoctor, deleteTimetable,
    fetchAcceptance,
    fetchDocTimeTable,
    fetchOneDoctor, fetchSpetiality, updateAcceptance,
    updateDoctor, updatePatient, updateTimetable
} from "../service/doctorAPI";
import doc from "../assert/doc.png";
import {DOCTOR_ROUTE} from "../utils/consts";
import Nav from "react-bootstrap/Nav";
import "react-datepicker/dist/react-datepicker.css";
import 'react-calendar-datetime-picker/dist/index.css'
import {format} from "date-fns";
import {
    ScheduleComponent, ViewsDirective, ViewDirective,
    Inject, TimelineViews, Resize, DragAndDrop, TimelineMonth, Day, Week
} from '@syncfusion/ej2-react-schedule';
import {addClass, extend, L10n} from '@syncfusion/ej2-base';
import {Schedule} from "@syncfusion/ej2-schedule";
import {ResourceDirective, ResourcesDirective} from "@syncfusion/ej2-react-schedule/src/schedule/resources-directive";
import {Button, Checkbox} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ModalEditFragment from "../component/modal/ModalEditFragment";
import ModalReadFragment from "../component/modal/ModalReadFragment";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Context} from "../index";
import {TextBoxComponent} from "@syncfusion/ej2-react-inputs";
import {DateTimePickerComponent} from "@syncfusion/ej2-react-calendars";
import {CheckBoxComponent} from "@syncfusion/ej2-react-buttons";
import {DropDownListComponent} from "@syncfusion/ej2-react-dropdowns";


const DoctorPage = () => {

    const {doctor} = useContext(Context)
    const [doctorObj, setDoctorObj] = useState([])
    const [timetable, setTimetable] = useState([])
    const [newUp, setNewUp] = useState([])
    const [newAdd, setNewAdd] = useState([])
    const [acceptance, setAcceptance] = useState([])
    const [patient, setPatient] = useState([])


    const navigate = useNavigate();

    const [active, setActive] = useState(false)

    const handleCloseActive = () => setActive(false);

    const handleShowActive = () => setActive(true)


    const [editFormData, setEditFormData] = useState([{
        speciality: '',
        firstName: '',
        secondName: '',
        middleName: '',
        education: '',

    }]);
    const [editDate, setEditDate] = useState([{
        dayWeek: '',
        startTime: new Date(),
        endTime: new Date()
    }])


    const [dayJob, setDayJob] = useState("");

    const [timetableId, setTimetableId] = useState("")

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);


    const [show1, setShow1] = useState(false)

    const handleCloses = () => setShow1(false);

    const handleShows = () => setShow1(true)

    const [workHours, setWorkHours] = useState([])

    const [inputField, setInputField] = useState([])

    const dayOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

    const [value, setValue] = useState([])

    const [speciality, setSpeciality] = useState([])

    function compareNumbers(a, b) {
        return a.day - b.day;
    }

    const dayWeek = [0, 1, 2, 3, 4, 5, 6];

    useEffect(() => {

        fetchSpetiality().then(data => setSpeciality(data))

    }, [])


    useEffect(() => {

        fetchAcceptance().then(acceptance =>
            setAcceptance(acceptance)
        )

    }, [])


    useEffect(() => {

        fetchDocTimeTable(id).then(date => setTimetable(date)
        )

    }, [])

    let scheduleObj = new Schedule();
    const data = extend([], null, true);
    acceptance.map(accep => {
        if (accep.doctor.id === doctorObj.id) {
            data.push({
                Id: accep.id,
                Subject: accep.patient.secondName,
                StartTime: accep.startDate,
                EndTime: accep.endDate,
                DoctorId: accep.doctor.id,
                FirstName: accep.patient.firstName,
                SecondName: accep.patient.secondName,
                MiddleName: accep.patient.middleName,
                email: accep.patient.email,
                phone: accep.patient.phone

            })
        }
    })


    const {id} = useParams()


    L10n.load({
        'en-US': {
            'schedule': {
                'saveButton': 'Добавить',
                'cancelButton': 'Закрыть',
                'deleteButton': 'Удалить',
                'newEvent': 'Запись на приём',
            },
        }
    });


    useEffect(() => {

        let weekDays = []

        let workDays = []


        timetable.map(day => {
            workDays.push(day.dayWeek)
        })

        let diffetence = []

        const dff = () => {

            return dayWeek.filter(i => !workDays.includes(i)).concat(workDays.filter(i => !dayWeek.includes(i)))
        }
        diffetence = dff()

        timetable.map(day => {

            const start = day.startTime.split(':');
            let startToday = new Date();

            startToday.setHours(+start[0], 0, 0);

            const end = day.endTime.split(':');
            let endToday = new Date();

            endToday.setHours(+end[0], 0, 0);

            weekDays.push({id: day.id, day: day.dayWeek, startTime: startToday, endTime: endToday})
            workHours.push({dayWeek: day.dayWeek, startTime: day.startTime, endTime: day.endTime})

        })
        diffetence.map(day => {
            weekDays.push({id: null, day: day, startTime: '', endTime: ''})
        })

        weekDays.sort(compareNumbers)

        let num = weekDays[0]

        weekDays.shift()

        weekDays.push(num)

        setInputField(weekDays)

    }, [timetable])


    const onDataBinding = () => {

        while (scheduleObj.workDays.length > 0) {
            scheduleObj.workDays.pop();
        }

        timetable.map(dayT => {
            scheduleObj.workDays.push(dayT)
        })

        scheduleObj.firstDayOfWeek = 1;
        scheduleObj.activeView.renderDates.forEach(element => {

            let day = (new Date(element).getDay())
            let days = []

            workHours.forEach(workHour => {
                if (workHour.dayWeek === day) {
                    days.push(day)

                    let start = workHour.startTime.split(':');
                    let newStart = format(new Date(element).setHours(+start[0]), "HH:mm")
                    let end = workHour.endTime.split(':');
                    let newEnd = format(new Date(element).setHours(+end[0]), "HH:mm")
                    scheduleObj.resetWorkHours([new Date(element)], "00:00", "24:00");
                    scheduleObj.setWorkHours([new Date(element)], newStart, newEnd)

                }
            })
        })
        console.log(workHours)

    }


    useEffect(() => {

        fetchOneDoctor(id).then(doctorObj => {
                setDoctorObj(doctorObj)
                setValue(doctorObj.speciality)
            }
        )
    }, [])

    async function onActionBegin(args) {

        console.log(args.requestType)

        if (args.requestType === 'eventCreate') {

            scheduleObj.eventsData.push(args.data[0])

            scheduleObj.eventSettings.dataSource = scheduleObj.eventsData;

            scheduleObj.refresh()

            const newPatient = {
                firstName: args.data[0].FirstName,
                secondName: args.data[0].Subject,
                middleName: args.data[0].MiddleName,
                email: args.data[0].email,
                phone: args.data[0].phone

            }


            addAcceptance(newPatient, doctorObj.id, args.data[0].StartTime, args.data[0].EndTime).then(accept => {

                    acceptance.push(accept)


                }
            )


        }


        if (args.requestType === 'eventChange') {

            const index = scheduleObj.eventsData.findIndex((event: any) => event.Id === args.data.Id);

            scheduleObj.eventsData[index] = args.data;

            scheduleObj.eventSettings.dataSource = scheduleObj.eventsData;

            scheduleObj.refresh()

            const newPatient = {
                id: acceptance[index].patient.id,
                firstName: args.data.FirstName,
                secondName: args.data.Subject,
                middleName: args.data.MiddleName,
                email: args.data.email,
                phone: args.data.phone

            }

            const newAcceptance = {
                id: acceptance[index].id,
                doctor: doctorObj,
                startDate: args.data.StartTime,
                endDate: args.data.EndTime,
                patient: acceptance[index].patient

            }

            await updateAcceptance(newAcceptance).then(accept => {
                    acceptance[index] = accept
                }
            )

            let ind = patient.findIndex((patientObj) => patientObj.id === newPatient.id);

            await updatePatient(newPatient).then(value => {

                patient[ind] = newPatient

            })

        }

        if (args.requestType === 'eventRemove') {

            console.log(scheduleObj.eventsData)

            const index = scheduleObj.eventsData.findIndex((event) => event.Id === args.data[0].Id);

            scheduleObj.eventsData.splice(index, 1)

            scheduleObj.eventSettings.dataSource = scheduleObj.eventsData;

            console.log(scheduleObj.eventSettings.dataSource)

            console.log(index)

            acceptance.splice(index, 1)

            console.log(acceptance)
            await deleteAcceptance(args.data[0].Id)

            scheduleObj.refresh()
        }

    }


    const editorTemplate = (props) => {

        return (

            <Form className="event-content">

                <div className="row custom-margin custom-padding-5">

                </div>
                <div className="form-group">
                    <div className="row custom-margin">
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6"><b>Email</b></div>
                    </div>
                    <div className="e-float-input">

                        <TextBoxComponent type="email" id="Email" cssClass="e-outline mt-4 " className="e-field e-input"
                                          name="email"
                                          data-msg-containerid="mailError"/>

                        <div id="mailError"/>

                    </div>
                    <div className="row custom-margin custom-padding-5">

                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <div className="row custom-margin">
                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6"><b>Телефон</b></div>
                            </div>
                            <TextBoxComponent id="phone"
                                // type="tel"
                                // mask="(999) 999-9999"
                                              data-name="phone"
                                              className="e-field e-input" cssClass="e-outline mt-4 "
                                              floatLabelType="Auto"/>
                        </div>

                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <div className="row custom-margin">
                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6"><b>Фамилия</b></div>
                            </div>
                            <TextBoxComponent
                                id="Subject"
                                data-name="Subject"
                                className="e-field e-input"
                                cssClass="e-outline mt-4 "
                                floatLabelType="Auto"/>

                        </div>

                    </div>
                </div>
                <div className="row custom-margin material">
                </div>

                <div className="row custom-margin material">

                </div>
                <div className="row custom-margin custom-padding-5 material">
                    <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                        <div className="row custom-margin">
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6"><b>Имя</b></div>
                        </div>
                        <TextBoxComponent
                            id="FirstName"
                            data-name="firstName"
                            className="e-field e-input"
                            cssClass="e-outline mt-4 "
                            // placeholder="First Name"
                            floatLabelType="Auto"


                        />
                    </div>
                    <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                        <div className="row custom-margin">
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6"><b>Отчество</b></div>
                        </div>
                        <TextBoxComponent
                            id="MiddleName"
                            data-name="middleName"
                            className="e-field e-input"
                            cssClass="e-outline mt-4 "
                            // placeholder="Middle Name"
                            floatLabelType="Auto"

                        />
                    </div>
                </div>


                <div className="row custom-margin material">
                    <div className="row custom-margin">
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6"><b>Дата и время приема</b></div>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6"></div>
                </div>
                <div className="row custom-margin custom-padding-5 material">
                    <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                        <DateTimePickerComponent id="StartTime"
                                                 data-name="StartTime"
                                                 cssClass="e-outline mt-4 "
                                                 value={new Date(props.startTime || props.StartTime)}
                                                 className="e-field">

                        </DateTimePickerComponent>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">

                        <DateTimePickerComponent id="EndTime"
                                                 step={20}
                                                 data-name="EndTime"
                                                 cssClass="e-outline mt-4 "
                                                 value={new Date(props.endTime || props.EndTime)}
                                                 className="e-field">

                        </DateTimePickerComponent>
                    </div>
                </div>
                <div className='row'>
                    <CheckBoxComponent checked={true} label='Согласие на обработку персональных данных'
                                       required></CheckBoxComponent>
                </div>

            </Form>


        )
    }


    function onPopupOpen(args) {
        if (args.target && args.target.classList.contains('e-work-cells')) {
            args.cancel = !args.target.classList.contains('e-work-hours');
        }
    }


    function onRenderCell(args) {
        if (args.element.classList.contains('e-work-hours') || args.element.classList.contains('e-work-cells')) {
            addClass([args.element], ['doctors']);
        }
    }


    const handleEditFormSubmit = async (event) => {

        event.preventDefault();

        const editedDoctor = {
            id: doctorObj.id,
            speciality: value,
            firstName: editFormData.firstName,
            secondName: editFormData.secondName,
            middleName: editFormData.middleName,
            education: editFormData.education,

        };

        const newDoctor = editedDoctor;

        setDoctorObj(newDoctor);

        console.log(newDoctor)

        await updateDoctor(newDoctor)

        handleClose()
    };

    const handleEditFormChange = (event) => {

        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        console.log(fieldValue)

        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }


    const EditFormChange = (event) => {

        const fieldName = event.target.name;

        const fieldValue = format(event.target.value, "HH:mm:ss");

        const newFormData = {...editDate};

        newFormData[fieldName] = fieldValue;

        setEditDate(newFormData);
    };

    const handleEditClick = (event) => {


        event.preventDefault();


        const formValues = {
            speciality: value.speciality,
            firstName: doctorObj.firstName,
            secondName: doctorObj.secondName,
            middleName: doctorObj.middleName,
            education: doctorObj.education,


        };

        setEditFormData(formValues);
        setShow(true)

    };

    const EditClick = (event, timetab) => {

        event.preventDefault();
        setTimetableId(timetab.id)
        setDayJob(timetab.day)
        const formValues = {
            dayWeek: timetab.day,
            startTime: timetab.startTime,
            endTime: timetab.endTime

        };

        setEditDate(formValues);

    };


    const EditFormSubmit = (event) => {

        let startToday = new Date();
        let endToday = new Date();
        if (typeof editDate.startTime == 'string') {
            const start = editDate.startTime.split(':');
            console.log('editDate', start)

            startToday.setHours(+start[0], 0, 0);
        } else {

            startToday = editDate.startTime
        }
        if (typeof editDate.endTime == 'string') {
            const end = editDate.endTime.split(':');


            endToday.setHours(+end[0], 0, 0);
        } else {

            endToday = editDate.endTime
        }
        event.preventDefault();

        const editedTimetable = {
            id: timetableId,
            day: dayJob,
            doctor: doctorObj,
            startTime: startToday,
            endTime: endToday
        };

        const editedNew = {
            id: timetableId,
            dayWeek: dayJob,
            doctor: doctorObj,
           startTime:format(startToday, "HH:mm:ss"),
            endTime: format(endToday, "HH:mm:ss")
        };

        const newTimetable = [...inputField];

        const index = inputField.findIndex((time) => time.day === dayJob);

        newTimetable[index] = editedTimetable;

        setInputField(newTimetable)

        if (timetableId !== null) {
            newUp.push(editedNew)
        } else {
            newAdd.push(editedNew)

        }

        const edited = {

            dayWeek: dayJob,
            startTime: editDate.startTime,
            endTime: editDate.endTime
        };


        workHours[index] = edited;

        setDayJob(null);
        setEditDate([]);

    };


    const putTimetable = async () => {

        await updateDoctor(doctorObj)

        if (newUp.length !== 0) {
            await updateTimetable(newUp)
        }

        if (newAdd.length !== 0) {

            await addTimetable(newAdd)
        }



        handleClose()

        handleCloses()
    }

    const removeWithoutConfirmation = () => {
        handleShowActive()
    }

    const removeDoctor = async () => {


        try {
            await deleteDoctor(doctorObj.id)
        } catch (e) {
            console.log('Error')
        }
        navigate(DOCTOR_ROUTE)


    }


    const makeDayWeek = async (event, timetab) => {

        event.preventDefault();

        const formValues = {
            dayWeek: timetab.dayWeek,
            startTime: '',
            endTime: '',

        };
        const editedTimetable = {
            id: timetableId,
            day: dayJob,
            doctor: doctorObj,
            startTime: '',
            endTime: ''
        };

        const newTimetable = [...inputField];
        const index = inputField.findIndex((time) => time.day === dayJob);
        newTimetable[index] = editedTimetable;
        setInputField(newTimetable)

        console.log('id', timetableId)

        const edited = {

            dayWeek: dayJob,
            startTime: '',
            endTime: ''
        };


        workHours[index] = edited;

        await deleteTimetable(timetableId)
        setEditDate(formValues);
        setTimetableId(null)
        setDayJob(null)


    };
    return (
        <Container>

            <Nav.Link href={DOCTOR_ROUTE}><h1><ArrowBackIosIcon></ArrowBackIosIcon>К списку врачей</h1></Nav.Link>

            <Row className='doctor-detail'>
                <Col md={3}>
                    <Card key={doctorObj.id} style={{width: 300, cursor: 'pointer'}} border={"dark"}>
                        <Row className="d-flex flex-column align-items-center">
                            <Card.Img variant="top" src={doc}/>
                            <h2 className="h2">{doctorObj.secondName}</h2>
                            <h2>{doctorObj.firstName}</h2>
                            <h2>{doctorObj.middleName}</h2>
                            <h2>{doctorObj.education}</h2>
                            <h2>{value.speciality}</h2>
                        </Row>
                    </Card>
                </Col>


                <Col md={5}>
                    <div>
                        <div className='col-lg-12 control-section'>
                            <div className='control-wrapper'>
                                <ScheduleComponent cssClass='block-events' width='100%' height='650px'
                                                   dataBinding={onDataBinding}
                                                   ref={schedule => scheduleObj = schedule}
                                                   selectedDate={new Date()}
                                                   renderCell={onRenderCell}
                                                   editorTemplate={editorTemplate}
                                                   popupOpen={onPopupOpen}
                                                   showQuickInfo={false}
                                                   actionBegin={onActionBegin}
                                                   startHour='08:00' endHour='20:00'
                                                   timeScale={{interval: 40, slotCount: 2}}
                                                   eventSettings={{
                                                       dataSource: data
                                                   }}

                                >
                                    <ResourcesDirective>
                                        <ResourceDirective field='DoctorId' title='Doctors' name='Doctors'
                                                           allowMultiple={true}
                                                           dataSource={doctorObj} textField='text' idField='id'
                                                           colorField='color'
                                        >
                                        </ResourceDirective>
                                    </ResourcesDirective>

                                    <ViewsDirective>
                                        <ViewDirective option='Week'/>
                                        <ViewDirective option='TimelineDay'/>
                                    </ViewsDirective>
                                    <Inject services={[Day, Week, TimelineViews, TimelineMonth, Resize, DragAndDrop]}/>

                                </ScheduleComponent>


                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={1}>
                    <Button onClick={removeWithoutConfirmation} variant="outlined" color="error">Удалить</Button>

                </Col>
                <Modal show={active} onHide={handleCloseActive}>
                    <Modal.Header closeButton>
                        <Modal.Title>Вы уверены, что хотите удалить?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button onClick={removeDoctor}>Да</Button>
                        <Button onClick={handleCloseActive}>Нет</Button>
                    </Modal.Footer>
                </Modal>


                <Col>
                    <Button onClick={(event) =>
                        handleEditClick(event)}>Изменить</Button>

                </Col>


                <Modal show={show1} onHide={handleCloses}>
                    <Modal.Header closeButton>
                        <Modal.Title>Расписание</Modal.Title>
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
                                    makeDayWeek={makeDayWeek}
                                />
                            )}

                        </Fragment>


                    ))}


                    <Modal.Footer>
                        <Button onClick={putTimetable}>Сохранить</Button>
                        <Button type="button" onClick={handleCloses}>
                            Отмена
                        </Button>

                    </Modal.Footer>
                </Modal>
                {/*</Form>*/}


                <Form>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Редактировать врача</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>{value.speciality}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {doctor.specialties.map(special =>
                                        <Dropdown.Item
                                            onClick={() => setValue(special)}
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
                                onChange={(event) => handleEditFormChange(event)}
                                className="mt-3"
                                placeholder="Введите имя"
                                type="text"
                            />
                            <Form.Control
                                name="secondName"
                                value={editFormData.secondName}
                                onChange={(event) => handleEditFormChange(event)}
                                className="mt-3"
                                placeholder="Введите фамилию"
                                type="text"
                            />

                            <Form.Control
                                name="middleName"
                                value={editFormData.middleName}
                                onChange={(event) => handleEditFormChange(event)}
                                className="mt-3"
                                placeholder="Введите отчество"
                                type="text"
                            />
                            <Form.Control
                                name="education"
                                value={editFormData.education}
                                onChange={(event) => handleEditFormChange(event)}
                                className="mt-3"
                                placeholder="Введите название образовательного учереждения"
                                type="text"
                            />
                            <Button onClick={() => handleShows()}><AddCircleIcon/> Расписание</Button>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={(event) => handleEditFormSubmit(event)}>Сохранить</Button>
                            <Button type="button" onClick={handleClose}>
                                Отмена
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </Form>
            </Row>
        </Container>
    );
};
export default DoctorPage;
