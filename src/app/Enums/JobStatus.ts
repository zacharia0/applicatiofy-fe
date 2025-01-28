export enum JobStatus{
  APPLIED = "APPLIED",
  INTERVIEW_SCHEDULED ="INTERVIEW_SCHEDULED",
  OFFERED = "OFFERED",
  REJECTED = "REJECTED"
}

export enum JobStatus2{
  APPLIED = "Applied",
  INTERVIEW_SCHEDULED ="Interview Scheduled",
  OFFERED = "Offered",
  REJECTED = "Rejected"
}


// Create a mapping between display values and backend values
export const JobStatusMapping :{[key:string]:string} = {
  [JobStatus.APPLIED]:"APPLIED",
  [JobStatus.INTERVIEW_SCHEDULED]:'INTERVIEW_SCHEDULED',
  [JobStatus.OFFERED]:"OFFERED",
  [JobStatus.REJECTED]:'REJECTED'

}


// export const jobStatusLabels: {[key:string]:string} = {
//   [JobStatus.APPLIED]:"Applied",
//   [JobStatus.OFFERED]:"Offered",
//   [JobStatus.INTERVIEW_SCHEDULED]: "Interview Scheduled",
//   [JobStatus.REJECTED]:"Rejected"
//
// }
