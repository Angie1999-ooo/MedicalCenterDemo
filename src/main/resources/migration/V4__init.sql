create table users (
                            id bigserial primary key,
                            first_name character varying(255),
                            middle_name character varying(255),
                            second_name character varying(255),
                            phone character varying(255),
                            email character varying(255),
                            password varchar(255),
                            status character varying(255),
                            activationKey character varying(255)
)