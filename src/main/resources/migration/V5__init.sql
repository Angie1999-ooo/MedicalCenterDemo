create table acceptance (
                            id bigserial primary key,
                            doctor bigint NOT NULL,
                            end_time time without time zone,
                            start_time time without time zone,
                            date_acceptance date,
                            users bigint NOT NULL,
                            FOREIGN KEY (users) REFERENCES users (id),
                            FOREIGN KEY ( doctor) REFERENCES  doctor (id)
)