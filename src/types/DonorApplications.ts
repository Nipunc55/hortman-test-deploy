export type singleDonorApplicationType = {
  date: string;
  package: string;
  donorName: string;
  status: string;
};

export type singleDonorApplicationPaymenttableType = {
  date: string;
  package: string;
  email: string;
  type: string;
  amount: number;
  status: StatusType;
};

export enum StatusType {
  Pending = "Pending",
  Completed = "Completed",
  Rejected = "Rejected"
}
