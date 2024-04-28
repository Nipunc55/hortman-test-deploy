import * as Yup from "yup";

export const applicationRejectionSchema = Yup.object().shape({
  rejectionReason: Yup.string().required(
    "Please provide a reason for rejection"
  ),
  rejectionBy: Yup.string().required("Please provide the rejected by name"),
  rejectionDate: Yup.string().required("Please provide the date of rejection")
});

export const userCreationSchema = Yup.object().shape({
  fullName: Yup.string().required("Please provide the full name"),
  email: Yup.string()
    .required("Please provide the email")
    .email("Invalid email format")
    .test("valid-email", "Invalid email format", (value) =>
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(value)
    ),
  role: Yup.string().required("Please provide the role"),
  mobileNumber: Yup.string().required("Please provide the mobile number")
});
export const donorCreationSchema = Yup.object().shape({
  fullName: Yup.string().required("Please provide the full name"),
  email: Yup.string()
    .required("Please provide the email")
    .email("Invalid email format")
    .test("valid-email", "Invalid email format", (value) =>
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(value)
    ),

  mobileNumber: Yup.string().required("Please provide the mobile number")
});
export const createInvoiceFormSchema = Yup.object().shape({
  invoice: Yup.string().required("Please provide an invoice"),
  description: Yup.string().required("Please provide an application"),
  amount: Yup.string().required("Please provide an amount")
});

export const motherDetailsSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please provide the email")
    .email("Invalid email format")
    .test("valid-email", "Invalid email format", (value) =>
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(value)
    ),
  alternatePhoneNum: Yup.string()
    .required("Please provide the mobile number")
    .matches(/^\+?[0-9]{7,15}$/, "Invalid mobile number format"),

  fullName: Yup.string().required("Please provide the mother's full name"),
  dob: Yup.string().required("Please provide the mother's date of birth"),
  nationality: Yup.string().required(
    "Please provide the nationality of the parent"
  ),
  // +971 50 000 0000
  // passport: Yup.string().required(
  //   "Please provide the passport number of the parent"
  // )
  passport: Yup.string()
    .required("Please provide the ID or passport number")
    .test("valid-id-or-passport", "Invalid ID or passport format", (value) => {
      // const isEmiratesID = /^\d{18}$/.test(value);
      const isEmiratesID = /^\d{3}-\d{4}-\d{7}-\d{1}$/.test(value);

      const isPassport = /^[A-Za-z0-9]{9}$/i.test(value);
      // console.log(isEmiratesID, isPassport);

      // Return true if it matches either format
      return isEmiratesID || isPassport;
    })
});

export const fatherDetailsSchema = Yup.object().shape({
  fullName: Yup.string().required("Please provide the father's full name"),
  dob: Yup.string().required("Please provide the father's date of birth"),
  nationality: Yup.string().required(
    "Please provide the nationality of the parent"
  ),
  // passport: Yup.string().required(
  //   "Please provide the passport number of the parent"
  // ),
  passport: Yup.string()
    .required("Please provide the ID or passport number")
    .test("valid-id-or-passport", "Invalid ID or passport format", (value) => {
      // const isEmiratesID = /^\d{15}$/.test(value);
      const isEmiratesID = /^\d{3}-\d{4}-\d{7}-\d{1}$/.test(value);

      const isPassport = /^[A-Za-z0-9]{9}$/i.test(value);
      // console.log(isEmiratesID, isPassport);

      // Return true if it matches either format
      return isEmiratesID || isPassport;
    }),
  email: Yup.string()
    .required("Please provide the email")
    .email("Invalid email format")
    .test("valid-email", "Invalid email format", (value) =>
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(value)
    ),
  alternatePhoneNum: Yup.string()
    .required("Please provide the mobile number")
    .matches(/^\+?[0-9]{7,15}$/, "Invalid mobile number format")
});

export const eligibilityFormSchema = Yup.object().shape({
  title: Yup.string().required("Please provide a title"),
  body: Yup.string().required("Please provide a body"),
  notificationType: Yup.string().required(
    "Please provide the notification type"
  ),
  user: Yup.string().required("Please select user"),
  reviewedby: Yup.string().required("Please select a reviewer")
});

export const educationMaterialSchema = Yup.object().shape({
  postType: Yup.string().required("Please provide a post type"),
  title: Yup.string().required("Please provide a title"),
  value: Yup.string().required("Please provide a content")
});
export const profileDataValidationSchema = Yup.object().shape({
  fullName: Yup.string().required("Please provide the full name"),
  email: Yup.string()
    .required("Please provide the email")
    .email("Invalid email format")
    .test("valid-email", "Invalid email format", (value) =>
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(value)
    ),
  alternatePhoneNum: Yup.string()
    .required("Please provide the mobile number")
    .matches(/^\+?[0-9]{7,15}$/, "Invalid mobile number format"),

  passport: Yup.string()
    .required("Please provide the ID or passport number")
    .test("valid-id-or-passport", "Invalid ID or passport format", (value) => {
      const isEmiratesID = /^\d{15}$/.test(value);

      const isPassport = /^[A-Za-z0-9]{9}$/i.test(value);
      // console.log(isEmiratesID, isPassport);

      // Return true if it matches either format
      return isEmiratesID || isPassport;
    })
});
