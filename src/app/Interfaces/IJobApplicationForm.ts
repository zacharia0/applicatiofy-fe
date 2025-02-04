import {JobStatus} from '../Enums/JobStatus';
import {IJobApplicationAccount} from './IJobApplicationAccount';

export interface IJobApplicationForm {
  id:number,
  jobTitle:string,
  companyName:string,
  appliedDate:Date,
  interviewDate:Date,
  applicationMethod:string,
  status:JobStatus;
  applicationLink:string,
  recruiterName:string,
  recruiterContact:string,
  notes:string,
  account:IJobApplicationAccount


}


