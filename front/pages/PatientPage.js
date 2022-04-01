import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import {useEffect, useState} from "react";
import {deletePatient, fetchAcceptance, fetchByAcceptance, fetchPatient, fetchSpetiality} from "../service/doctorAPI";
import {
    Category,
    ChartComponent, ColumnSeries, DataLabel, DateTime,
    Legend, LineSeries,
    RangeColumnSeries,
    SeriesCollectionDirective, SeriesDirective,
    Tooltip
} from "@syncfusion/ej2-react-charts";
import {Browser} from "@syncfusion/ej2-base";
import {Inject} from "@syncfusion/ej2-react-grids";
import NavBar from "../component/NavBar";
import {Button, Container, TableHead} from "@mui/material";
import {format} from "date-fns";
import {Col, Dropdown} from "react-bootstrap";

import { DatePickerComponent} from "@syncfusion/ej2-react-calendars";
import * as EnhancedTableHead from "@mui/x-data-grid";

const TablePaginationActions=(props) =>{
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;


    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

// function createData(id,name, doctor, startDate, endDate) {
//
//     return {id, name, doctor, startDate , endDate};
// }

function createData(id,patientFIO, email,phone) {

    return {id, patientFIO , email,phone};
}


export default function CustomPaginationActionsTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const[acceptance,setAcceptance]=useState([])
    const [patient,setPatient]=useState([])
    const [speciality,setSpeciality]=useState([]);
    const [date,setDate]= useState(new Date())
    useEffect(() => {
        fetchByAcceptance( ).then(acceptancePage => {
                setAcceptance(acceptancePage)

            }
        )

    }, [])

    useEffect(() => {

        fetchSpetiality().then(spec => setSpeciality(spec))

    }, [])


    useEffect(() => {

       fetchPatient().then(patientObj=>setPatient(patientObj))

    }, [])



    const rows = []

    const count=[]

    const arr=[];

    console.log(date)

    // if(date==null) {
    //
    //     acceptance.map(accept => {
    //
    //         const doctorFIO = accept.doctor.secondName + ' ' + accept.doctor.firstName + ' ' + accept.doctor.middleName
    //
    //         const patientFIO = accept.patient.secondName + ' ' + accept.patient.firstName + ' ' + accept.patient.middleName
    //
    //
    //         rows.push(createData(accept.id, patientFIO, doctorFIO, format(new Date(accept.startDate), "HH:mm"), format(new Date(accept.endDate), "HH:mm")))
    //
    //     })
    //
    // }
    // else
    // {
    //     acceptance.map(accept => {
    //
    //         if(new Date(accept.startDate).toDateString()==date.toDateString() ) {
    //
    //             const doctorFIO = accept.doctor.secondName + ' ' + accept.doctor.firstName + ' ' + accept.doctor.middleName
    //
    //             const patientFIO = accept.patient.secondName + ' ' + accept.patient.firstName + ' ' + accept.patient.middleName
    //
    //             rows.push(createData(accept.id, patientFIO, doctorFIO, format(new Date(accept.startDate), "HH:mm"), format(new Date(accept.endDate), "HH:mm")))
    //
    //         }  })
    //
    // }

    if(date==null) {

        acceptance.map(accept => {

            const patientFIO = accept.patient.secondName + ' ' + accept.patient.firstName + ' ' + accept.patient.middleName


            rows.push(createData(accept.id, patientFIO, accept.patient.email, accept.patient.phone))

        })

    }
    else
    {
        acceptance.map(accept => {

            if(new Date(accept.startDate).toDateString()==date.toDateString() ) {

                const patientFIO = accept.patient.secondName + ' ' + accept.patient.firstName + ' ' + accept.patient.middleName

                rows.push(createData(accept.id, patientFIO, accept.patient.email, accept.patient.phone))

            }  })

    }

    const statistic=()=> {
        acceptance.map(accept => {
            arr.push(accept.doctor.speciality.id)
            arr.sort()
            let result = [];
            arr.forEach(function (a) {
                result[a] = result[a] + 1 || 1;
            });

            for (let key in result)
                speciality.map(specil => {
                    if (specil.id == key) {
                        count.push({x: specil.speciality, low: 0, high: result[key]})
                    }
                })
        })
    }
    statistic()


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };



    return (
        <Container  md={20} >
            <TableContainer component={Paper}>
                <NavBar/>
                <Col  style={{width:'10%'}}>
                    <DatePickerComponent
                        value={date} onChange={(date) => setDate(date.target.value)}
                    >
                    </DatePickerComponent>
                </Col>

                <Table  sx={{ minWidth: 100 }} aria-label="custom pagination table" >
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' >Пациент</TableCell>
                            <TableCell align='center' >Email</TableCell>
                            <TableCell align='center' >Телефон</TableCell>
                            {/*<TableCell align='center' >delete</TableCell>*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                        ).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell  align="center" >
                                    {row.patientFIO}
                                </TableCell>
                                <TableCell  align="center">
                                    {row.email}
                                </TableCell>
                                <TableCell  align='center'>
                                    {row.phone}
                                </TableCell>
                                {/*<TableCell  align='center'>*/}
                                {/*   <Button onClick={()=>deletePatient(row.id)}>delete</Button>*/}
                                {/*</TableCell>*/}
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
                <ChartComponent id='charts' style={{ textAlign: "center" }}
                                primaryYAxis={{ labelFormat: '{value}', maximum: acceptance.length, edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }}
                                primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 } }}
                                title='Post statistics'
                                chartArea={{ border: { width: 0 } }}
                                width={Browser.isDevice ? '100%' : '60%'}
                                tooltip={{
                                    enable: true
                                }}>
                    <Inject services={[RangeColumnSeries, Tooltip, Category, Legend]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={count} name='Acceptance'  xName='x' low='low' high='high' type='RangeColumn' >
                        </SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
                <SeriesCollectionDirective>
                    <SeriesDirective dataSource={count} xName='x'  type='Line'>
                    </SeriesDirective>
                </SeriesCollectionDirective>
            </TableContainer>
        </Container>
    );
}
