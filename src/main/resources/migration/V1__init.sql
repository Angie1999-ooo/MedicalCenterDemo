create table speciality(
                           id bigserial primary key,
                           speciality character varying(255) NOT NULL
);

CREATE OR REPLACE FUNCTION make_random_speciality()
    RETURNS int AS $$
DECLARE
    r record;
    specialityCount int;
    speciality VARCHAR[];
    arr_speciality_length int;
BEGIN
    specialityCount := 1;
    speciality := ARRAY['Онкология', 'Дерматология', 'Кардиология', 'Хирургия', 'Психиатрия',
        'Неврология', 'Эндокринология', 'Стоматология', 'Терапия'];
    arr_speciality_length := array_length(speciality, 1);
    FOR i IN 1..8
        LOOP
            INSERT INTO speciality (speciality) VALUES
                (speciality[specialityCount]);
            specialityCount := specialityCount+1;
        END LOOP;
    RETURN specialityCount;
END;
$$ LANGUAGE  plpgsql;

SELECT make_random_speciality();



