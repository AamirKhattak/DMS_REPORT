import express from "express";

import docsService from "../../services/dms/docsService";

const docsRouter = express.Router();

docsRouter.get("/", async (_req, res) => {

  if(_req.query.startDate == undefined || _req.query.endData == undefined){
    res.status(404).send({error:'startDate or endDate missing'});
    return;

  }
  let startDate  = _req.query.startDate as string;
  let endDate = _req.query.endDate as string;
  let data = await docsService.getEntriesBWDates(startDate, endDate);
  console.log(data);
  
  // let data = {startDate, endDate}

  if (!data) {
    res.status(404);
  } else {
    res.send(data).status(202);
  }
});

docsRouter.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default docsRouter;
