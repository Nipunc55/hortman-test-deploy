import {
  InputType,
  type QuestionType,
  UPDATE_QUESTION_ANSWER,
  type QuestionsInitialState
} from "../types/Questions";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { CheckBoxType } from "../types/QuestionsTwo";

const initialState: QuestionsInitialState = {
  questions: [
    {
      id: 1,
      question: "Are you currently taking an antibiotic?",
      translatedQuestion: "هل تتناول حاليًا مضادًا حيويًا؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 11,
          question: "please specify the name of the antibiotic:",
          translatedQuestion: "يرجى تحديد اسم المضاد الحيوي:",
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
      id: 2,
      question:
        "Are you currently taking any other medication for an infection? ",
      translatedQuestion: "هل تتناول حاليًا أي دواء آخر لعلاج العدوى؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 21,
          question: "please specify the name of the antibiotic:",
          translatedQuestion: "يرجى تحديد اسم المضاد الحيوي:",
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
      id: 3,
      question:
        "Are you now taking or have you ever taken any medications on the Medication List?",
      translatedQuestion:
        "هل تتناول الآن أو سبق لك تناول أي أدوية مدرجة في قائمة الأدوية؟",
      inputType: InputType.CHECKBOX,
      isYesSelected: null,
      yesQuestions: null,
      options: [
        {
          optionTitle: "Growth Hormone from Human Pituitary Glands",
          translatedOptionTitle: "الحيوانية البيطرية من الحيوانيات العمرية",
          optionDescription:
            "Used usually for children with delayed or impaired growth.",
          translatedOptionDescription:
            "يستخدم عادة للأطفال الذين يعانون من تأخر أو ضعف النمو."
        },
        {
          optionTitle: "Insulin from Cows (Bovine, or Beef, Insulin)",
          translatedOptionTitle:
            "الأنسولين من الأبقار (البقري، أو البقري، أو الأنسولين)",
          optionDescription: "Used to treat diabetes.",
          translatedOptionDescription: "يستخدم لعلاج مرض السكري."
        },
        {
          optionTitle: "Hepatitis B Immune Globulin",
          translatedOptionTitle: "التهاب الكبد B الجلوبيولين المناعي",
          optionDescription:
            "Given following an exposure to hepatitis B. NOTE: This is different from the hepatitis B vaccine, which is a series of 3 injections given over a 6-month period to prevent future infection from exposures to hepatitis B.",
          translatedOptionDescription:
            "يُعطى بعد التعرض لالتهاب الكبد B. ملحوظة: هذا يختلف عن لقاح التهاب الكبد B، وهو عبارة عن سلسلة من 3 حقن تُعطى على مدى 6 أشهر لمنع العدوى المستقبلية من التعرض لالتهاب الكبد B."
        },
        {
          optionTitle: "Unlicensed Vaccine",
          translatedOptionTitle: "لقاح غير مرخص",
          optionDescription: "Usually associated with research protocol.",
          translatedOptionDescription: "عادة ما يرتبط ببروتوكول البحث."
        },
        {
          optionTitle: "None of the above",
          translatedOptionTitle: "لا أي من الأعلى"
        }
      ],
      checkboxColumns: 1,
      noQuestions: null,
      answer: ""
    },
    {
      id: 4,
      question: "Have you read the educational materials?",
      translatedQuestion: "هل قرأت المواد التعليمية؟",
      inputType: InputType.CHECKBOX,
      isYesSelected: null,
      yesQuestions: null,
      options: [
        {
          optionTitle: "Yes, I have read the educational materials",
          translatedOptionTitle: "نعم، لقد قرأت المواد التعليمية"

          // optionDescription: "Yes, I have read the educational materials"
        }
      ],
      checkboxColumns: 1,
      noQuestions: null,
      answer: ""
    },
    {
      id: 5,
      question:
        "In the past 8 weeks, have you had any vaccinations or other shots?",
      translatedQuestion:
        "خلال الأسابيع الثمانية الماضية، هل حصلت على أي لقاحات أو جرعات أخرى؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 51,
          question: "Please specify the approximate date you were vaccinated",
          translatedQuestion: "يرجى تحديد التاريخ التقريبي لنقل الدم",
          inputType: InputType.DATE,
          isDateRangePast: true,
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
      question:
        "In the past 12 weeks, have you had contact with someone who had a smallpox vaccination?",
      translatedQuestion:
        "خلال الـ 12 أسبوعًا الماضية، هل كنت على اتصال بشخص حصل على تطعيم ضد الجدري؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 7,
      question:
        "In the past 12 months have you been told by a healthcare professional that you have West Nile Virus infection or any positive test for West Nile Virus?",
      translatedQuestion:
        "خلال الـ 12 شهرًا الماضية، هل أخبرك أحد أخصائيي الرعاية الصحية بأنك مصاب بعدوى فيروس غرب النيل أو أي اختبار إيجابي لفيروس غرب النيل؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 8,
      question: "In the past 12 months, have you had a blood transfusion?",
      translatedQuestion: "خلال الـ 12 شهرًا الماضية، هل أجريت عملية نقل دم؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 81,
          question: "please specify the approximate date of blood transfusion",
          translatedQuestion: "يرجى تحديد التاريخ التقريبي لنقل الدم",
          inputType: InputType.DATE,
          isDateRangePast: true,
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
      question:
        "In the past 12 months have you come into contact with someone else's blood?",
      translatedQuestion: "خلال الـ 12 شهرًا الماضية، هل لامست دم شخص آخر؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 91,
          question: "Please specify the approximate date of the incident",
          translatedQuestion: "يرجى تحديد التاريخ التقريبي للحادث",
          inputType: InputType.DATE,

          isDateRangePast: true,
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
      question:
        "In the past 12 months have you had an accidental needle-stick?",
      translatedQuestion:
        "خلال الـ 12 شهرًا الماضية، هل تعرضت لوخز إبرة عرضيًا؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 101,
          question: "Please specify the approximate date of the incident",
          translatedQuestion: "يرجى تحديد التاريخ التقريبي للحادث",
          inputType: InputType.DATE,
          isDateRangePast: true,
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
      question:
        "In the past 12 months have you had a transplant or graft from someone other than yourself, such as organ, bone marrow, stem cell, cornea, sclera, bone, skin, or other tissue?",
      translatedQuestion:
        "خلال الـ 12 شهرًا الماضية، هل أجريت لك عملية زرع أو طعم من شخص آخر غيرك، مثل عضو أو نخاع عظمي أو خلية جذعية أو قرنية أو صلبة أو عظم أو جلد أو أنسجة أخرى؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 12,
      question:
        "In the past 12 months have you had sexual contact with anyone who has HIV/AIDS or has had a positive test for the HIV/AIDS virus?",
      translatedQuestion:
        "خلال الـ 12 شهرًا الماضية، هل قمت باتصال جنسي مع أي شخص مصاب بفيروس نقص المناعة البشرية/الإيدز أو كانت نتيجة اختبار فيروس نقص المناعة البشرية/الإيدز إيجابية؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 13,
      question:
        "In the past 12 months have you had sexual contact with a prostitute or anyone else who takes money or drugs or other payment for sex?",
      translatedQuestion:
        "خلال الـ 12 شهرًا الماضية، هل قمت باتصال جنسي مع أي شخص مصاب بفيروس نقص المناعة البشرية/الإيدز أو كانت نتيجة اختبار فيروس نقص المناعة البشرية/الإيدز إيجابية؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 14,
      question:
        "In the past 12 months have you had sexual contact with anyone who has ever used needles to take drugs or steroids, or anything not prescribed by their doctor?",
      translatedQuestion:
        "خلال الـ 12 شهرًا الماضية، هل مارست اتصالًا جنسيًا مع أي شخص استخدم الإبر لتعاطي المخدرات أو المنشطات، أو أي شيء لم يصفه الطبيب؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 15,
      question:
        "In the past 12 months have you had sexual contact with a male who has ever had sexual contact with another male?",
      translatedQuestion:
        "خلال الـ 12 شهرًا الماضية، هل مارست اتصالًا جنسيًا مع ذكر سبق له أن مارس اتصالًا جنسيًا مع ذكر آخر؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 16,
      question:
        "In the past 12 months have you had sexual contact with a person who has hepatitis?",
      translatedQuestion:
        "خلال الـ 12 شهرًا الماضية، هل مارست اتصالًا جنسيًا مع شخص مصاب بالتهاب الكبد الوبائي؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 17,
      question:
        "In the past 12 months have you lived with a person who has hepatitis?",
      translatedQuestion:
        "هل عشت خلال الـ 12 شهرًا الماضية مع شخص مصاب بالتهاب الكبد؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 18,
      question: "In the past 12 months have you had a tattoo?",
      translatedQuestion: "خلال الـ 12 شهرًا الماضية، هل كان لديك وشم؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 19,
      question: "In the past 12 months have you had ear or body piercing?",
      translatedQuestion:
        "خلال الـ 12 شهرًا الماضية، هل خضعت لثقب في الأذن أو الجسم؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 191,
          question: "please specify the approximate date",
          translatedQuestion: "يرجى تحديد التاريخ المعياري",
          inputType: InputType.DATE,
          isDateRangePast: true,
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
      id: 20,
      question:
        "In the past 12 months have you had or been treated for syphilis or other sexually transmitted infections?",
      translatedQuestion:
        "خلال الـ 12 شهرًا الماضية، هل أُصبت أو عولجت من مرض الزهري أو غيره من الأمراض المنقولة جنسيًا؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 21,
      question:
        "In the past 12 months have you been in juvenile detention, lockup, jail, or prison for more than 72 hours?",
      translatedQuestion:
        "خلال الـ 12 شهرًا الماضية، هل كنت في مركز احتجاز الأحداث أو الحبس أو السجن أو السجن لأكثر من 72 ساعة؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 22,
      question:
        "In the past 3 years, have you been outside the United Arab Emirates?",
      translatedQuestion:
        "خلال السنوات الثلاث الماضية، هل كنت خارج دولة الإمارات العربية المتحدة؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 221,
          question: "please specify the name of the countries ",
          translatedQuestion: "يرجى تحديد اسم الدول",
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
      id: 23,
      question:
        "In the past 5 years have you received money, drugs, or other payment for sex?",
      translatedQuestion:
        "في السنوات الخمس الماضية، هل تلقيت أموالاً أو مخدرات أو أي مدفوعات أخرى مقابل ممارسة الجنس؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 24,
      question:
        "In the past 5 years, have you used needles to take drugs, steroids, or anything not prescribed by your doctor?",
      translatedQuestion:
        "في السنوات الخمس الماضية، هل استخدمت الإبر لتناول الأدوية أو المنشطات أو أي شيء لم يصفه طبيبك؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 25,
      question:
        "From 1980 through 1996 did you spend time that adds up to three (3) months or more in the United Kingdom? (Review list of countries in the UK)",
      translatedQuestion:
        "من عام 1980 حتى عام 1996، هل قضيت وقتًا يصل إلى ثلاثة (3) أشهر أو أكثر في المملكة المتحدة؟ (مراجعة قائمة الدول في المملكة المتحدة)",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 251,
          question: "Please specify by choosing from the list of countries.",
          translatedQuestion: "يرجى تحديد من قائمة الدول.",
          inputType: InputType.CHECKBOX,
          isYesSelected: null,
          checkboxColumns: 2,
          options: [
            {
              optionTitle: "England",
              translatedOptionTitle: "انجلترا"
            },
            {
              optionTitle: "Scotland",
              translatedOptionTitle: "اسكتلندا"
            },
            {
              optionTitle: "Isle of Man",
              translatedOptionTitle: "ايسل من"
            },
            {
              optionTitle: "Gibraltar",
              translatedOptionTitle: "جبل طارق"
            },
            {
              optionTitle: "Northern Ireland",
              translatedOptionTitle: "جزر النائرلاند"
            },
            {
              optionTitle: "Wales",
              translatedOptionTitle: "ويلز"
            },
            {
              optionTitle: "Channel Islands",
              translatedOptionTitle: "جزر القناعات"
            },
            {
              optionTitle: "Falkland Islands",
              translatedOptionTitle: "جزر فوكلاند"
            }
          ],
          yesQuestions: null,
          noQuestions: null,
          answer: ""
        }
      ],
      noQuestions: null,
      answer: ""
    },
    {
      id: 26,
      question:
        "From 1980 to the present did you spend time that adds up to five (5) years or more in Europe? (Review list of countries in Europe.*)",
      translatedQuestion:
        "منذ عام 1980 وحتى الوقت الحاضر، هل قضيت وقتًا يصل إلى خمس (5) سنوات أو أكثر في أوروبا؟ (مراجعة قائمة الدول في أوروبا.*)",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 261,
          question: "",
          inputType: InputType.CHECKBOX,
          isYesSelected: null,
          checkboxColumns: 3,
          options: [
            {
              optionTitle: "Albania",
              translatedOptionTitle: "البانيا"
            },
            {
              optionTitle: "Norway",
              translatedOptionTitle: "النرويج"
            },
            {
              optionTitle: "Finland",
              translatedOptionTitle: "فنلندا"
            },
            {
              optionTitle: "Luxembourg",
              translatedOptionTitle: "لوكسمبورغ"
            },
            {
              optionTitle: "Croatia",
              translatedOptionTitle: "كرواتيا"
            },
            {
              optionTitle: "Serbia",
              translatedOptionTitle: "صربيا"
            },
            {
              optionTitle: "Austria",
              translatedOptionTitle: "النمسا"
            },
            {
              optionTitle: "France",
              translatedOptionTitle: "فرنسا"
            },
            {
              optionTitle: "Macedonia",
              translatedOptionTitle: "مقدونيا"
            },
            {
              optionTitle: "Poland",
              translatedOptionTitle: "بولندا"
            },
            {
              optionTitle: "Slovak Republic",
              translatedOptionTitle: "جمهورية سلوفاكيا"
            },
            {
              optionTitle: "Belgium",
              translatedOptionTitle: "بلجيكا"
            },
            {
              optionTitle: "Czech Republic",
              translatedOptionTitle: "جمهورية التشيك"
            },
            {
              optionTitle: "Germany",
              translatedOptionTitle: "ألمانيا"
            },
            {
              optionTitle: "Montenegro",
              translatedOptionTitle: "الجبل الأسود"
            },
            {
              optionTitle: "Portugal",
              translatedOptionTitle: "البرتغال"
            },
            {
              optionTitle: "Slovenia",
              translatedOptionTitle: "سلوفينيا"
            },
            {
              optionTitle: "Bosnia-Herzegovina",
              translatedOptionTitle: "البوسنة والهرسك"
            },
            {
              optionTitle: "Greece",
              translatedOptionTitle: "اليونان"
            },
            {
              optionTitle: "Netherlands",
              translatedOptionTitle: "هولندا"
            },
            {
              optionTitle: "Denmark",
              translatedOptionTitle: "الدنمارك"
            },
            {
              optionTitle: "Spain",
              translatedOptionTitle: "إسبانيا"
            },
            {
              optionTitle: "Bulgaria",
              translatedOptionTitle: "بلغاريا"
            },
            {
              optionTitle: "Romania",
              translatedOptionTitle: "رومانيا"
            },
            {
              optionTitle: "Hungary",
              translatedOptionTitle: "هنغاريا"
            },
            {
              optionTitle: "United Kingdom",
              translatedOptionTitle: "المملكة المتحدة"
            },
            {
              optionTitle: "Ireland",
              translatedOptionTitle: "أيرلندا"
            },
            {
              optionTitle: "Sweden",
              translatedOptionTitle: "السويد"
            },
            {
              optionTitle: "Liechtenstein",
              translatedOptionTitle: "ليختنشتاين"
            },
            {
              optionTitle: "Switzerland",
              translatedOptionTitle: "سويسرا"
            },
            {
              optionTitle: "Yugoslavia",
              translatedOptionTitle: "يوغوسلافيا"
            },
            {
              optionTitle: "Italy",
              translatedOptionTitle: "إيطاليا"
            }
          ],
          yesQuestions: null,
          noQuestions: null,
          answer: ""
        }
      ],
      noQuestions: null,
      answer: ""
    },
    {
      id: 27,
      question:
        "From 1980 to the present, did you receive a transfusion of blood or blood components in the United Kingdom or France?",
      translatedQuestion:
        "منذ عام 1980 وحتى الوقت الحاضر، هل أجريت عملية نقل دم أو مكونات الدم في المملكة المتحدة أو فرنسا؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 28,
      question: "Have you ever had any positive test for the HIV/AIDS?",
      translatedQuestion:
        "هل سبق أن أجريت أي اختبار إيجابي لفيروس نقص المناعة البشرية/الإيدز؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 29,
      question:
        "Have you ever had hepatitis, or any positive test for hepatitis?",
      translatedQuestion:
        "هل سبق أن أصبت بالتهاب الكبد، أو أي اختبار إيجابي لالتهاب الكبد؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 291,
          question: "Please specify the type of Hepatitis infection",
          inputType: InputType.CHECKBOX,
          isYesSelected: null,
          checkboxColumns: 2,
          options: [
            {
              optionTitle: "Hepatitis A",
              translatedOptionTitle: "التهاب الكبد A"
            },
            {
              optionTitle: "Hepatitis B",
              translatedOptionTitle: "التهاب الكبد B"
            },
            {
              optionTitle: "Hepatitis C",
              translatedOptionTitle: "التهاب الكبد C"
            },
            {
              optionTitle: "Hepatitis D",
              translatedOptionTitle: "التهاب الكبد D"
            },
            {
              optionTitle: "Hepatitis E",
              translatedOptionTitle: "التهاب الكبد E"
            }
          ],
          yesQuestions: null,
          noQuestions: null,
          answer: ""
        }
      ],
      noQuestions: null,
      answer: ""
    },
    {
      id: 30,
      question: "Have you ever had malaria?",
      translatedQuestion: "هل سبق لك أن أصبت بالملاريا؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 31,
      question:
        "Have you ever Had Chagas disease and/or any positive test for T. cruzi?",
      translatedQuestion:
        "هل سبق أن أُصبت بمرض شاغاس و/أو أي اختبار إيجابي للمثقبية الكروزية؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 32,
      question: "Have you ever had babesiosis?",
      translatedQuestion: "هل سبق أن أصبت بداء البابيزيا؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 33,
      question:
        "Have you ever received a dura mater (or brain covering) graft?",
      translatedQuestion:
        "هل سبق لك أن تلقيت طعمًا من الأم الجافية (أو غطاء الدماغ)؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 34,
      question:
        "Have you ever had sexual contact with anyone who was born in or lived in Africa?",
      translatedQuestion:
        "هل سبق لك أن مارست أي اتصال جنسي مع أي شخص ولد في أفريقيا أو عاش فيها؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 35,
      question: "Have you ever been in Africa?",
      translatedQuestion: "هل سبق لك أن كنت في أفريقيا؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 351,
          question: "please specify the name of the countries ",
          translatedQuestion: "يرجى تحديد اسم الدول",
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
      id: 36,
      question: "Have you ever been diagnosed with any neurological disease?",
      translatedQuestion: "هل سبق أن تم تشخيص إصابتك بأي مرض عصبي؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 401,
          question: "please specify the relation ",
          translatedQuestion: "يرجى تحديد العلاقة",
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
      id: 37,
      question:
        "Have you ever had a transplant or other medical procedure that involved being exposed to live cells, tissues, or organs from an animal?",
      translatedQuestion:
        "هل سبق لك أن خضعت لعملية زرع أو أي إجراء طبي آخر يتضمن التعرض لخلايا أو أنسجة أو أعضاء حية من حيوان؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 38,
      question:
        "Have you ever tested positive for HTLV, had adult T-cell leukaemia, or had unexplained paraparesis (partial paralysis affecting the lower limbs)?",
      translatedQuestion:
        "هل سبق لك أن أثبتت نتيجة اختبار HTLV أنك مصاب بسرطان الدم في الخلايا التائية البالغة، أو كنت مصابًا بالشلل النصفي غير المبرر (شلل جزئي يؤثر على الأطراف السفلية)؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 39,
      question:
        "Has your sexual partner or a member of your household ever had a transplant or other medical procedure that involved being exposed to live cells, tissues, or organs from an animal?",
      translatedQuestion:
        "هل سبق أن خضع شريكك الجنسي أو أحد أفراد أسرتك لعملية زرع أو أي إجراء طبي آخر يتضمن التعرض لخلايا أو أنسجة أو أعضاء حية من حيوان؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 40,
      question:
        "Have any of your relative, the baby’s father or any of the baby’s relative ever had Creutzfeldt-Jakob disease?",
      translatedQuestion:
        "هل أصيب أي من أقاربك أو والد الطفل أو أي من أقارب الطفل بمرض كروتزفيلد جاكوب؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 401,
          question: "please specify the relation ",
          translatedQuestion: "يرجى تحديد العلاقة",
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
      id: 41,
      question:
        "Have you ever been deferred from blood donation? If yes, please state why?",
      translatedQuestion:
        "هل سبق لك أن تم تأجيل التبرع بالدم؟ إذا كانت الإجابة بنعم، يرجى ذكر السبب؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 411,
          question: "Please specify the reason for the deferral",
          translatedQuestion: "يرجى تحديد السبب للتأجيل",
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
      id: 42,
      question: "Have you ever been diagnosed with these disease(s)?",
      translatedQuestion: "هل سبق أن تم تشخيص إصابتك بهذه الأمراض؟",
      subQuestion: "(Select what is applicable in each section)",
      translatedSubQuestion: "(اختر ما ينطبق في كل قسم)",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: [
        {
          id: 421,
          question: "",
          translatedQuestion: "",
          inputType: InputType.MULTIPLE_CHECKBOX,
          checkboxColumns: 1,
          options: [
            {
              title: "Section 1: Cancer",
              translatedTitle: "السرطان",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Brain or nervous system cancer",
                  translatedLabel: "سرطان الدماغ أو الجهاز العصبي"
                },
                {
                  label: "Bone or joint cancer",
                  translatedLabel: "سرطان العظام أو المفاصل"
                },
                {
                  label: "Thyroid cancer",
                  translatedLabel: "سرطان الغدة الدرقية"
                },
                {
                  label: "Skin cancer",
                  translatedLabel: "سرطان الجلد"
                },
                {
                  label: "Non-Hodgkin’s Lymphoma",
                  translatedLabel: "لمفوما غير هودجكين"
                },
                {
                  label: "Acute Myelogenous / Myeloid Leukaemia",
                  translatedLabel: "لوكيميا نقوية حادة / ميلويد"
                },
                {
                  label: "Acute Lymphocytic / Lymphoblastic Leukaemia",
                  translatedLabel: "لوكيميا ليمفوسايتية حادة / ليمفوبلاستية"
                },
                {
                  label: "Any other cancer? Please specify",
                  translatedLabel: "هل هناك أي نوع آخر من السرطان؟ يرجى التحديد"
                }
              ]
            },
            {
              title: "Section 2: Hereditary Blood Disorders",
              translatedTitle: "العلاجات الدمية الحيوية السريرية",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Red Blood Cell Disorders",
                  translatedLabel: "اضطرابات خلايا الدم الحمراء"
                },
                {
                  label: "Thalassaemia",
                  translatedLabel: "الثلاسيميا"
                },
                {
                  label: "Sickle-Cell Anaemia",
                  translatedLabel: "فقر الدم المنجلي"
                },
                {
                  label: "Any other Haemoglobinopathies?",
                  translatedLabel: "هل هناك أمراض الهيموجلوبين الأخرى؟"
                },
                {
                  label: "White Blood Cell Disorders",
                  translatedLabel: "اضطرابات خلايا الدم البيضاء"
                },
                {
                  label: "Platelet Disorders",
                  translatedLabel: "اضطرابات الصفائح الدموية"
                }
              ]
            },
            {
              title: "Section 3: Immune System Disorders",
              translatedTitle: "اضطرابات الجهاز المناعي",
              type: CheckBoxType.TYPE_ONE,
              optionTitle: "",
              options: [
                {
                  label: "Immune Deficiencies",
                  translatedLabel: "نقص المناعة"
                },
                {
                  label: "Auto-Immune Disorders",
                  translatedLabel: "اضطرابات المناعة الذاتية"
                }
              ]
            },
            {
              title: "Section 4: Neurological Disorders",
              optionTitle: "Section 4: Neurological Disorders",
              translatedOptionTitle: "الاضطرابات العصبية",
              type: CheckBoxType.TYPE_TWO,
              label: "Please Specify",
              translatedLabel: "يرجى تحديد السبب"
            },
            {
              title: "Section 5: Metabolic Genetic Disorders",
              optionTitle: "Section 5: Metabolic Genetic Disorders",
              translatedOptionTitle: "الاضطرابات الوراثية الأيضية",
              type: CheckBoxType.TYPE_TWO,
              label: "Please Specify",
              translatedLabel: "يرجى تحديد السبب"
            },
            {
              title: "Section 6: Any other genetic (hereditary) disorders?",
              optionTitle:
                "Section 6: Any other genetic (hereditary) disorders?",
              translatedOptionTitle: "هل هناك اضطرابات وراثية (وراثية) أخرى؟",
              type: CheckBoxType.TYPE_TWO,
              label: "Please Specify",
              translatedLabel: "يرجى تحديد السبب"
            },
            {
              title: "",
              optionTitle: "",
              type: CheckBoxType.TYPE_THREE,
              label: "None of the above",
              translatedLabel: "يرجى تحديد السبب"
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
      id: 43,
      question:
        "At any point during the pregnancy have you had a medical diagnosis of a Zika virus infection?",
      translatedQuestion:
        "هل تم تشخيص إصابتك بفيروس زيكا في أي وقت خلال فترة الحمل؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 44,
      question:
        "At any point during the pregnancy have you lived in or travelled to an area with active Zika virus transmission?",
      translatedQuestion:
        "في أي وقت خلال فترة الحمل، هل عشت أو سافرت إلى منطقة تشهد انتقالًا نشطًا لفيروس زيكا؟",
      inputType: InputType.YESANDNO,
      externalLinkDescription:
        "For more information on travelled countries, please refer",
      translatedExternalLinkDescription:
        "لمزيد من المعلومات حول البلدان التي سافرت إليها، يرجى الرجوع",
      externalLink: "https://www.cdc.gov/zika/index.html",
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    },
    {
      id: 45,
      question:
        "At any time during the pregnancy have you had sexual contact with a person who, in the 6 months prior to sexual contact, has had a Zika virus infection or lived in or traveled to an area with an increased risk for Zika virus transmission?",
      translatedQuestion:
        "في أي وقت خلال فترة الحمل، هل مارست اتصالًا جنسيًا مع شخص أصيب بعدوى فيروس زيكا خلال الأشهر الستة السابقة للاتصال الجنسي أو عاش أو سافر إلى منطقة بها خطر متزايد لانتقال فيروس زيكا؟",
      inputType: InputType.YESANDNO,
      isYesSelected: null,
      yesQuestions: null,
      noQuestions: null,
      answer: ""
    }
  ]
};

export const questionSlice = createSlice({
  name: UPDATE_QUESTION_ANSWER,
  initialState,
  reducers: {
    updateQuestions: (state, action: PayloadAction<QuestionType>) => {
      state.questions[action.payload.id - 1] = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { updateQuestions } = questionSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default questionSlice.reducer;
