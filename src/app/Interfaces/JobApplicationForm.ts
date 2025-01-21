import {JobStatus} from '../Enums/JobStatus';
import {User} from './UserInterface';
import {JobApplicationAccount} from './JobApplicationAccount';

export interface JobApplicationForm {

  jobTitle:string,
  companyName:string,
  applicationDate:Date,
  interviewDate:Date,
  applicationMethod:string,
  status:JobStatus;
  applicationLink:string,
  recruiterName:string,
  recruiterContact:string,
  notes:string,
  account:JobApplicationAccount


}


