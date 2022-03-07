import express from 'express';

import patientsService from '../services/patientsService';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

patientRouter.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default patientRouter;