import React, {useContext, useEffect, useState,useRef} from 'react';
import {Card, Container, Navbar, Button, Dropdown, Form, InputGroup, FormControl} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

import NavBar from "../component/NavBar";
import {
    createDoctor,
    fetchDoctor,
    fetchDoctorBySpeiality, fetchOneDoctorByName,
    fetchSpetiality,
} from "../service/doctorAPI";
import Pages from "../component/Pages";
import CreateDoctor from "../component/modal/CreateDoctor";
import DoctorItem from "../component/DoctorItem";
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import {Divider, IconButton, InputBase, Paper} from "@mui/material";



const MedicalCenter= observer(()=> {
    const {doctor} = useContext(Context)
    const [name, setName] = useState('');
    const [filteredData, setFilteredData] = useState([]);


    useEffect(() => {
        if ( doctor.selectedSpecialties === null && filteredData.length === 0) {
            fetchDoctor(doctor.page, 15).then(doctorObj => {
                doctor.setDoctors(doctorObj.content);
                doctor.setTotalCount(doctorObj.totalElements)

            })
        }
        else if(filteredData.length !== 0)
        {
            fetchOneDoctorByName(filteredData, doctor.page, 15).then(fillName => {

                    doctor.setDoctors(fillName.content);
                    doctor.setTotalCount(fillName.totalElements)
                    console.log('fillName.totalElements',fillName.totalElements)
                }
            )
        }
    }, [doctor.page, doctor.totalPages,filteredData])


    useEffect(() => {
        if (doctor.selectedSpecialties !== null) {
            fetchDoctorBySpeiality(doctor.selectedSpecialties.id, doctor.page, 15).then(doc => {
                doctor.setDoctors(doc.content);
                doctor.setTotalCount(doc.totalElements)
            })
        }
    }, [doctor.selectedSpecialties, doctor.page])





    useEffect(() => {

        fetchSpetiality().then(data => doctor.setSpeciality(data))

    }, [doctor.selectedSpecialties])

    const ref = useRef()



    const findDoctor = () => {
        doctor.setPage(0)
        setFilteredData(name)

    }


    const handleClear = (e) => {
        e.preventDefault()
        setName('')
        setFilteredData([])


    }

    console.log(doctor.setSelectedSpecialties)
    return(
        <Container>

            {/*<Row >*/}
                <Col md={10} >
                    <NavBar/>
                    <div className="d-flex justify-content-between">
                        <div className="col-xs-5 col-sm-5 col-lg-5 col-md-5">
                            <Paper className="mt-2 mb-2"
                                   component="form"
                                   sx={{ p: '2px 4px', display: 'flex', alignItems: 'right', width: 250 }}
                            >
                                <InputBase
                                    ref={ref}
                                    sx={{ ml: 1, flex: 1 }}
                                    value={name}
                                    onChange={(e)=>{setName(e.target.value)}}
                                />
                                <IconButton  onClick={findDoctor} sx={{ p: '10px' }} aria-label="search">
                                    <SearchIcon  />
                                </IconButton>
                                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                <IconButton   sx={{ p: '10px' }} >
                                    <ClearIcon
                                        onClick={(e)=>handleClear(e)} />
                                </IconButton>
                            </Paper>
                        </div>
                        <div className="col-xs-2.5 col-sm-2.5 col-lg-2.5 col-md-2.5">

                            <Dropdown  className="mt-2 mb-2">
                                <Dropdown.Toggle >{doctor.selectedSpecialties==null|| doctor.selectedSpecialties.id==undefined? "Выберите специальность"  : doctor.selectedSpecialties.speciality }</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        className="p-3"
                                        onClick={() => {
                                            doctor.setSelectedSpecialties([])
                                            doctor.setPage(0)
                                        }
                                        }
                                    >
                                        {"Выберите специальность"}
                                    </Dropdown.Item>

                                    {doctor.specialties.map(specialty =>
                                        <Dropdown.Item
                                            style={{cursor: 'pointer'}}
                                            key={specialty.id}
                                            className="p-3"
                                            onClick={() => {
                                                doctor.setSelectedSpecialties(specialty)
                                                doctor.setPage(0)
                                            }}
                                            onDoubleClick={() => doctor.setSelectedSpecialties([])}
                                            border={specialty.id === doctor.selectedSpecialties ? 'danger' : 'light'}
                                        >
                                            {specialty.speciality}
                                        </Dropdown.Item>

                                    )
                                    }


                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <CreateDoctor
                    />
                    <DoctorItem/>
                    <Pages/>
                </Col>


        </Container>
    )
})

export  default  MedicalCenter;