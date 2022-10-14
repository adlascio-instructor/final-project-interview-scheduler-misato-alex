-- SELECT * FROM appointments;

-- SELECT * FROM available;

-- SELECT * FROM interviewers;

-- create interview query
INSERT INTO interviews (interviewer_id, appointment_id, student_name) VALUES ($1,$2,$3);

-- delete interview query
DELETE FROM interviews WHERE interview_id = $1;

-- create available query
INSERT INTO interviews (interviewer_id, day_id) VALUES ($1,$2);

-- delete available entry query
DELETE FROM available WHERE available_id = $1;