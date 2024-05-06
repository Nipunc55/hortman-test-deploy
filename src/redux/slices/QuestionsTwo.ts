import { InputType } from "../types/Questions";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  UPDATE_QUESTION_TWO_ANSWER,
  type QuestionsTwoInitialState,
  type QuestionTwoType,
  CheckBoxType
} from "../types/QuestionsTwo";

const initialState: QuestionsTwoInitialState = {
  questionsTwo: [
    {
      id: 1,
      question:
        "Were you and/or the baby’s father adopted in early childhood? ",
      translatedQuestion:
        "هل تم تبنيك أنت و/أو والد الطفل في مرحلة الطفولة المبكرة؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 11,
          question:
            "Is a family medical history available for you and/or the baby’s father?",
          translatedQuestionTwo:
            "هل يتوفر تاريخ طبي عائلي لك و/أو لوالد الطفل؟",
          inputType: InputType.YESANDNO,
          isYesSelected: null,
          yesQuestions: null,
          noQuestions: null,
          answer: ""
        }
      ],
      noQuestions: null,
      answer: ""
    },
    {
      id: 2,
      question:
        "Are you and the baby’s father related, except by marriage? (e.g. first cousins)",
      translatedQuestion:
        "هل أنت ووالد الطفل مرتبطان إلا بالزواج؟ (على سبيل المثال، أبناء العمومة)",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 3,
      question: "Did this pregnancy use either a donor egg or donor sperm?",
      translatedQuestion:
        "هل استخدم هذا الحمل بويضة متبرعة أو حيوانًا منويًا متبرعًا به؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 31,
          question:
            "Is a family medical history questionnaire available for the egg or sperm donor? ",
          translatedQuestionTwo:
            "هل يتوفر استبيان التاريخ الطبي للعائلة للمتبرع بالبويضة أو الحيوانات المنوية؟",
          inputType: InputType.YESANDNO,
          isYesSelected: null,
          yesQuestions: null,
          noQuestions: null,
          answer: ""
        }
      ],
      noQuestions: null,
      answer: ""
    },
    {
      id: 4,
      question:
        "Have you had an abnormal result from a prenatal test (e.g. amniocentesis, blood test, ultrasound)?",
      translatedQuestion:
        "هل حصلت على نتيجة غير طبيعية من اختبار ما قبل الولادة (مثل بزل السلى، فحص الدم، الموجات فوق الصوتية)؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 41,
          question: "Which test was abnormal?",
          translatedQuestionTwo: "أي اختبار كان غير طبيعي؟",
          inputType: InputType.TEXT,
          isYesSelected: null,
          yesQuestions: null,
          noQuestions: null,
          answer: ""
        },
        {
          id: 42,
          question: "What was the abnormal test result?",
          translatedQuestionTwo: "ما هي نتيجة الاختبار غير الطبيعية؟",
          inputType: InputType.TEXT,
          isYesSelected: null,
          yesQuestions: null,
          noQuestions: null,
          answer: ""
        },
        {
          id: 43,
          question: "Was a diagnosis made?",
          translatedQuestionTwo: "هل تم التشخيص؟",
          inputType: InputType.YESANDNO,
          isYesSelected: null,
          yesQuestions: [
            {
              id: 44,
              question: "specify diagnosis ",
              translatedQuestionTwo: "تحديد التشخيص",
              inputType: InputType.TEXT,
              isYesSelected: null,
              yesQuestions: null,
              noQuestions: null,
              answer: ""
            }
          ],
          noQuestions: null,
          answer: ""
        }
      ],
      noQuestions: null,
      answer: ""
    },
    {
      id: 5,
      question:
        "Have you had any children who died within the first 10 years of life?",
      translatedQuestion:
        "هل كان لديك أي أطفال ماتوا خلال السنوات العشر الأولى من حياتهم؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 51,
          question: "What was the cause?",
          translatedQuestionTwo: "ما هو السبب؟",
          inputType: InputType.TEXT,
          isYesSelected: null,
          yesQuestions: null,
          noQuestions: null,
          answer: ""
        }
      ],
      noQuestions: null,
      answer: ""
    },
    {
      id: 6,
      question: "Have you ever had a stillborn child?",
      translatedQuestion: "هل سبق لك أن أنجبت طفلاً ميتاً؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 61,
          question: "what was the cause? ",
          translatedQuestionTwo: "ما هو السبب؟",
          inputType: InputType.TEXT,
          isYesSelected: null,
          yesQuestions: null,
          noQuestions: null,
          answer: ""
        }
      ],
      noQuestions: null,
      answer: ""
    },
    {
      id: 7,
      question: "Cancer or leukemia?",
      translatedQuestion: "سرطان أم سرطان الدم؟",
      inputType: InputType.YESANDNO,
      checkboxColumns: 1,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 71,
          question: "",
          translatedQuestion: "",
          inputType: InputType.MULTIPLE_CHECKBOX,
          checkboxColumns: 1,
          options: [
            {
              title: "Brain or other nervous system cancer",
              translatedTitle: "سرطان الدماغ أو أي سرطان آخر في الجهاز العصبي",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                }
              ]
            },
            {
              title: "Bone or joint cancer",
              translatedTitle: "سرطان العظام أو المفاصل",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                }
              ]
            },
            {
              title: "Kidney (including renal pelvic) cancer",
              translatedTitle: "سرطان الكلى (بما في ذلك الحوض الكلوي).",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                }
              ]
            },
            {
              title: "Thyroid cancer",
              translatedTitle: "سرطان الغدة الدرقية",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                }
              ]
            },
            {
              title: "Hodgkin’s lymphoma",
              translatedTitle: "سرطان الغدد الليمفاوية",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                }
              ]
            },
            {
              title: "Non-Hodgkin’s lymphoma.",
              translatedTitle: "غير هودجكن ليمفوما ل.",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                }
              ]
            },
            {
              title: "Acute or chronic myelogenous/myeloid leukemia",
              translatedTitle: "سرطان الدم النقوي / النخاعي الحاد أو المزمن",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                }
              ]
            },
            {
              title: "Acute or chronic lymphocytic/lymphoblastic leukemia",
              translatedTitle:
                "سرطان الدم الليمفاوي / سرطان الدم الليمفاوي الحاد أو المزمن",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                }
              ]
            },
            {
              title: "Skin Cancer",
              translatedTitle: "سرطان الجلد",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                }
              ]
            },
            {
              optionTitle: "Other cancer/leukemia",
              translatedOptionTitle: "أنواع أخرى من السرطان/سرطان الدم",
              type: CheckBoxType.TYPE_TWO,
              label: "Specify Type",
              translatedLabel: "تحديد النوع"
            }
          ],
          isYesSelected: null,
          yesQuestions: null,
          noQuestions: null,
          answer: ""
        }
      ],
      noQuestions: null,
      answer: ""
    },
    {
      id: 8,
      question: "Red blood cell disease?",
      translatedQuestion: "مرض خلايا الدم الحمراء؟",
      inputType: InputType.YESANDNO,
      checkboxColumns: 1,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 81,
          question: "",
          translatedQuestion: "",
          inputType: InputType.MULTIPLE_CHECKBOX,
          checkboxColumns: 1,
          options: [
            {
              title: "Diamond-Blackfan Syndrome",
              translatedTitle: "",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "متلازمة دايموند بلاكفان",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Elliptocytosis",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "كثرة الكريات البيضاوية",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "G6PD or other red cell enzyme deficiency",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "G6PD أو نقص إنزيمات الخلايا الحمراء الأخرى",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Spherocytosis",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "كثرة الكريات الحمر",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            }
          ],
          isYesSelected: null,
          yesQuestions: null,
          noQuestions: null,
          answer: ""
        }
      ],
      noQuestions: null,
      answer: ""
    },
    {
      id: 9,
      question: "White blood cell disease?",
      translatedQuestion: "مرض الورم الحبيبي المزمن",
      inputType: InputType.YESANDNO,
      checkboxColumns: 1,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 91,
          question: "",
          translatedQuestion: "",
          inputType: InputType.MULTIPLE_CHECKBOX,
          checkboxColumns: 1,
          options: [
            {
              title: "Chronic Granulomatous Disease",
              translatedTitle: "متلازمة دايموند بلاكفان",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Kostmann Syndrome",
              translatedTitle: "متلازمة كوستمان",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Schwachman-Diamond Syndrome",
              translatedTitle: "متلازمة شواتشمان دايموند",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Leukocyte Adhesion Deficiency (LAD)",
              translatedTitle: "نقص التصاق الكريات البيض (LAD)",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            }
          ],
          isYesSelected: null,
          yesQuestions: null,
          noQuestions: null,
          answer: ""
        }
      ],
      noQuestions: null,
      answer: ""
    },
    {
      id: 10,
      question: "Immune deficiencies?",
      translatedQuestion: "نقص المناعة؟",
      inputType: InputType.YESANDNO,
      checkboxColumns: 1,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 101,
          question: "",
          translatedQuestion: "",
          inputType: InputType.MULTIPLE_CHECKBOX,
          checkboxColumns: 1,
          options: [
            {
              title: "ADA or PNP Deficiency",
              translatedTitle: "نقص ADA او PNP",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title:
                "Combined Immunodef Synd (CID), Common Variable Immunodef dse (CVID)",
              translatedTitle:
                "المتلازمة المناعية المركبة (CID)، والمتلازمة المناعية المتغيرة المشتركة (CVID)",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "DiGeorge Syndrome",
              translatedTitle: "متلازمة دي جورج",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title:
                "Hereditary Hemophagocytic Lymphohistiocytosis (HLH), including FEL",
              translatedTitle:
                "كثرة الكريات اللمفاوية الدموية الوراثية (HLH)، بما في ذلك FEL",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Hypoglobulinemia",
              translatedTitle: "نقص غلوبولين الدم",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Nezeloff Syndrome",
              translatedTitle: "متلازمة نيزيلوف",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Severe Combined Immunodeficiency (SCID)",
              translatedTitle: "نقص المناعة المشترك الشديد (SCID)",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            }
          ],
          isYesSelected: null,
          yesQuestions: null,
          noQuestions: null,
          answer: ""
        }
      ],
      noQuestions: null,
      answer: ""
    },
    {
      id: 11,
      question: "Platelet disease?",
      translatedQuestion: "مرض الصفائح الدموية؟",
      inputType: InputType.YESANDNO,
      checkboxColumns: 1,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 111,
          question: "",
          translatedQuestion: "",
          inputType: InputType.MULTIPLE_CHECKBOX,
          checkboxColumns: 1,
          options: [
            {
              title: "Amegakaryocytic Thrombocytopenia",
              translatedTitle: "نقص الصفيحات أميكاريوسيتيك",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Glanzmann Thrombasthenia",
              translatedTitle: "جلانزمان وهن الصفائح الدموية",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Hereditary Thrombocytopenia",
              translatedTitle: "نقص الصفيحات الوراثي",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Platelet Storage Pool Disease",
              translatedTitle: "مرض تجمع تخزين الصفائح الدموية",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Thrombocytopenia with absent radii (TAR)",
              translatedTitle: "نقص الصفيحات مع غياب نصف القطر (TAR)",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Ataxia-Telangiectasia",
              translatedTitle: "ترنح توسع الشعريات",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Fanconi Anemia",
              translatedTitle: "فقر الدم فانكوني",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            }
            // {
            //   optionTitle: "Other or unknown metabolic/storage disease",
            //   translatedOptionTitle: "أخرى أو غير معروف أو غير معرفة",
            //   type: CheckBoxType.TYPE_TWO,
            //   label: "Specify Type"
            // }
          ],
          isYesSelected: null,
          yesQuestions: null,
          noQuestions: null,
          answer: ""
        }
      ],
      noQuestions: null,
      answer: ""
    },
    {
      id: 12,
      question: "Other blood disease or disorder?",
      translatedQuestion: "أمراض الدم الأخرى أو اضطراب؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 121,
          question: "",
          translatedQuestion: "",
          inputType: InputType.CHECKBOX,
          isYesSelected: null,
          yesQuestions: null,
          options: [
            {
              optionTitle: "Baby’s Mother",
              translatedOptionTitle: "والدة الطفل"
            },
            {
              optionTitle: "Baby’s Father",
              translatedOptionTitle: "والد الطفل"
            },
            {
              optionTitle: "Baby’s Sibling",
              translatedOptionTitle: "شقيق الطفل",
              optionDescription: "(full or half brother or sister)",
              translatedOptionDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
            },
            {
              optionTitle: "BGP Baby’s Grandparent",
              translatedOptionTitle: "جد BGP الطفل",
              optionDescription: "(grandmother or grandfather)",
              translatedOptionDescription: "(الجدة أو الجد)"
            },
            {
              optionTitle: "Baby’s Mother’s Sibling",
              translatedOptionTitle: "شقيق والدة الطفل"
            },
            {
              optionTitle: "Baby’s Father’s Sibling",
              translatedOptionTitle: "شقيق والد الطفل"
            }
          ],
          checkboxColumns: 1,
          noQuestions: null,
          answer: ""
        }
      ],
      checkboxColumns: 1,
      noQuestions: null,
      answer: ""
    },
    {
      id: 13,
      question:
        "Sickle cell disease, such as sickle-cell anemia or sickle thalassemia?",
      translatedQuestion:
        "مرض فقر الدم المنجلي، مثل فقر الدم المنجلي أو الثلاسيميا المنجلية؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 131,
          question: "",
          translatedQuestion: "",
          inputType: InputType.CHECKBOX,
          isYesSelected: null,
          yesQuestions: null,
          options: [
            {
              optionTitle: "Baby’s Mother",
              translatedOptionTitle: "والدة الطفل"
            },
            {
              optionTitle: "Baby’s Father",
              translatedOptionTitle: "والد الطفل"
            },
            {
              optionTitle: "Baby’s Sibling",
              translatedOptionTitle: "شقيق الطفل",
              optionDescription: "(full or half brother or sister)",
              translatedOptionDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
            },
            {
              optionTitle: "BGP Baby’s Grandparent",
              translatedOptionTitle: "جد BGP الطفل",
              optionDescription: "(grandmother or grandfather)",
              translatedOptionDescription: "(الجدة أو الجد)"
            },
            {
              optionTitle: "Baby’s Mother’s Sibling",
              translatedOptionTitle: "شقيق والدة الطفل"
            },
            {
              optionTitle: "Baby’s Father’s Sibling",
              translatedOptionTitle: "شقيق والد الطفل"
            }
          ],
          checkboxColumns: 1,
          noQuestions: null,
          answer: ""
        }
      ],
      noQuestions: null,
      answer: ""
    },
    {
      id: 14,
      question: "Thalassemia, such as alpha thalassemia or beta-thalassemia?",
      translatedQuestion: "الثلاسيميا مثل ألفا ثلاسيميا أو بيتا ثلاسيميا؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 141,
          question: "",
          translatedQuestion: "",
          inputType: InputType.CHECKBOX,
          isYesSelected: null,
          yesQuestions: null,
          options: [
            {
              optionTitle: "Baby’s Mother",
              translatedOptionTitle: "والدة الطفل"
            },
            {
              optionTitle: "Baby’s Father",
              translatedOptionTitle: "والد الطفل"
            },
            {
              optionTitle: "Baby’s Sibling",
              translatedOptionTitle: "شقيق الطفل",
              optionDescription: "(full or half brother or sister)",
              translatedOptionDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
            },
            {
              optionTitle: "BGP Baby’s Grandparent",
              translatedOptionTitle: "جد BGP الطفل",
              optionDescription: "(grandmother or grandfather)",
              translatedOptionDescription: "(الجدة أو الجد)"
            },
            {
              optionTitle: "Baby’s Mother’s Sibling",
              translatedOptionTitle: "شقيق والدة الطفل"
            },
            {
              optionTitle: "Baby’s Father’s Sibling",
              translatedOptionTitle: "شقيق والد الطفل"
            }
          ],
          checkboxColumns: 1,
          noQuestions: null,
          answer: ""
        }
      ],
      checkboxColumns: 1,
      noQuestions: null,
      answer: ""
    },
    {
      id: 15,
      question: "Metabolic/storage disease?",
      translatedQuestion: "مرض التمثيل الغذائي / التخزين؟",
      inputType: InputType.YESANDNO,
      checkboxColumns: 1,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 151,
          question: "",
          translatedQuestion: "",
          inputType: InputType.MULTIPLE_CHECKBOX,
          checkboxColumns: 1,
          options: [
            {
              title: "Hurler Syndrome (MPS I)",
              translatedTitle: "متلازمة هيرلر (MPS I)",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Hurler-Scheie Syndrome (MPS I H-S)",
              translatedTitle: "متلازمة هيرلر-شي (MPS I HS)",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Hunter Syndrome (MPS II)",
              translatedTitle: "",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Sanfilippo Syndrome (MPS III)",
              translatedTitle: "متلازمة هنتر (MPS II)",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Morquio Syndrome (MPS IV)",
              translatedTitle: "متلازمة موركيو (MPS IV)",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Maroteaux-Lamy Syndrome (MPS VI)",
              translatedTitle: "متلازمة ماروتو لامي (MPS VI)",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Sly Syndrome (MPS VII)",
              translatedTitle: "متلازمة ماكر (MPS السابع)",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "I-cell disease",
              translatedTitle: "مرض الخلايا I",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Globoid Leukodystrophy (Krabbe Disease)",
              translatedTitle: "حثل المادة البيضاء الكروية (مرض كرابي)",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Metachromatic Leukodrstrophy (MLD)",
              translatedTitle: "حثل المادة البيضاء متبدل اللون (MLD)",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Adrenoleukodystrophy (ALD)",
              translatedTitle: "الحثل الكظري (ALD)",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Sandhoff Disease",
              translatedTitle: "مرض ساندهوف",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Tay-Sachs Disease.",
              translatedTitle: "مرض تاي ساكس.",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Gaucher Disease",
              translatedTitle: "مرض جوشر",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Niemann-Pick Disease",
              translatedTitle: "مرض نيمان بيك",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              title: "Porphyria",
              translatedTitle: "البورفيريا",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                },
                {
                  label: "Baby’s Father",
                  translatedLabel: "والد الطفل"
                },
                {
                  label: "Baby’s Sibling",
                  translatedLabel: "شقيق الطفل",
                  labelDescription: "(full or half brother or sister)",
                  translatedLabelDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
                },
                {
                  label: "BGP Baby’s Grandparent",
                  translatedLabel: "جد BGP الطفل",
                  labelDescription: "(grandmother or grandfather)",
                  translatedLabelDescription: "(الجدة أو الجد)"
                },
                {
                  label: "Baby’s Mother’s Sibling",
                  translatedLabel: "شقيق والدة الطفل"
                },
                {
                  label: "Baby’s Father’s Sibling",
                  translatedLabel: "شقيق والد الطفل"
                }
              ]
            },
            {
              optionTitle: "Other or unknown metabolic/storage disease",
              translatedOptionTitle:
                "أمراض التمثيل الغذائي / التخزين الأخرى أو غير المعروفة",
              type: CheckBoxType.TYPE_TWO,
              label: "Specify Type",
              translatedLabel: "تحديد النوع"
            }
          ],
          isYesSelected: null,
          yesQuestions: null,
          noQuestions: null,
          answer: ""
        }
      ],
      noQuestions: null,
      answer: ""
    },
    {
      id: 16,
      question: "HIV/AIDS?",
      translatedQuestion: "فيروس نقص المناعة البشرية / الإيدز؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 161,
          question: "",
          translatedQuestion: "",
          inputType: InputType.CHECKBOX,
          isYesSelected: null,
          yesQuestions: null,
          options: [
            {
              optionTitle: "Baby’s Mother",
              translatedOptionTitle: "والدة الطفل"
            },
            {
              optionTitle: "Baby’s Father",
              translatedOptionTitle: "والد الطفل"
            },
            {
              optionTitle: "Baby’s Sibling",
              translatedOptionTitle: "شقيق الطفل",
              optionDescription: "(full or half brother or sister)",
              translatedOptionDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
            }
          ],
          checkboxColumns: 1,
          noQuestions: null,
          answer: ""
        }
      ],
      noQuestions: null,
      answer: ""
    },
    {
      id: 17,
      question: "Severe autoimmune disorder?",
      translatedQuestion: "اضطراب المناعة الذاتية الشديد؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 171,
          question: "",
          translatedQuestion: "",
          inputType: InputType.MULTIPLE_CHECKBOX,
          checkboxColumns: 1,
          options: [
            {
              title: "Crohn’s Disease or Ulcerative Colitis",
              translatedTitle: "مرض كرون أو التهاب القولون التقرحي",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                }
              ]
            },
            {
              title: "Lupus",
              translatedTitle: "مرض الذئبة",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                }
              ]
            },
            {
              title: "Multiple Sclerosis (MS)",
              translatedTitle: "التصلب المتعدد (MS)",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                }
              ]
            },
            {
              title: "Rheumatoid Arthritis",
              translatedTitle: "التهاب المفصل الروماتويدي",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Baby’s Mother",
                  translatedLabel: "والدة الطفل"
                }
              ]
            }
          ],
          isYesSelected: null,
          yesQuestions: null,
          noQuestions: null,
          answer: ""
        }
      ],
      noQuestions: null,
      answer: ""
    },
    {
      id: 18,
      question: "Other or unknown immune system disorder?",
      translatedQuestion: "اضطراب آخر أو غير معروف في الجهاز المناعي؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 181,
          question: "",
          translatedQuestion: "",
          inputType: InputType.CHECKBOX,
          isYesSelected: null,
          yesQuestions: null,
          options: [
            {
              optionTitle: "Baby’s Mother",
              translatedOptionTitle: "والدة الطفل"
            },
            {
              optionTitle: "Baby’s Father",
              translatedOptionTitle: "والد الطفل"
            },
            {
              optionTitle: "Baby’s Sibling",
              translatedOptionTitle: "شقيق الطفل",
              optionDescription: "(full or half brother or sister)",
              translatedOptionDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
            }
          ],
          checkboxColumns: 1,
          noQuestions: null,
          answer: ""
        }
      ],
      noQuestions: null,
      answer: ""
    },
    {
      id: 19,
      question: "Required chronic blood transfusions?",
      translatedQuestion: "هل تحتاج إلى عمليات نقل دم مزمنة؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 191,
          question: "",
          translatedQuestion: "",
          inputType: InputType.CHECKBOX,
          isYesSelected: null,
          yesQuestions: null,
          options: [
            {
              optionTitle: "Baby’s Mother",
              translatedOptionTitle: "والدة الطفل"
            },
            {
              optionTitle: "Baby’s Father",
              translatedOptionTitle: "والد الطفل"
            },
            {
              optionTitle: "Baby’s Sibling",
              translatedOptionTitle: "شقيق الطفل",
              optionDescription: "(full or half brother or sister)",
              translatedOptionDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
            },
            {
              optionTitle: "BGP Baby’s Grandparent",
              translatedOptionTitle: "جد BGP الطفل",
              optionDescription: "(grandmother or grandfather)",
              translatedOptionDescription: "(الجدة أو الجد)"
            },
            {
              optionTitle: "Baby’s Mother’s Sibling",
              translatedOptionTitle: "شقيق والدة الطفل"
            },
            {
              optionTitle: "Baby’s Father’s Sibling",
              translatedOptionTitle: "شقيق والد الطفل"
            }
          ],
          checkboxColumns: 1,
          noQuestions: null,
          answer: ""
        }
      ],
      noQuestions: null,
      answer: ""
    },
    {
      id: 20,
      question: "Been told you or family member(s) have hemolytic anemia?",
      translatedQuestion:
        "هل تم إخبارك أو أحد أفراد أسرتك أنك تعاني من فقر الدم الانحلالي؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 201,
          question: "",
          translatedQuestion: "",
          inputType: InputType.CHECKBOX,
          isYesSelected: null,
          yesQuestions: null,
          options: [
            {
              optionTitle: "Baby’s Mother",
              translatedOptionTitle: "والدة الطفل"
            },
            {
              optionTitle: "Baby’s Father",
              translatedOptionTitle: "والد الطفل"
            },
            {
              optionTitle: "Baby’s Sibling",
              translatedOptionTitle: "شقيق الطفل",
              optionDescription: "(full or half brother or sister)",
              translatedOptionDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
            },
            {
              optionTitle: "BGP Baby’s Grandparent",
              translatedOptionTitle: "جد BGP الطفل",
              optionDescription: "(grandmother or grandfather)",
              translatedOptionDescription: "(الجدة أو الجد)"
            },
            {
              optionTitle: "Baby’s Mother’s Sibling",
              translatedOptionTitle: "شقيق والدة الطفل"
            },
            {
              optionTitle: "Baby’s Father’s Sibling",
              translatedOptionTitle: "شقيق والد الطفل"
            }
          ],
          checkboxColumns: 1,
          noQuestions: null,
          answer: ""
        }
      ],
      noQuestions: null,
      answer: ""
    },
    {
      id: 21,
      question: "Had spleen removed to treat a blood disorder?",
      translatedQuestion: "هل تمت إزالة الطحال لعلاج اضطراب في الدم؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 211,
          question: "",
          translatedQuestion: "",
          inputType: InputType.CHECKBOX,
          isYesSelected: null,
          yesQuestions: null,
          options: [
            {
              optionTitle: "Baby’s Mother",
              translatedOptionTitle: "والدة الطفل"
            },
            {
              optionTitle: "Baby’s Father",
              translatedOptionTitle: "والد الطفل"
            },
            {
              optionTitle: "Baby’s Sibling",
              translatedOptionTitle: "شقيق الطفل",
              optionDescription: "(full or half brother or sister)",
              translatedOptionDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
            },
            {
              optionTitle: "BGP Baby’s Grandparent",
              translatedOptionTitle: "جد BGP الطفل",
              optionDescription: "(grandmother or grandfather)",
              translatedOptionDescription: "(الجدة أو الجد)"
            },
            {
              optionTitle: "Baby’s Mother’s Sibling",
              translatedOptionTitle: "شقيق والدة الطفل"
            },
            {
              optionTitle: "Baby’s Father’s Sibling",
              translatedOptionTitle: "شقيق والد الطفل"
            }
          ],
          checkboxColumns: 1,
          noQuestions: null,
          answer: ""
        }
      ],
      noQuestions: null,
      answer: ""
    },
    {
      id: 22,
      question: "Had gallbladder removed before age 30?",
      translatedQuestion: "هل تم استئصال المرارة قبل سن الثلاثين؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 221,
          question: "",
          translatedQuestion: "",
          inputType: InputType.CHECKBOX,
          isYesSelected: null,
          yesQuestions: null,
          options: [
            {
              optionTitle: "Baby’s Mother",
              translatedOptionTitle: "والدة الطفل"
            },
            {
              optionTitle: "Baby’s Father",
              translatedOptionTitle: "والد الطفل"
            },
            {
              optionTitle: "Baby’s Sibling",
              translatedOptionTitle: "شقيق الطفل",
              optionDescription: "(full or half brother or sister)",
              translatedOptionDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
            },
            {
              optionTitle: "BGP Baby’s Grandparent",
              translatedOptionTitle: "جد BGP الطفل",
              optionDescription: "(grandmother or grandfather)",
              translatedOptionDescription: "(الجدة أو الجد)"
            },
            {
              optionTitle: "Baby’s Mother’s Sibling",
              translatedOptionTitle: "شقيق والدة الطفل"
            },
            {
              optionTitle: "Baby’s Father’s Sibling",
              translatedOptionTitle: "شقيق والد الطفل"
            }
          ],
          checkboxColumns: 1,
          noQuestions: null,
          answer: ""
        }
      ],
      noQuestions: null,
      answer: ""
    },
    {
      id: 23,
      question: "Had Creutzfeldt-Jakob disease (CJD)?",
      translatedQuestion: "هل كان لديك مرض كروتزفيلد جاكوب (CJD)؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 231,
          question: "",
          translatedQuestion: "",
          inputType: InputType.CHECKBOX,
          isYesSelected: null,
          yesQuestions: null,
          options: [
            {
              optionTitle: "Baby’s Mother",
              translatedOptionTitle: "والدة الطفل"
            },
            {
              optionTitle: "Baby’s Father",
              translatedOptionTitle: "والد الطفل"
            },
            {
              optionTitle: "Baby’s Sibling",
              translatedOptionTitle: "شقيق الطفل",
              optionDescription: "(full or half brother or sister)",
              translatedOptionDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
            },
            {
              optionTitle: "BGP Baby’s Grandparent",
              translatedOptionTitle: "جد BGP الطفل",
              optionDescription: "(grandmother or grandfather)",
              translatedOptionDescription: "(الجدة أو الجد)"
            },
            {
              optionTitle: "Baby’s Mother’s Sibling",
              translatedOptionTitle: "شقيق والدة الطفل"
            },
            {
              optionTitle: "Baby’s Father’s Sibling",
              translatedOptionTitle: "شقيق والد الطفل"
            }
          ],
          checkboxColumns: 1,
          noQuestions: null,
          answer: ""
        }
      ],
      checkboxColumns: 1,
      noQuestions: null,
      answer: ""
    },
    {
      id: 24,
      question:
        "Other serious or life-threatening diseases affecting the family?",
      translatedQuestion: "أمراض أخرى خطيرة أو مهددة للحياة تؤثر على الأسرة؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 241,
          question: "",
          translatedQuestion: "",
          inputType: InputType.CHECKBOX,
          isYesSelected: null,
          yesQuestions: null,
          options: [
            {
              optionTitle: "Baby’s Mother",
              translatedOptionTitle: "والدة الطفل"
            },
            {
              optionTitle: "Baby’s Father",
              translatedOptionTitle: "والد الطفل"
            },
            {
              optionTitle: "Baby’s Sibling",
              translatedOptionTitle: "شقيق الطفل",
              optionDescription: "(full or half brother or sister)",
              translatedOptionDescription: "(أخ أو أخت كاملة أو غير شقيقة)"
            },
            {
              optionTitle: "BGP Baby’s Grandparent",
              translatedOptionTitle: "جد BGP الطفل",
              optionDescription: "(grandmother or grandfather)",
              translatedOptionDescription: "(الجدة أو الجد)"
            },
            {
              optionTitle: "Baby’s Mother’s Sibling",
              translatedOptionTitle: "شقيق والدة الطفل"
            },
            {
              optionTitle: "Baby’s Father’s Sibling",
              translatedOptionTitle: "شقيق والد الطفل"
            }
          ],
          checkboxColumns: 1,
          noQuestions: null,
          answer: ""
        }
      ],
      noQuestions: null,
      answer: ""
    }
  ]
};

export const questionTwoSlice = createSlice({
  name: UPDATE_QUESTION_TWO_ANSWER,
  initialState,
  reducers: {
    updateQuestionsTwo: (state, action: PayloadAction<QuestionTwoType>) => {
      state.questionsTwo[action.payload.id - 1] = action.payload;
    },
    resetStateTwo: (state) => {
      return initialState;
    }
  }
});

// Action creators are generated for each case reducer function
export const { updateQuestionsTwo, resetStateTwo } = questionTwoSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default questionTwoSlice.reducer;
