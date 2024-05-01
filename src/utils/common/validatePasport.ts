export const passportIdValidation = async (event: any) => {
  const original = event.target.value;

  let formattedValue = "";
  if (original.startsWith("784")) {
    // Remove dashes and limit to 16 characters
    const processedValue = original.replace(/-/g, "").substring(0, 15);

    // Add dashes after 3rd, 7th, and 14th characters
    formattedValue =
      processedValue.slice(0, 3) +
      "-" +
      processedValue.slice(3, 7) +
      "-" +
      processedValue.slice(7, 14) +
      "-" +
      processedValue.slice(14);

    // setFormattedString(formattedValue);
  } else {
    formattedValue = original;
  }
  return formattedValue;
  // await formik.setFieldValue("passport", formattedValue);
};
