import diagnoses from "../../data/diagnoses";

import { Diagnoses } from "../types/diagnoses";

// const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;

const getEntries = (): Array<Diagnoses> => {
  return diagnoses;
};


const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary
};
