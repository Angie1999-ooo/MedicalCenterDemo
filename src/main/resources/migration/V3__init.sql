create table timetable(
                          id bigserial primary key,
                          doctor bigint NOT NULL,
                          end_time time without time zone,
                          start_time time without time zone,
                          day_week integer,
                          FOREIGN KEY (doctor) REFERENCES doctor (id)
);

CREATE OR REPLACE FUNCTION make_random_day()
    RETURNS int AS $$
DECLARE
    doctorId int;
    time_int time;
    time_i time;
    dayCount int;
    arr_day_week_length int;
BEGIN
    doctorId := 1;
    dayCount := 0;
    time_int := '07:00';
    time_i := '14:00';
    FOR i IN 1..20000
        LOOP
            INSERT INTO timetable (doctor,end_time,start_time,day_week) VALUES
                (doctorId,time_i,time_int,dayCount);
            if(doctorId<11000) then
                doctorId := doctorId+1;
            else doctorId := 1;
            END if;
            if(time_i<'19:00') then
                time_i := time_i+interval '1 hour';
            else time_i := '14:00'+interval '1 hour';
            END if;
            if(time_int<'12:00') then
                time_int := time_int+interval '1 hour';
            else time_int := '08:00'+interval '1 hour';
            END if;
            if(dayCount<6) then
                dayCount := dayCount+1;
            else dayCount := 0;
            END if;
        END LOOP;
    RETURN dayCount;
END;
$$ LANGUAGE  plpgsql;
SELECT make_random_day();