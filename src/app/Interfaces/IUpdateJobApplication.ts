import {JobStatus} from '../Enums/JobStatus';

export interface IUpdateJobApplication{
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
}
