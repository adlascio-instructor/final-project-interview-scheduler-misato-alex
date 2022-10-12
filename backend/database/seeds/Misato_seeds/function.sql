INSERT INTO interviews (interview_id, interviewer_id, appointment_id, student_name) VALUES (1,1,1,'Misato');

SELECT
    appointments.time as time,
    interviews.interviewer_id as interviewer,
    interviews.student_name as student
FROM
    appointments
LEF JOIN
    interviews
ON
    appointments.appointment_id = interviews.appointment_id
INNER JOIN
    days
WHERE days.name = 'Monday';

SELECT
    days.day_id as id,
    days.name as name,
    available


SELECT
    days.day_id as id,
    days.name as name,
    COUNT(available) as spots
FROM
    days
JOIN
    available
ON
    available.day_id = days.day_id AND days.day_id=2
GROUP BY days.day_id;
