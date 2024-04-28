export type singleStemCellPackageType = {
  // [x: string]: string;
  banking: string;
  package: {
    _id: string;
    name: string;
    price: number;
    sub_heading: string;
    package_details: string;
    package_code: string;
    createdAt: string;
    updatedAt: string;
    image: string;
    __v: number;
  };
  donorName: string;
  hscl_id: string;
  created_at: string;
  status: string;
  source_stem_cells: any;
  last_submission_id: any;
  last_submission_question_section: any;
  last_submission_type: any;
  user: {
    email: any;
    mobile_no: any;
    name: any;
    _id: any;
  };
  _id: string;
  paymentStatus: packagePayementStatusType;
  application_status: {
    donor_information: string;
    eligibility_assessment: string;
    kit_status: string;
    medical_questionnaire: string;
    payments: string;
    storage_certificate: string;
    umbilical_cord_unit_status: string;
  };
};

export enum packagePayementStatusType {
  Pending = "Pending",
  Completed = "Completed",
  Rejected = "Rejected"
}
