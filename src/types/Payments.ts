export type singlePaymentType = {
  invoiceId: string;
  date: string;
  package: string;
  donorName: string;
  type: string;
  amount: number;
  status: string;
  description: string;
  donorsBankDetails: string;
  country: string;
  deliveryFee: number;
  taxFee: number;
  creditCardLastDigits: number;
  userEmail: string;
};
