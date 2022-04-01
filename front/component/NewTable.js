import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {
    addAcceptance,
    createPatient, deleteAcceptance,
    fetchAcceptance,
    fetchPatient,
    updateAcceptance,
    updatePatient
} from "../service/doctorAPI";
import {addClass,  enableRipple,  L10n} from '@syncfusion/ej2-base';
import {format} from "date-fns";
import './css/doctor.css'
import {
     DragAndDrop,
    Inject, Resize, ResourceDetails,
    ResourceDirective,
    ResourcesDirective,
    ScheduleComponent, TimelineViews,
    ViewDirective,
    ViewsDirective
} from "@syncfusion/ej2-react-schedule";
import {Schedule} from '@syncfusion/ej2-schedule';
import {extend} from "@syncfusion/ej2-base";
import {DatePickerComponent, DateTimePickerComponent} from "@syncfusion/ej2-react-calendars";
import { TextBoxComponent} from "@syncfusion/ej2-react-inputs";

import {Form} from "react-bootstrap";
import {DropDownListComponent} from "@syncfusion/ej2-react-dropdowns";
import {Checkbox} from "@mui/material";
import {DataManager, Query} from "@syncfusion/ej2-data";
import {Predicate} from "@syncfusion/ej2-grids";
import {GridComponent} from "@syncfusion/ej2-react-grids";
import {ButtonComponent, CheckBoxComponent} from "@syncfusion/ej2-react-buttons";



