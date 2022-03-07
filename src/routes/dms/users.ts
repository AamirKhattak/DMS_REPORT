import express from 'express';

import usersService from '../../services/dms/usersService';

const usersRouter = express.Router();

usersRouter.get('/', async (_req, res) => {
  // res.send('asd');
  // console.log(await usersService.getEntries());
  
  res.send(await usersService.getEntries()).status(202);
});

usersRouter.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default usersRouter;