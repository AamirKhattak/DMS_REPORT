// import locationService from './api/location/location.js'
// import gradeService from './api/grade/grade'
// import departmentService from './api/department/department'
// import designationService from './api/designation/designation'
// import userService from './api/user/user'

//  import middleWare from './middleware/middleware.js'

// const express = require('express');
// const cors = require('cors');

// const app = express();
// app.use(cors());

// app.use(middleWare.requestLogger);

// /*is telling our application to accept the incoming JSON body in requests and that we are dealing with JSON, 
// as REST APIs communicate in JSON form.
// */
// app.use(express.json())

import express from 'express';
import diaryRouter from "./src/routes/diaries"
import diagnosesRouter from './src/routes/diagnoses';
import patientRouter from './src/routes/patients';
import cors from 'cors'
import docsRouter from './src/routes/dms/docs';
import usersRouter from './src/routes/dms/users';

const app = express();

app.use(cors());
app.use(express.json());


const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);
app.use('/api/dms/docs', docsRouter);
app.use('/api/dms/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});