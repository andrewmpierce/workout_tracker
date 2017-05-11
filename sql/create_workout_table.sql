use workout_tracker;

CREATE TABLE push (
    workout_id SERIAL NOT NULL,
    user_id varchar(20) NOT NULL,
    chest_press_weight smallint NOT NULL,
    chest_press_reps smallint NOT NULL,
    incline_fly_weight smallint NOT NULL,
    incline_fly_reps smallint NOT NULL,
    arnold_press_weight smallint NOT NULL,
    arnold_press_reps smallint NOT NULL,
    overhead_tricep_extension_weight smallint NOT NULL,
    overhead_tricep_extension_reps smallint NOT NULL,
    date_added timestamp default NOW()
);

CREATE TABLE pull (
    workout_id SERIAL NOT NULL,
    user_id varchar(20) NOT NULL,
    pull_up_weight smallint default NULL,
    pull_up_reps smallint NOT NULL,
    bent_over_row_weight smallint NOT NULL,
    bent_over_row_reps smallint NOT NULL,
    reverse_fly_weight smallint NOT NULL,
    reverse_fly_reps smallint NOT NULL,
    shrug_weight smallint NOT NULL,
    shrug_reps smallint NOT NULL,
    bicep_curl_weight smallint NOT NULL,
    bicep_curl_reps smallint NOT NULL,
    date_added timestamp default NOW()
);

CREATE TABLE legs (
    workout_id SERIAL NOT NULL,
    user_id varchar(20) NOT NULL,
    goblet_squat_weight smallint NOT NULL,
    goblet_squat_reps smallint NOT NULL,
    lunge_weight smallint NOT NULL,
    lunge_reps smallint NOT NULL,
    single_leg_deadlift_weight smallint NOT NULL,
    single_leg_deadlift_reps smallint NOT NULL,
    calf_raise_weight smallint NOT NULL,
    calf_raise_reps smallint NOT NULL,
    date_added timestamp default NOW()
);
