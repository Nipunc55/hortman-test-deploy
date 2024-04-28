import { packagePayementStatusType } from "../../types/stemCellPackageType";

export const dummyStemCellPackageData = [
  {
    packageId: "1",
    package: "Treasure Hope",
    donorName: "Latifa Sherbeeni",
    HSCLID: "0123456",
    date: "23-05-2023",
    status: "Acquire a sample from the patient.",
    paymentDate: "May 25, 2023",
    paymentName: "Stem Cell Package Fees",
    paymentType: "Credit Card",
    amount: "30000",
    paymentStatus: packagePayementStatusType.Completed
  }
];
