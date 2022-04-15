create table doctor
(
    id bigserial primary key,
    education character varying(255),
    first_name character varying(255),
    middle_name character varying(255),
    second_name character varying(255),
    photo character varying(255),
    speciality bigint NOT NULL,
    FOREIGN KEY (speciality) REFERENCES speciality (id)

);

CREATE OR REPLACE FUNCTION make_random_doctors()
    RETURNS int AS $$
DECLARE
    r record;
    specialitys record;
    doctorsCount int;
    names VARCHAR[];
    secondnames VARCHAR[];
    middlenames VARCHAR[];
    education VARCHAR[];
    arr_education int;
    arr_names_length int;
    arr_secondnames_length int;
    arr_middlenames_length int;
    arr_education_length int;
BEGIN
    doctorsCount := 0;
    names := ARRAY['Сергей', 'Антон', 'Михаил', 'Степан', 'Семен',
        'Николай', 'Василий', 'Виктор', 'Геннадий', 'Александр',
        'Владимир', 'Денис', 'Дмитрий', 'Алексей', 'Константин',
        'Евгений', 'Борис', 'Виталий', 'Станислав', 'Анатолий'];
    secondnames := ARRAY['Сергеев', 'Антонов', 'Михаилов', 'Степанов',
        'Семенов', 'Николаевский', 'Васильев', 'Викторов', 'Геннадиев',
        'Александров',
        'Владимирский', 'Денисов', 'Дмитриев', 'Алексеев',
        'Константинов', 'Евгениев', 'Борисов', 'Витальев', 'Станиславский',
        'Анатольев'];
    middlenames := ARRAY['Сергевич', 'Антонович', 'Михаилович',
        'Степанович', 'Семенович', 'Николаевич', 'Васильевич', 'Викторович',
        'Геннадьевич', 'Александрович',
        'Владимирович', 'Денисович', 'Дмитриевич', 'Алексеевич',
        'Константинович', 'Евгениевич', 'Борисович', 'Витальевич',
        'Станиславович', 'Анатольевич'];
    education := ARRAY['МГТУ', 'МИФИ', 'МГИМО',
        'ВлГу', 'МАИ', 'МЭИ', 'РГУ', 'МГУ'];
    arr_names_length := array_length(names, 1);
    arr_secondnames_length := array_length(secondnames, 1);
    arr_middlenames_length := array_length(middlenames, 1);
    arr_education_length := array_length(education, 1);

    FOR i IN 1..11000
        LOOP
            INSERT INTO doctor (education,first_name, middle_name,second_name,speciality) VALUES
                (education[trunc(random()*arr_education_length)+1],names[trunc(random()*arr_names_length)+1],
                 secondnames[trunc(random()*arr_secondnames_length)+1],
                 middlenames[trunc(random()*arr_middlenames_length)+1],random()*7+1);
            doctorsCount := doctorsCount+1;
        END LOOP;
    RETURN doctorsCount;
END;
$$ LANGUAGE  plpgsql;

SELECT make_random_doctors();