import { StatusType } from "../../../types/DonorApplications";
import { access, status } from "../../../types/userTypes";
import {
  ArticleImage1,
  ArticleImage2,
  ArticleImage3,
  ArticleImage4,
  ArticleImage5
} from "../dummyImages";

export const dummyEducationalMaterialRowData = [
  {
    articleId: "15 Benefits of Stem Cells: Explained (2023)",
    title: "15 Benefits of Stem Cells: Explained (2023)",
    author: "Admin",
    category: "Article",
    publishedDate: "2023/06/02 ",
    publishedTime: "at 7:54 am",
    articleDate: "May 25, 2023",
    articleImage: ArticleImage1,
    articleImageDescription:
      "Stem cells have been the focus of medical researchers for years, bringing hope to numerous patients with chronic conditions. Before diving into the benefits of stem cells, it's essential to understand their distinct characteristics and origins.",
    articleTitle: "15 Benefits of Stem Cells",
    articleParagraph1:
      "Stem cells are unique cells in our bodies that possess two key traits: the capacity to self-renew, producing more stem cells, and the potential to differentiate, becoming other types of specialized cells. These properties make them invaluable in the medical field. They allow us to understand diseases better, develop new, effective drugs, and create cell-based therapies for various conditions.",
    articleParagraph2:
      "From regenerating damaged tissues, treating blood disorders, and combating neurodegenerative diseases to potentially reversing the aging process and addressing infertility, the benefits of stem cells span a wide array of medical applications. Their potential to revolutionize medicine and significantly improve human health is immense and continues to inspire extensive research.",
    pointOne:
      "Regeneration of Tissue: Stem cells have the unique ability to replace damaged tissues. This regeneration capacity has tremendous therapeutic potential for injuries and diseases that lead to tissue damage or loss, such as heart disease, spinal cord injury, or burns.",
    pointTwo:
      "Treatment of Blood Disorders: Stem cells are crucial in treating leukemia and lymphoma. Through bone marrow transplants, healthy stem cells replace the patient's diseased cells, often leading to a cure or significant improvement in the patient's health.",
    pointThree:
      "Neurological Disease Treatment: Stem cells provide new avenues for treating neurodegenerative diseases like Alzheimer's or Parkinson's. The patient's cognitive functions and motor skills can be improved by replacing damaged neural cells.",
    pointFour:
      "Drug Development: Stem cells allow scientists to test new drugs for safety and effectiveness. For instance, heart cells derived from stem cells can be used to test potential drugs for heart disease, decreasing the reliance on animal testing and improving drug development efficiency.",
    pointFive:
      "Understanding Disease Progression: Disease modeling with stem cells gives researchers a better understanding of how diseases develop and progress, providing vital insights for developing new therapeutic strategies.",
    pointSix:
      "Reversing Aging: Preliminary research suggests that stem cells could be used to reverse the aging process. By replenishing aged or damaged cells, stem cells might contribute to healthier, longer lives.",
    pointSeven:
      "Genetic Disorders: Stem cells can be genetically modified to correct defects, offering the potential for treating genetic disorders like cystic fibrosis or muscular dystrophy.",
    pointEight:
      "Tissue Engineering: Stem cells can be used to grow new organs or tissues in the lab, reducing the dependency on organ donations and the risk of organ rejection.",
    pointNine:
      "Fighting Cancer: Stem cell therapies may boost the body's immune response to cancer, improving patient treatment outcomes.",
    pointTen:
      "Treatment of Autoimmune Diseases: By resetting the immune system, stem cell therapy has shown promise in treating autoimmune diseases such as multiple sclerosis and lupus, offering hope to patients with these chronic conditions.",
    pointEleven:
      "Diabetes Treatment: For type 1 diabetes, where the body's immune system destroys insulin-producing cells, stem cells offer the potential to create new insulin-producing cells, improving or potentially curing the disease.",
    pointTwelve:
      "Stem Cells in Eye Health: Stem cells hold promise in treating diseases that cause vision loss, like macular degeneration, by replacing the damaged cells in the retina.",
    pointThirteen:
      "Liver Disease Treatment: Stem cells can potentially regenerate damaged liver tissue, offering a new approach to treating liver diseases like cirrhosis.",
    pointFourteen:
      "Addressing Infertility: Stem cells could be used to create sperm or egg cells, offering new treatment possibilities for infertility.Reducing Organ Transplant",
    pointFifteen:
      "Rejections: When organs are grown from the recipient's own stem cells, it reduces the risk of rejection since the organ is not foreign to the body, improving transplant success rates and patient outcomes."
  },
  {
    articleId: "Stem Cell Therapy for Damaged Lungs",
    title: "Stem Cell Therapy for Damaged Lungs",
    author: "Admin",
    category: "Video",
    publishedDate: "2023/06/02",
    publishedTime: "at 7:54 am",
    articleDate: "June 25, 2023",
    articleImage: ArticleImage2,
    articleImageDescription:
      "Stem cells have been the focus of medical researchers for years, bringing hope to numerous patients with chronic conditions. Before diving into the benefits of stem cells, it's essential to understand their distinct characteristics and origins.",
    articleTitle: "15 Benefits of Stem Cells",
    articleParagraph1:
      "Stem cells are unique cells in our bodies that possess two key traits: the capacity to self-renew, producing more stem cells, and the potential to differentiate, becoming other types of specialized cells. These properties make them invaluable in the medical field. They allow us to understand diseases better, develop new, effective drugs, and create cell-based therapies for various conditions.",
    articleParagraph2:
      "From regenerating damaged tissues, treating blood disorders, and combating neurodegenerative diseases to potentially reversing the aging process and addressing infertility, the benefits of stem cells span a wide array of medical applications. Their potential to revolutionize medicine and significantly improve human health is immense and continues to inspire extensive research.",
    pointOne:
      "Regeneration of Tissue: Stem cells have the unique ability to replace damaged tissues. This regeneration capacity has tremendous therapeutic potential for injuries and diseases that lead to tissue damage or loss, such as heart disease, spinal cord injury, or burns.",
    pointTwo:
      "Treatment of Blood Disorders: Stem cells are crucial in treating leukemia and lymphoma. Through bone marrow transplants, healthy stem cells replace the patient's diseased cells, often leading to a cure or significant improvement in the patient's health.",
    pointThree:
      "Neurological Disease Treatment: Stem cells provide new avenues for treating neurodegenerative diseases like Alzheimer's or Parkinson's. The patient's cognitive functions and motor skills can be improved by replacing damaged neural cells.",
    pointFour:
      "Drug Development: Stem cells allow scientists to test new drugs for safety and effectiveness. For instance, heart cells derived from stem cells can be used to test potential drugs for heart disease, decreasing the reliance on animal testing and improving drug development efficiency.",
    pointFive:
      "Understanding Disease Progression: Disease modeling with stem cells gives researchers a better understanding of how diseases develop and progress, providing vital insights for developing new therapeutic strategies.",
    pointSix:
      "Reversing Aging: Preliminary research suggests that stem cells could be used to reverse the aging process. By replenishing aged or damaged cells, stem cells might contribute to healthier, longer lives.",
    pointSeven:
      "Genetic Disorders: Stem cells can be genetically modified to correct defects, offering the potential for treating genetic disorders like cystic fibrosis or muscular dystrophy.",
    pointEight:
      "Tissue Engineering: Stem cells can be used to grow new organs or tissues in the lab, reducing the dependency on organ donations and the risk of organ rejection.",
    pointNine:
      "Fighting Cancer: Stem cell therapies may boost the body's immune response to cancer, improving patient treatment outcomes.",
    pointTen:
      "Treatment of Autoimmune Diseases: By resetting the immune system, stem cell therapy has shown promise in treating autoimmune diseases such as multiple sclerosis and lupus, offering hope to patients with these chronic conditions.",
    pointEleven:
      "Diabetes Treatment: For type 1 diabetes, where the body's immune system destroys insulin-producing cells, stem cells offer the potential to create new insulin-producing cells, improving or potentially curing the disease.",
    pointTwelve:
      "Stem Cells in Eye Health: Stem cells hold promise in treating diseases that cause vision loss, like macular degeneration, by replacing the damaged cells in the retina.",
    pointThirteen:
      "Liver Disease Treatment: Stem cells can potentially regenerate damaged liver tissue, offering a new approach to treating liver diseases like cirrhosis.",
    pointFourteen:
      "Addressing Infertility: Stem cells could be used to create sperm or egg cells, offering new treatment possibilities for infertility.Reducing Organ Transplant",
    pointFifteen:
      "Rejections: When organs are grown from the recipient's own stem cells, it reduces the risk of rejection since the organ is not foreign to the body, improving transplant success rates and patient outcomes."
  },
  {
    articleId: "Stem cell treatment for Crohn’s Disease: A Case Study",
    title: "Stem cell treatment for Crohn’s Disease: A Case Study",
    author: "Admin",
    category: "Article",
    publishedDate: "2023/06/02",
    publishedTime: "at 7:54 am",
    articleDate: "July 25, 2023",
    articleImage: ArticleImage3,
    articleImageDescription:
      "Stem cells have been the focus of medical researchers for years, bringing hope to numerous patients with chronic conditions. Before diving into the benefits of stem cells, it's essential to understand their distinct characteristics and origins.",
    articleTitle: "15 Benefits of Stem Cells",
    articleParagraph1:
      "Stem cells are unique cells in our bodies that possess two key traits: the capacity to self-renew, producing more stem cells, and the potential to differentiate, becoming other types of specialized cells. These properties make them invaluable in the medical field. They allow us to understand diseases better, develop new, effective drugs, and create cell-based therapies for various conditions.",
    articleParagraph2:
      "From regenerating damaged tissues, treating blood disorders, and combating neurodegenerative diseases to potentially reversing the aging process and addressing infertility, the benefits of stem cells span a wide array of medical applications. Their potential to revolutionize medicine and significantly improve human health is immense and continues to inspire extensive research.",
    pointOne:
      "Regeneration of Tissue: Stem cells have the unique ability to replace damaged tissues. This regeneration capacity has tremendous therapeutic potential for injuries and diseases that lead to tissue damage or loss, such as heart disease, spinal cord injury, or burns.",
    pointTwo:
      "Treatment of Blood Disorders: Stem cells are crucial in treating leukemia and lymphoma. Through bone marrow transplants, healthy stem cells replace the patient's diseased cells, often leading to a cure or significant improvement in the patient's health.",
    pointThree:
      "Neurological Disease Treatment: Stem cells provide new avenues for treating neurodegenerative diseases like Alzheimer's or Parkinson's. The patient's cognitive functions and motor skills can be improved by replacing damaged neural cells.",
    pointFour:
      "Drug Development: Stem cells allow scientists to test new drugs for safety and effectiveness. For instance, heart cells derived from stem cells can be used to test potential drugs for heart disease, decreasing the reliance on animal testing and improving drug development efficiency.",
    pointFive:
      "Understanding Disease Progression: Disease modeling with stem cells gives researchers a better understanding of how diseases develop and progress, providing vital insights for developing new therapeutic strategies.",
    pointSix:
      "Reversing Aging: Preliminary research suggests that stem cells could be used to reverse the aging process. By replenishing aged or damaged cells, stem cells might contribute to healthier, longer lives.",
    pointSeven:
      "Genetic Disorders: Stem cells can be genetically modified to correct defects, offering the potential for treating genetic disorders like cystic fibrosis or muscular dystrophy.",
    pointEight:
      "Tissue Engineering: Stem cells can be used to grow new organs or tissues in the lab, reducing the dependency on organ donations and the risk of organ rejection.",
    pointNine:
      "Fighting Cancer: Stem cell therapies may boost the body's immune response to cancer, improving patient treatment outcomes.",
    pointTen:
      "Treatment of Autoimmune Diseases: By resetting the immune system, stem cell therapy has shown promise in treating autoimmune diseases such as multiple sclerosis and lupus, offering hope to patients with these chronic conditions.",
    pointEleven:
      "Diabetes Treatment: For type 1 diabetes, where the body's immune system destroys insulin-producing cells, stem cells offer the potential to create new insulin-producing cells, improving or potentially curing the disease.",
    pointTwelve:
      "Stem Cells in Eye Health: Stem cells hold promise in treating diseases that cause vision loss, like macular degeneration, by replacing the damaged cells in the retina.",
    pointThirteen:
      "Liver Disease Treatment: Stem cells can potentially regenerate damaged liver tissue, offering a new approach to treating liver diseases like cirrhosis.",
    pointFourteen:
      "Addressing Infertility: Stem cells could be used to create sperm or egg cells, offering new treatment possibilities for infertility.Reducing Organ Transplant",
    pointFifteen:
      "Rejections: When organs are grown from the recipient's own stem cells, it reduces the risk of rejection since the organ is not foreign to the body, improving transplant success rates and patient outcomes."
  },
  {
    articleId:
      "Stem Cell Research: Unlocking the Future of Regenerative Medicine",
    title: "Stem Cell Research: Unlocking the Future of Regenerative Medicine",
    author: "Admin",
    category: "Article",
    publishedDate: "2023/06/02",
    publishedTime: "at 7:54 am",
    articleDate: "August 25, 2023",
    articleImage: ArticleImage4,
    articleImageDescription:
      "Stem cells have been the focus of medical researchers for years, bringing hope to numerous patients with chronic conditions. Before diving into the benefits of stem cells, it's essential to understand their distinct characteristics and origins.",
    articleTitle: "15 Benefits of Stem Cells",
    articleParagraph1:
      "Stem cells are unique cells in our bodies that possess two key traits: the capacity to self-renew, producing more stem cells, and the potential to differentiate, becoming other types of specialized cells. These properties make them invaluable in the medical field. They allow us to understand diseases better, develop new, effective drugs, and create cell-based therapies for various conditions.",
    articleParagraph2:
      "From regenerating damaged tissues, treating blood disorders, and combating neurodegenerative diseases to potentially reversing the aging process and addressing infertility, the benefits of stem cells span a wide array of medical applications. Their potential to revolutionize medicine and significantly improve human health is immense and continues to inspire extensive research.",
    pointOne:
      "Regeneration of Tissue: Stem cells have the unique ability to replace damaged tissues. This regeneration capacity has tremendous therapeutic potential for injuries and diseases that lead to tissue damage or loss, such as heart disease, spinal cord injury, or burns.",
    pointTwo:
      "Treatment of Blood Disorders: Stem cells are crucial in treating leukemia and lymphoma. Through bone marrow transplants, healthy stem cells replace the patient's diseased cells, often leading to a cure or significant improvement in the patient's health.",
    pointThree:
      "Neurological Disease Treatment: Stem cells provide new avenues for treating neurodegenerative diseases like Alzheimer's or Parkinson's. The patient's cognitive functions and motor skills can be improved by replacing damaged neural cells.",
    pointFour:
      "Drug Development: Stem cells allow scientists to test new drugs for safety and effectiveness. For instance, heart cells derived from stem cells can be used to test potential drugs for heart disease, decreasing the reliance on animal testing and improving drug development efficiency.",
    pointFive:
      "Understanding Disease Progression: Disease modeling with stem cells gives researchers a better understanding of how diseases develop and progress, providing vital insights for developing new therapeutic strategies.",
    pointSix:
      "Reversing Aging: Preliminary research suggests that stem cells could be used to reverse the aging process. By replenishing aged or damaged cells, stem cells might contribute to healthier, longer lives.",
    pointSeven:
      "Genetic Disorders: Stem cells can be genetically modified to correct defects, offering the potential for treating genetic disorders like cystic fibrosis or muscular dystrophy.",
    pointEight:
      "Tissue Engineering: Stem cells can be used to grow new organs or tissues in the lab, reducing the dependency on organ donations and the risk of organ rejection.",
    pointNine:
      "Fighting Cancer: Stem cell therapies may boost the body's immune response to cancer, improving patient treatment outcomes.",
    pointTen:
      "Treatment of Autoimmune Diseases: By resetting the immune system, stem cell therapy has shown promise in treating autoimmune diseases such as multiple sclerosis and lupus, offering hope to patients with these chronic conditions.",
    pointEleven:
      "Diabetes Treatment: For type 1 diabetes, where the body's immune system destroys insulin-producing cells, stem cells offer the potential to create new insulin-producing cells, improving or potentially curing the disease.",
    pointTwelve:
      "Stem Cells in Eye Health: Stem cells hold promise in treating diseases that cause vision loss, like macular degeneration, by replacing the damaged cells in the retina.",
    pointThirteen:
      "Liver Disease Treatment: Stem cells can potentially regenerate damaged liver tissue, offering a new approach to treating liver diseases like cirrhosis.",
    pointFourteen:
      "Addressing Infertility: Stem cells could be used to create sperm or egg cells, offering new treatment possibilities for infertility.Reducing Organ Transplant",
    pointFifteen:
      "Rejections: When organs are grown from the recipient's own stem cells, it reduces the risk of rejection since the organ is not foreign to the body, improving transplant success rates and patient outcomes."
  },
  {
    articleId: "10 Disadvantages of Stem Cells: Explained (2023)",
    title: "10 Disadvantages of Stem Cells: Explained (2023)",
    author: "Admin",
    category: "Article",
    publishedDate: "2023/06/02",
    publishedTime: "at 7:54 am",
    articleDate: "September 25, 2023",
    articleImage: ArticleImage5,
    articleImageDescription:
      "Stem cells have been the focus of medical researchers for years, bringing hope to numerous patients with chronic conditions. Before diving into the benefits of stem cells, it's essential to understand their distinct characteristics and origins.",
    articleTitle: "15 Benefits of Stem Cells",
    articleParagraph1:
      "Stem cells are unique cells in our bodies that possess two key traits: the capacity to self-renew, producing more stem cells, and the potential to differentiate, becoming other types of specialized cells. These properties make them invaluable in the medical field. They allow us to understand diseases better, develop new, effective drugs, and create cell-based therapies for various conditions.",
    articleParagraph2:
      "From regenerating damaged tissues, treating blood disorders, and combating neurodegenerative diseases to potentially reversing the aging process and addressing infertility, the benefits of stem cells span a wide array of medical applications. Their potential to revolutionize medicine and significantly improve human health is immense and continues to inspire extensive research.",
    pointOne:
      "Regeneration of Tissue: Stem cells have the unique ability to replace damaged tissues. This regeneration capacity has tremendous therapeutic potential for injuries and diseases that lead to tissue damage or loss, such as heart disease, spinal cord injury, or burns.",
    pointTwo:
      "Treatment of Blood Disorders: Stem cells are crucial in treating leukemia and lymphoma. Through bone marrow transplants, healthy stem cells replace the patient's diseased cells, often leading to a cure or significant improvement in the patient's health.",
    pointThree:
      "Neurological Disease Treatment: Stem cells provide new avenues for treating neurodegenerative diseases like Alzheimer's or Parkinson's. The patient's cognitive functions and motor skills can be improved by replacing damaged neural cells.",
    pointFour:
      "Drug Development: Stem cells allow scientists to test new drugs for safety and effectiveness. For instance, heart cells derived from stem cells can be used to test potential drugs for heart disease, decreasing the reliance on animal testing and improving drug development efficiency.",
    pointFive:
      "Understanding Disease Progression: Disease modeling with stem cells gives researchers a better understanding of how diseases develop and progress, providing vital insights for developing new therapeutic strategies.",
    pointSix:
      "Reversing Aging: Preliminary research suggests that stem cells could be used to reverse the aging process. By replenishing aged or damaged cells, stem cells might contribute to healthier, longer lives.",
    pointSeven:
      "Genetic Disorders: Stem cells can be genetically modified to correct defects, offering the potential for treating genetic disorders like cystic fibrosis or muscular dystrophy.",
    pointEight:
      "Tissue Engineering: Stem cells can be used to grow new organs or tissues in the lab, reducing the dependency on organ donations and the risk of organ rejection.",
    pointNine:
      "Fighting Cancer: Stem cell therapies may boost the body's immune response to cancer, improving patient treatment outcomes.",
    pointTen:
      "Treatment of Autoimmune Diseases: By resetting the immune system, stem cell therapy has shown promise in treating autoimmune diseases such as multiple sclerosis and lupus, offering hope to patients with these chronic conditions.",
    pointEleven:
      "Diabetes Treatment: For type 1 diabetes, where the body's immune system destroys insulin-producing cells, stem cells offer the potential to create new insulin-producing cells, improving or potentially curing the disease.",
    pointTwelve:
      "Stem Cells in Eye Health: Stem cells hold promise in treating diseases that cause vision loss, like macular degeneration, by replacing the damaged cells in the retina.",
    pointThirteen:
      "Liver Disease Treatment: Stem cells can potentially regenerate damaged liver tissue, offering a new approach to treating liver diseases like cirrhosis.",
    pointFourteen:
      "Addressing Infertility: Stem cells could be used to create sperm or egg cells, offering new treatment possibilities for infertility.Reducing Organ Transplant",
    pointFifteen:
      "Rejections: When organs are grown from the recipient's own stem cells, it reduces the risk of rejection since the organ is not foreign to the body, improving transplant success rates and patient outcomes."
  }
];

