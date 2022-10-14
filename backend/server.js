const express = require("express");
const app = express();
const port = 8000;
const cors = require('cors');
const daysRouter = require("./routes/days_router");
const scheduleRouter = require("./routes/schedule_router");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());


app.use('/days', daysRouter);
app.use('/schedule', scheduleRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));

