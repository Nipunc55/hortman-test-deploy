export const expectedDeliveryQuestions = [
  {
    id: 1,
    index: 1,
    question: "Are you expecting twins or triplets?",
    questionType: "buttons",
    answerOptions: [
      {
        answer: "Yes",
        value: 1
      },
      {
        answer: "No",
        value: 0
      }
    ],
    isNested: true,
    nestedAnswer: 1,
    nestedQuestion: {
      question: "Please choose twins, triplets or more?",
      questionType: "buttons",
      answerOptions: [
        {
          answer: "Twins",
          value: 1
        },
        {
          answer: "Triplets",
          value: 2
        },
        {
          answer: "More",
          value: 3
        }
      ],
      isNested: true,
      nestedAnswer: 3,
      nestedQuestion: {
        question: "Please choose how many babies you are expecting?",
        questionType: "buttons",
        answerOptions: [
          {
            answer: "4",
            value: 4
          },
          {
            answer: "5",
            value: 5
          },
          {
            answer: "6",
            value: 6
          },
          {
            answer: "7",
            value: 7
          },
          {
            answer: "8",
            value: 8
          },
          {
            answer: "9",
            value: 9
          },
          {
            answer: "10",
            value: 10
          }
        ],
        isNested: false,
        nestedAnswer: 0,
        nestedQuestion: null
      }
    }
  }
];
