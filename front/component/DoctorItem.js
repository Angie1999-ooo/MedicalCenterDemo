import React, {useContext} from "react"
import { Card,Col,  Row} from "react-bootstrap"
import {useNavigate} from 'react-router';
import {DOCTOR_ROUTE, MEDICAL_ROUTE} from "../utils/consts";
import doc from '../assert/doc.png'
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import './css/doctor.css'




const DoctorItem =observer(() => {
    const {doctor} = useContext(Context)
    const navigate = useNavigate();
    return(
        <Row className="e-card-content">
            {doctor.doctors.map(doctor =>
        <Col className={"mt-3"} onClick={() => navigate(DOCTOR_ROUTE+"/" +doctor.id)} >

            <Card key={doctor.id} className="e-card" style ={{width : 100  , cursor: 'pointer' }} border={"light"}>
                <Card.Img variant="top" src={doc}/>
                 <div className="d-flex justify-content-between align-items-center ">
                    <div>{doctor.secondName}</div>
                 </div>
                    <div>{doctor.firstName}</div>
                <div className="d-flex justify-content-between align-items-center ">
                    <div>{doctor.middleName}</div>
                </div>
                <div className="d-flex justify-content-between align-items-center ">
                    <div>{doctor.speciality.speciality}</div>
                </div>

            </Card>
        </Col>
            )}
        </Row>


    );
});
export default DoctorItem;