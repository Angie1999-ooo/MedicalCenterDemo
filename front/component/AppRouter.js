
import { Route, Routes} from "react-router";
import {DOCTOR_ROUTE, MEDICAL_ROUTE, PATIENT_ROUTE, SPECIALITY_ROUTE, TIMETABLE_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import MedicalCenter from "../pages/MedicalCenter";
import DoctorPage from "../pages/DoctorPage";
import SpetialityPage from "../pages/SpetialityPage";
import TimeTable from "../pages/TimeTable";
import MainPage from "../pages/MainPage";
import PatientPage from "../pages/PatientPage";
import PagePatient from "../pages/PagePatient";

const AppRouter = observer(()=> {

    return (
        <Routes>
            <Route path={SPECIALITY_ROUTE} element= {<SpetialityPage/>} />
            <Route path={MEDICAL_ROUTE} element= {<MainPage/>} />
            <Route path={DOCTOR_ROUTE} element= {<MedicalCenter/>} />
            <Route path={MEDICAL_ROUTE + "/doctor/:id"} element= {<DoctorPage/>} />
            <Route path={TIMETABLE_ROUTE} element= {<TimeTable/>} />
            <Route path={PATIENT_ROUTE} element= {<PatientPage/>} />
        </Routes>
    )
});

export default AppRouter;