export const dummyDonorApplicationRowData = [
  {
    date: "Jun 10, 2023",
    package: "Stem Cell Package ",
    donorName: "Latifa Sherbeeni",
    status: "Pending"
  },
  {
    date: "Jun 07, 2023",
    package: "Cord Blood Package",
    donorName: "Nagham Ahmed",
    status: "Completed"
  },
  {
    date: "Jun 05, 2023",
    package: "Stem Cell Package",
    donorName: "Sara hassan",
    status: "Rejected"
  },
  {
    date: "Jun 04, 2023",
    package: "Cord Blood Package",
    donorName: "Esraa Hassan Mohamed",
    status: "Completed"
  }
];

export const dummyPaymentRowData = [
  {
    invoiceId: "123456",
    date: "Jun 10, 2023",
    package: "Stem Cell Package",
    donorName: "Latifa Sherbeeni",
    type: "Credit Card",
    amount: 30000,
    status: "Paid",
    description: "Completed 20 years stem cell storage package",
    donorsBankDetails: "Armani Beach Residences Palm Jumeirah,Dubai",
    country: "United Arab Emirates",
    deliveryFee: 5.0,
    taxFee: 5.0,
    creditCardLastDigits: 1234,
    userEmail: "name@email.com"
  },
  {
    invoiceId: "789233",
    date: "Jun 07, 2023",
    package: "Cord Blood Package",
    donorName: "Nagham Ahmed",
    type: "Credit Card",
    amount: 30000,
    status: "Completed",
    description: "Completed 20 years stem cell storage package",
    donorsBankDetails: "Armani Beach Residences Palm Jumeirah,Dubai",
    country: "United Arab Emirates",
    deliveryFee: 5.0,
    taxFee: 5.0,
    creditCardLastDigits: 4567,
    userEmail: "name@email.com"
  },
  {
    invoiceId: "678567",
    date: "Jun 05, 2023",
    package: "Stem Cell Package",
    donorName: "sara hassan",
    type: "Credit Card",
    amount: 30000,
    status: "Rejected",
    description: "Completed 20 years stem cell storage package",
    country: "United Arab Emirates",
    donorsBankDetails: "Armani Beach Residences Palm Jumeirah,Dubai",
    deliveryFee: 15.0,
    taxFee: 15.0,
    creditCardLastDigits: 8910,
    userEmail: "name@email.com"
  },
  {
    invoiceId: "346798",
    date: "Jun 04, 2023",
    package: "Cord Blood Package",
    donorName: "Esraa Hassan Mohamed",
    type: "Credit Card",
    amount: 30000,
    status: "Completed",
    description: "Completed 20 years stem cell storage package",
    donorsBankDetails: "Armani Beach Residences Palm Jumeirah,Dubai",
    country: "United Arab Emirates",
    deliveryFee: 5.0,
    taxFee: 5.0,
    creditCardLastDigits: 1121,
    userEmail: "name@email.com"
  }
];

