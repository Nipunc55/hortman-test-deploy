const LAST_SUBMISSION_SECTION: any = {
  MOTHER_PERSONAL_DETAILS: 2,
  LOCATION: 3,
  FATHER_PERSONAL_DETAILS: 4,
  STEM_CELLS_SOURCE: 6,
  BANKING_DETAILS: 7,

  QUESTIONNAIRE: 9
};

export const getStepCountOf = (_application: any): number => {
  const _step: number =
    LAST_SUBMISSION_SECTION[`${_application?.last_submission_type}` || ""] || 1;
  return _step;
};
