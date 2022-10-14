exports.getDaysSpot = `
SELECT
  days.day_id as id,
  days.name as name,
  COUNT(appointments) as spots
FROM 
  days
LEFT JOIN 
  appointments
ON
  appointments.day_id = days.day_id
GROUP BY days.day_id
ORDER BY days.day_id;
`

exports.getOneDayData = `
SELECT
    available.day_id as id,
    COUNT(available) as spots
FROM
    available
JOIN
    interviewers
ON
    available.interviewer_id = interviewers.interviewer_id
GROUP BY available.day_id
ORDER BY id;
`

exports.appointmentEachDay = ( id )=> `
SELECT
  appointments.appointment_id as id,
  appointments.time as time,
  interviews.interview_id as interview_id
FROM
  appointments
LEFT JOIN
  interviews
ON
  appointments.appointment_id = interviews.appointment_id
LEFT JOIN
    days
ON
  days.day_id = appointments.day_id
WHERE
  appointments.day_id = ${id}
ORDER BY appointments.time;
`