const NewTable = observer(() => {
    const {doctor} = useContext(Context)

    const [acceptance, setAcceptance] = useState([])
    const [patient,setPatient]=useState([])
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        console.log(checked)
    };

    let scheduleObj = new Schedule();
    const [editPatient, setEditPatient] = useState({
        firstName:"",
        secondName:"",
        middleName:"",
        email:"",
        phone:"",
    });
    enableRipple(true);




    L10n.load({
        'en-US': {
            'schedule': {
                'saveButton': 'Add',
                'cancelButton': 'Close',
                'deleteButton': 'Remove',
                'newEvent': 'Запись на прием',
                'editEvent': 'Редактирование записи'
            },
        }
    });




    useEffect(() => {

        fetchPatient().then(patient =>
            setPatient(patient)
        )

    }, [editPatient])


    useEffect(() => {

        fetchAcceptance().then(acceptance =>
            setAcceptance(acceptance)
        )


    }, [])



    let  dates = extend([],null, true);

    acceptance.map(accep =>
        dates.push({
            Id:accep.id,
            Subject: accep.patient.secondName,
            StartTime: accep.startDate,
            EndTime: accep.endDate,
            DoctorId: accep.doctor.id,
            FirstName:accep.patient.firstName,
            SecondName:accep.patient.secondName,
            MiddleName:accep.patient.middleName,
            email:accep.patient.email,
            phone:accep.patient.phone

        }))


    const resourceDataSource = [];
    doctor.doctors.map(product => {

        resourceDataSource.push({
            text: product.secondName + " " + product.firstName,
            id: product.id,
            middleName: product.middleName,
            type: product.speciality.speciality,
            workDays: [],
            startHour: '10:00',
            endHour: '19:00'

        })


    } )




    function onDataBound() {

        scheduleObj. firstDayOfWeek=1;

        let currentViewDates = scheduleObj.getCurrentViewDates();

        for (let i = 0; i < currentViewDates.length; i++) {
            let j = 0;

            let day=currentViewDates[i].getDay();
            doctor.timetables.map(doctorObj => {

                if(doctorObj.dayWeek===day){

                    let start = doctorObj.startTime.split(':');
                    let newStart = format(new Date(currentViewDates[i].setHours(+start[0])), "HH:mm")

                    let end = doctorObj.endTime.split(':');
                    let newEnd = format(new Date(currentViewDates[i].setHours(+end[0])), "HH:mm")
                    scheduleObj.resetWorkHours([new Date(currentViewDates[i])], "00:00", "24:00");

                    doctor.specialties.map(special => {
                        if(special.id===doctorObj.doctor.speciality.id) {
                            let index=doctor.doctors.findIndex((doctorIndex)=>doctorIndex.id===doctorObj.doctor.id)
                            scheduleObj.setWorkHours([currentViewDates[i]], newStart, newEnd, index);

                        }
                    })

                }

            })
        }


    }


    let fields = {text: 'text', value: 'id'};


    function getRoomName(value: ResourceDetails) {

        return value.resourceData[value.resource.textField];
    }

    function getRoomType(value) {
        return value.resourceData.type;
    }

    function getRoomMid(value) {
        return value.resourceData.middleName;
    }


    const resourceHeaderTemplate = props => {

        return (

            <div className="template-wrap">
                <div className="room">{getRoomName(props)} </div>
                <div className="room">{getRoomMid(props)}</div>
                <div className="room">{getRoomType(props)}</div>

            </div>

        );

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

   

    async function onActionBegin(args) {

        console.log(args.requestType)

    if (args.requestType === 'eventCreate' ) {

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


        let doctorIndex = doctor.doctors.findIndex((doctorObg) =>
            doctorObg.id === args.data[0].DoctorId
        )

            addAcceptance(newPatient,doctor.doctors[doctorIndex].id,args.data[0].StartTime,args.data[0].EndTime).then(accept => {

                    acceptance.push(accept)
                console.log(accept)

                }
            )


    }


    if (args.requestType === 'eventChange') {

        const index = scheduleObj.eventsData.findIndex((event:any) => event.Id === args.data.Id);

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
            doctor: acceptance[index].doctor,
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

        const index = scheduleObj.eventsData.findIndex((event) => event.Id === args.data[0].Id);

        scheduleObj.eventsData.splice(index,1)

        scheduleObj.eventSettings.dataSource = scheduleObj.eventsData;

        console.log(scheduleObj.eventSettings.dataSource)

        console.log(index)

        acceptance.splice(index,1)

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
                <div className="row custom-margin">
                    <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6"><b>Доктор</b></div>
                </div>
                <DropDownListComponent id="id"
                                       className="e-field"
                                       data-name="DoctorId"
                                       dataSource={resourceDataSource}
                                       cssClass="e-outline mt-4 "
                                       fields={fields}
                                       value={props.idField}
                />


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
                    <CheckBoxComponent checked={true} label='Согласие на обработку персональных данных'   required></CheckBoxComponent>
                </div>
              
            </Form>


        )
    }


    return (


        <ScheduleComponent  cssClass='block-events' width='100%' height='650px'
                            delayUpdate='true'
                            ref={schedule => scheduleObj = schedule}
                            timeScale={{interval: 40, slotCount: 2}}
                            dataBound={onDataBound}
                            eventSettings={{
                                dataSource:  dates
                            }}
                            group={{enableCompactView: false, resources: ['Doctors']}}
                            resourceHeaderTemplate={resourceHeaderTemplate}
                            actionBegin={onActionBegin}
                            startHour='08:00'
                            endHour='21:00'
                            renderCell={onRenderCell}
                            editorTemplate={editorTemplate}
                            popupOpen={onPopupOpen}
        >
            <ResourcesDirective>

                <ResourceDirective fieldsSubject='Subject'  field='DoctorId' title='Doctors' name='Doctors' allowMultiple={true}
                                   dataSource={resourceDataSource} groupIDField='groupId' textField='text' idField='id' colorField='color'
                                   workDaysField='workDays'
                                   startHourField='startHour' endHourField='endHour'

                >
                </ResourceDirective>


            </ResourcesDirective>
            <ViewsDirective>
                <ViewDirective option='TimelineDay'/>
                <ViewDirective option='TimelineMonth'/>
            </ViewsDirective>
            <Inject services={[TimelineViews, Resize, DragAndDrop]}/>
            

        </ScheduleComponent>


    );

});

export default NewTable;
