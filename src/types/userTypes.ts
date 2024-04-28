export type userRowType = {
  id: number;
  name: string;
  createdAt: string;
  mobile: string;
  email: string;
  access: access;
  status: status;
};

export enum status {
  active = "Active",
  inactive = "Inactive"
}

export enum access {
  administrator = "administrator",
  donor = "donor",
  healthProfessional = "healthProfessional",
  driver = "driver"
}
