export enum JobStatus{
  APPLIED = "APPLIED",
  INTERVIEW ="INTERVIEW",
  OFFERED = "OFFERED",
  REJECTED = "REJECTED"
}

export enum JobStatus2{
  APPLIED = "Applied",
  INTERVIEW ="Interview",
  OFFERED = "Offered",
  REJECTED = "Rejected"
}


// Create a mapping between display values and backend values
export const JobStatusMapping :{[key:string]:string} = {
  [JobStatus.APPLIED]:"APPLIED",
  [JobStatus.INTERVIEW]:'INTERVIEW',
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
