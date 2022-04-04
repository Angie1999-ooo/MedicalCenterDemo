import React, {useContext, useEffect} from 'react';
import Spetiality from "../component/Spetiality";
import {fetchSpetiality,fetchDoctorBySpeiality} from "../service/doctorAPI";
import {Context} from "../index";
import {DOCTOR_ROUTE, MEDICAL_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router";
import {Col} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

const SpetialityPage = () => {

    const {doctor} = useContext(Context)
    const navigate = useNavigate();

    useEffect(() => {

        fetchSpetiality().then(data => doctor.setSpeciality(data))

    }, [])



    return (
        <div>
            <Col className={"mt-3"} onClick={() => navigate(DOCTOR_ROUTE)} >
            <Spetiality/>
                <Nav.Link href={MEDICAL_ROUTE}>НА ГЛАВНУЮ</Nav.Link>
               </Col>
        </div>
    );
};

export default SpetialityPage;