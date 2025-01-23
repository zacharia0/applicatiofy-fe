import {JobStatus} from '../Enums/JobStatus';
import {User} from './IUser';
import {IJobApplicationAccount} from './IJobApplicationAccount';

export interface IJobApplicationForm {
  id:string,
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
  account:IJobApplicationAccount


}