export const dummyUserRowData = [
  {
    id: 1,
    name: "Dr. Fatma Alhashimi",
    createdAt: "Jun 05, 2023",
    mobile: "0501234567",
    email: "email@email.com",
    access: access.administrator,
    status: status.active
  },
  {
    id: 2,
    name: "Latifa Sherbeeni",
    createdAt: "Jun 05, 2023",
    mobile: "0501234567",
    email: "email@email.com",
    access: access.donor,
    status: status.active
  },
  {
    id: 2,
    name: "Dr. Ahmed Khalil",
    createdAt: "Jun 05, 2023",
    mobile: "0501234567",
    email: "email@email.com",
    access: access.healthProfessional,
    status: status.active
  },
  {
    id: 2,
    name: "Esraa Hassan Mohamed",
    createdAt: "Jun 05, 2023",
    mobile: "0501234567",
    email: "email@email.com",
    access: access.donor,
    status: status.inactive
  },
  {
    id: 2,
    name: "Ibrar Ahmed",
    createdAt: "Jun 05, 2023",
    mobile: "0501234567",
    email: "email@email.com",
    access: access.driver,
    status: status.active
  }
];

export const dummyDonorApplicationReportRowData = [
  {
    id: 1,
    date: "Jun 10, 2023",
    package: "Stem Cell Package",
    donorName: "Latifa Sherbeeni",
    mobile: "0123456789",
    email: "email@email.com",
    status: StatusType.Pending
  },
  {
    id: 1,
    date: "Jun 07, 2023",
    package: "Cord Blood Package",
    donorName: "Nagham Ahmed",
    mobile: "0123456789",
    email: "email@email.com",
    status: StatusType.Completed
  },
  {
    id: 1,
    date: "Jun 05, 2023",
    package: "Stem Cell Package",
    donorName: "Sara hassan",
    mobile: "0123456789",
    email: "email@email.com",
    status: StatusType.Rejected
  },
  {
    id: 1,
    date: "Jun 04, 2023",
    package: "Cord Blood Package",
    donorName: "Esraa Hassan Mohamed",
    mobile: "0123456789",
    email: "email@email.com",
    status: StatusType.Completed
  }
];

export const dummyDonorApplicationPaymentRowData = [
  {
    id: 1,
    date: "August 19, 2023 23:15:30",
    package: "Treasure Hope",
    email: "your@email.com",
    type: "Credit Card",
    amount: 30000,
    status: StatusType.Pending
  }
];
