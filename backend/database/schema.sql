CREATE TABLE days(
    day_id SERIAL PRIMARY KEY,
    name VARCHAR(10) NOT NULL
);

CREATE TABLE interviewers (
    interviewer_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    avatar VARCHAR(255)
);

CREATE TABLE appointments (
    appointment_id SERIAL PRIMARY KEY,
    time VARCHAR(50),
    day_id Int REFERENCES days(day_id)
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


SELECT
    5-COUNT(interviewer_id)
FROM
    appointments
LEFT JOIN
    interviews
ON
    appointments.appointment_id  = interviews.appointment_id
GROUP BY
    day_id;
