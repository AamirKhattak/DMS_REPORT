export interface Patients {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string,
  }

  export type NonSensitivePatientEntry = Omit<Patients, 'ssn'>;
