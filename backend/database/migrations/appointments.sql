CREATE TABLE appointments (
    appointment_id SERIAL PRIMARY KEY,
    time VARCHAR(50) NOT NULL,
    day_id Int REFERENCES days(day_id)
);

CREATE TABLE interviewers (
    interviewer_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    avatar VARCHAR(255)
);

CREATE TABLE interviews (
    interview_id SERIAL PRIMARY KEY,
    interviewer_id Int REFERENCES interviewers(interviewer_id),
    appointment_id Int REFERENCES appointments(appointment_id),
    student_name varchar(255) NOT NULL
);

CREATE TABLE available(
    available_id SERIAL PRIMARY KEY,
    interviewer_id Int REFERENCES interviewers(interviewer_id),
    day_id Int REFERENCES days(day_id)
);