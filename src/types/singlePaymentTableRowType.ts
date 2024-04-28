export type singlePaymentTableRowType = {
  invoiceId: string;
  date: string;
  package: string;
  donorName: string;
  type: string;
  amount: number;
  status: PayementStatusType;
  description: string;
  donorsBankDetails: string;
  country: string;
  deliveryFee: number;
  taxFee: number;
  creditCardLastDigits: number;
  userEmail: string;
};

export enum PayementStatusType {
  Pending = "Pending",
  Completed = "Completed",
  Rejected = "Rejected"
}
