import React from 'react';
import { Modal} from "react-bootstrap";
import {Button} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { TimePickerComponent} from "@syncfusion/ej2-react-calendars";


const ModalEditFragment = ({dayOfWeek,editDate,EditFormChange,EditFormSubmit,makeDayWeek}) => {

    return (
        <div>
            <Modal.Body>
                <div className="row custom-margin custom-padding-5 material">
                    <div className="col-xs-2 col-sm-2 col-lg-2 col-md-2">
                        {editDate.startTime !== "" ? (
                                <Button onClick={(event) => makeDayWeek(event, editDate)} baseClassName="fas"
                                        className="fa-plus-circle"
                                        color="primary">{dayOfWeek[editDate.dayWeek]}</Button>
                            )
                            :
                            (<Button baseClassName="fas" className="fa-plus-circle"
                                     color="error">{dayOfWeek[editDate.dayWeek]}</Button>)
                        }
                    </div>
                    <div className="col-xs-3 col-sm-3 col-lg-3 col-md-3">

                        <TimePickerComponent

                            name='startTime'
                            value={editDate.startTime}
                            onChange={(event) => EditFormChange(event)}
                            cssClass="e-outline"
                            format='HH:mm'
                            step={60}

                        />
                    </div>

                    <div className="col-xs-3 col-sm-3 col-lg-3 col-md-3">
                        <TimePickerComponent
                            name='endTime'
                            value={editDate.endTime}
                            onChange={(event) => EditFormChange(event)}
                            format='HH:mm'
                            cssClass="e-outline"
                            step={60}
                            min='08:00'
                            max='19:00'

                        />
                    </div>
                    <div className="col-xs-2 col-sm-2 col-lg-2 col-md-2">
                        <Button onClick={(event) => EditFormSubmit(event)}><CheckIcon color="primary"/></Button>
                    </div>

                </div>
            </Modal.Body>

        </div>
    );
};

export default ModalEditFragment;