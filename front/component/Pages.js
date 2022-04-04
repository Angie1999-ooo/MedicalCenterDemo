import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Pages = observer(() => {
    const {doctor} = useContext(Context)
    const pageCount = Math.floor(doctor.totalCount / doctor.limit)


    const handleChange = (event, value) => {

            doctor.setPage(value);

    };
    return (
        <Stack spacing={2}>
            <Pagination
                count={pageCount} page={doctor.page} onChange={handleChange}
                variant="outlined" color="primary"
            />
        </Stack>
    )

});

export default Pages;