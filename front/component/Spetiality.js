import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const Spetiality = observer(() => {
    const {doctor} = useContext(Context)
    return (
        <Row className="d-flex">
            {doctor.specialties.map(specialty =>
                <Card
                    style={{cursor:'pointer'}}
                    key={specialty.id}
                    className="p-3"
                    onClick={() => doctor.setSelectedSpecialties(specialty)}
                    border={specialty.id === doctor.selectedSpecialties ? 'danger' : 'light'}
                >
                    {specialty.speciality}
                </Card>
            )}
        </Row>
    );
});

export default Spetiality;