import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {DOCTOR_ROUTE, MEDICAL_ROUTE, PATIENT_ROUTE, SPECIALITY_ROUTE, TIMETABLE_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
const NavBar = observer(() => {

    return (
        <Navbar bg="dark" variant="dark">
            <Container>

                <Nav className="me-auto">
                    <Nav.Link href={MEDICAL_ROUTE}>О Клинике</Nav.Link>
                    <Nav.Link href={SPECIALITY_ROUTE}>Направления</Nav.Link>
                    <Nav.Link href={DOCTOR_ROUTE}>Врачи</Nav.Link>
                    <Nav.Link href={TIMETABLE_ROUTE}>Расписания</Nav.Link>
                    <Nav.Link href={PATIENT_ROUTE}>Пациенты</Nav.Link>

                </Nav>
            </Container>
        </Navbar>

    );
});

export default NavBar;