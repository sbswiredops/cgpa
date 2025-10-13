export type QsUniversity = {
  id: string;
  name: string;
  shortName: string;
  qsUrl: string;
};

// Curated QS profile links for prominent private universities in Bangladesh
export const qsUniversities: QsUniversity[] = [
  {
    id: "brac",
    name: "BRAC University",
    shortName: "BRAC",
    qsUrl: "https://www.topuniversities.com/universities/brac-university",
  },
  {
    id: "nsu",
    name: "North South University",
    shortName: "NSU",
    qsUrl: "https://www.topuniversities.com/universities/north-south-university",
  },
  {
    id: "iub",
    name: "Independent University, Bangladesh",
    shortName: "IUB",
    qsUrl: "https://www.topuniversities.com/universities/independent-university-bangladesh-iub",
  },
  {
    id: "ewu",
    name: "East West University",
    shortName: "EWU",
    qsUrl: "https://www.topuniversities.com/universities/east-west-university",
  },
  {
    id: "uiu",
    name: "United International University",
    shortName: "UIU",
    qsUrl: "https://www.topuniversities.com/universities/united-international-university",
  },
  {
    id: "aiub",
    name: "American International University-Bangladesh",
    shortName: "AIUB",
    qsUrl: "https://www.topuniversities.com/universities/american-international-university-bangladesh-aiub",
  },
  {
    id: "aust",
    name: "Ahsanullah University of Science and Technology",
    shortName: "AUST",
    qsUrl: "https://www.topuniversities.com/universities/ahsanullah-university-science-technology",
  },
  {
    id: "uap",
    name: "University of Asia Pacific",
    shortName: "UAP",
    qsUrl: "https://www.topuniversities.com/universities/university-asia-pacific",
  },
];
