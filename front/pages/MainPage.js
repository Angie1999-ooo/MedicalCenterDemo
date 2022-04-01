import React from 'react';
import {Card, Col, Container} from "react-bootstrap";
import NavBar from "../component/NavBar";
import {YMaps, Map, Polygon, Placemark} from "react-yandex-maps";
import Typography from "@mui/material/Typography";
import imageMain from "../assert/imageMain.png";



const MainPage = () => {

    const mapData = {
        center: [55.751574, 37.573856],
        zoom: 5,

    };

    const coordinates = [
        [55.684758, 37.738521],
        [57.684758, 39.738521]
    ];

    const containerStyle = {
        width: '400px',
        height: '400px'
    };

    const center = {
        lat: -3.745,
        lng: -38.523
    };


    return (
        <Container style={{
            background: `linear-gradient(to right, #adcce9, #e9f2fa`
        }} md={10}>

            <NavBar/>
            <Col className="mt-3">

                <Typography variant='h3' align='center' gutterBottom>Медицинский центр </Typography >
                <Typography className="mt-5" variant='h5' align='center' gutterBottom> Почему нам доверяют?</Typography >
                <Typography  variant='h5' align='center' gutterBottom>Забота о вашем здоровье-наша главная задача </Typography >
                <div className="d-flex justify-content-between">
                    <div className="col-xs-3 col-sm-3 col-lg-3 col-md-3" >
                        <Card.Img  style={{width: 300, cursor: 'pointer'}} variant="top" src={imageMain} />
                    </div>
                    <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 mt-9" >

                        <Typography className="mt-5" variant='h6' align='right'>Адрес клиники: Парковая,15 </Typography >

                        <Typography className="mt-2" variant='h6' align='right'>Телефон : 89087656364</Typography >

                        <Col className="mt-5" align='right'>
                            <YMaps >
                                <div>

                                    <Map  defaultState={{ center: [56.145831, 40.372059], zoom: 9}}

                                    >
                                        <Placemark
                                            geometry={[55.684758, 37.738521]}
                                            modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                                        />

                                    </Map>
                                </div>
                            </YMaps>
                        </Col>
                    </div>

                </div>

                <Col className="mt-5" align='right'>

                </Col>
            </Col>

        </Container>

    );
};

export default MainPage;