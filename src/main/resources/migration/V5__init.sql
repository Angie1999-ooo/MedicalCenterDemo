create table acceptance (
                            id bigserial primary key,
                            doctor bigint NOT NULL,
                            end_time time without time zone,
                            start_time time without time zone,
                            date_acceptance date,
                            patient bigint NOT NULL,
                            FOREIGN KEY (patient) REFERENCES patient (id),
                            FOREIGN KEY ( doctor) REFERENCES  doctor (id)
)