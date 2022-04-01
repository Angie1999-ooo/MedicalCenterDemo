import React from 'react';
import { Form, Modal} from "react-bootstrap";
import {Button} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import {TimePickerComponent} from "@syncfusion/ej2-react-calendars";

const ModalReadFragment = ({makeDayWeek,dayOfWeek, weekDay, EditClick}) => {

    console.log(weekDay)
    return (
        <div>

            {
                weekDay.startTime.toString() === weekDay.endTime.toString() ? (
                        <Modal.Body>
                            <div className="row custom-margin custom-padding-2 material">
                                <div className="col-xs-4 col-sm-4 col-lg-4 col-md-4">

                                    <Button color="error">{dayOfWeek[weekDay.day]}</Button>

                                </div>


                                <div className="col-xs-4 col-sm-4 col-lg-4 col-md-4">

                                    <div >Выходной</div>
                                </div>

                                <div className="col-xs-2 col-sm-2 col-lg-2 col-md-2">

                                    <div>  <Button onClick={(event) => EditClick(event, weekDay)}
                                                   color="primary"><CreateIcon color="primary"/></Button></div>
                                </div>

                            </div>


                        </Modal.Body>

                    )
                    :
                    (

                        <Modal.Body>
                            <div className="row custom-margin custom-padding-5 material">
                                <div className="col-xs-2 col-sm-2 col-lg-2 col-md-2">
                                    <Button onClick={(event) => makeDayWeek(event, weekDay)} baseClassName="fas"
                                            className="fa-plus-circle"
                                            color="primary">{dayOfWeek[weekDay.day]}</Button>

                                </div>

                                <div className="col-xs-3 col-sm-3 col-lg-3 col-md-3">
                                    <TimePickerComponent

                                        name='startTime'
                                        value={weekDay.startTime}
                                        cssClass="e-outline"
                                        format='HH:mm'
                                        step={60}
                                        disabled

                                    />
                                </div>

                                <div className="col-xs-3 col-sm-3 col-lg-3 col-md-3">
                                    <TimePickerComponent
                                        name='endTime'
                                        value={weekDay.endTime}
                                        format='HH:mm'
                                        cssClass="e-outline"
                                        step={60}
                                        disabled

                                    />
                                </div>
                                <div className="col-xs-2 col-sm-2 col-lg-2 col-md-2">
                                    <div>  <Button onClick={(event) => EditClick(event, weekDay)}
                                                   color="primary"><CreateIcon color="primary"/></Button></div>
                                </div>

                            </div>
                        </Modal.Body>


                    )

            }


        </div>
    );
};

export default ModalReadFragment;