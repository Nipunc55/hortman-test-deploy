export type singleDonorApplicationReportType = {
  date: string;
  package: string;
  donorName: string;
  mobile: string;
  email: string;
  status: StatusType;
};

export enum StatusType {
  Pending = "Pending",
  Completed = "Completed",
  Rejected = "Rejected"
}
