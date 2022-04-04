import{makeAutoObservable} from "mobx"

export default class DoctorStore {
    constructor() {
        this._timetables=[];
        this._doctors=[];
        this._specialties = []
        this._page = 0;
        this._totalCount = 0;
        this._selectedSpecialties = null
        this._limit=15;
        this._selectedDoctor={};
        makeAutoObservable(this);
    }
    setDoctors(doctors) {
        this._doctors = doctors

    }

    setSelectedDoctor(selectedDoctor) {
        this._selectedDoctor = selectedDoctor
    }

    setTimetable(timetables) {
        this._timetables = timetables
    }

    setSelectedTimetable(timetable) {
        this._selectedTimetable = timetable
    }


    setSpeciality(specialties) {
        this._specialties = specialties
    }


    setSelectedSpecialties(speciality) {
        this._selectedSpecialties = speciality
    }
    setPage(page) {
        this._page = page
    }
    goToPage(page){
        this._page = page
    }

    setTotalCount(count) {
        this._totalCount =count
    }
    get Speciality() {
      return this._specialties
    }

    get selectedSpecialties() {
        return this._selectedSpecialties
    }


    get totalCount(){
        return this._totalCount
    }
   get doctors(){
       return this._doctors
    }

    get timetables() {
        return this._timetables
    }


    get specialties() {
        return this._specialties
    }


    get page() {
        return this._page
    }

    get limit(){
        return this._limit;
    }
}