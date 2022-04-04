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
import {useContext, useEffect, useState} from "react";
import {
    deletePatient,
    fetchAcceptance,
    fetchByAcceptance,
    fetchPatient,
    fetchSpetiality,
    fetchStatistic
} from "../service/doctorAPI";
import {
    Category,
    ChartComponent,
    Legend,
    RangeColumnSeries,
    SeriesCollectionDirective, SeriesDirective,
    Tooltip
} from "@syncfusion/ej2-react-charts";
import {Browser} from "@syncfusion/ej2-base";
import {Inject} from "@syncfusion/ej2-react-grids";
import NavBar from "../component/NavBar";
import {Button, Container, TableHead} from "@mui/material";
import {Col, Dropdown} from "react-bootstrap";

import DeleteIcon from '@mui/icons-material/Delete'
import {Context} from "../index";

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


export default function CustomPaginationActionsTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const[acceptance,setAcceptance]=useState([])
    const [speciality,setSpeciality]=useState([]);
    const[statistic,setStatistic]=useState([])
    const [interval,setInterval]= useState('Неделя')
    const state=['Неделя','Месяц','Год','Всё время']


    useEffect(() => {
        fetchPatient( ).then(acceptancePage => {
           setAcceptance(acceptancePage)

            }

        )

    }, [])

    useEffect(() => {

        fetchStatistic(new Date(),interval).then(record=>setStatistic(record))

    }, [interval])

    useEffect(() => {

        fetchSpetiality().then(spec => setSpeciality(spec))

    }, [])



    const count=[]

    const arr=[];

    const audit=()=> {
        statistic.map(accept => {
            arr.push(accept.speciality.id)
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
    audit()


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - acceptance.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };



    const hand =async(select)=>
    {
        const selectedIndex = acceptance.indexOf(select);

        let newSelected = [];

            newSelected = newSelected.concat(
                acceptance.slice(0, selectedIndex),
                acceptance.slice(selectedIndex + 1),
            );


        setAcceptance(newSelected)

        await deletePatient(select.id)
    }

    let maximum = statistic.length > 10 ? statistic.length : 10


    return (
        <Container  md={20} >
            <TableContainer component={Paper}>
                <NavBar/>

                <Table  sx={{ minWidth: 500}} aria-label="custom pagination table" >
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' >Пациент</TableCell>
                            <TableCell align='center' >Email</TableCell>
                            <TableCell align='center' >Телефон</TableCell>
                            <TableCell align='center' >Действие</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? acceptance.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : acceptance
                        ).map((row) => (
                            <TableRow key={row.id}>
                                    <TableCell  align="center" >
                                    {row.firstName}
                                </TableCell>
                                <TableCell  align="center">
                                    {row.email}
                                </TableCell>
                                <TableCell  align='center'>
                                    {row.phone}
                                </TableCell>
                                <TableCell  align='center'>
                                   <Button onClick={()=>hand(row)}><DeleteIcon/></Button>
                                </TableCell>


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
                                colSpan={4}
                                count={ acceptance.length}
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
                <Dropdown  className="mt-2 mb-2">
                    <Dropdown.Toggle >{interval }</Dropdown.Toggle>
                    <Dropdown.Menu >
                        {state.map(stateObj =>
                            <Dropdown.Item
                                onClick={() => setInterval(stateObj)}

                            >
                                {stateObj}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>

                <ChartComponent id='charts' style={{ textAlign: "center" }}
                                primaryYAxis={{ labelFormat: '{value}', maximum: maximum, edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }}
                                primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 } }}
                                title='Статистика'
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
