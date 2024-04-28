import { PayementStatusType } from "../../types/singlePaymentTableRowType";

export const dummyPaymentRowData = [
  {
    invoiceId: "123456",
    date: "Jun 10, 2023",
    package: "Stem Cell Package",
    donorName: "Latifa Sherbeeni",
    type: "Credit Card",
    amount: 30000,
    status: PayementStatusType.Completed,
    description: "Completed 20 years stem cell storage package",
    donorsBankDetails: "Armani Beach Residences Palm Jumeirah,Dubai",
    country: "United Arab Emirates",
    deliveryFee: 5.0,
    taxFee: 5.0,
    creditCardLastDigits: 1234,
    userEmail: "name@email.com"
  }
  //   {
  //     invoiceId: "789233",
  //     date: "Jun 07, 2023",
  //     package: "Cord Blood Package",
  //     donorName: "Nagham Ahmed",
  //     type: "Credit Card",
  //     amount: 30000,
  //     status: PayementStatusType.Rejected,
  //     description: "Completed 20 years stem cell storage package",
  //     donorsBankDetails: "Armani Beach Residences Palm Jumeirah,Dubai",
  //     country: "United Arab Emirates",
  //     deliveryFee: 5.0,
  //     taxFee: 5.0,
  //     creditCardLastDigits: 4567,
  //     userEmail: "name@email.com"
  //   }
];
