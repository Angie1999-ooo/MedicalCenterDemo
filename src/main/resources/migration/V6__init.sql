create table statistic
(
    id bigint primary key,
    startDate timestamp,
    endDate timestamp,
    speciality bigint NOT NULL,
    FOREIGN KEY (speciality) references speciality(id)
)