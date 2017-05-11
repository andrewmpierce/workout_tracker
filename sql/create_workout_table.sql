use workout_tracker;

CREATE TABLE workouts (
    set_id SERIAL,
    workout_id integer NOT NULL,
    workout_type varchar(20) NOT NULL,
    user_id varchar(20) NOT NULL,
    movement varchar(20) NOT NULL,
    weight smallint NOT NULL,
    set_1 smallint NOT NULL,
    set_2 smallint NOT NULL,
    set_3 smallint NOT NULL,
    date_added timestamp default NULL
);
