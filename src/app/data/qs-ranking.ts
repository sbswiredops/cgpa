export type QsUniversity = {
  id: string;
  name: string;
  shortName: string;
  qsUrl: string;
  imageUrl?: string;
};

// Curated QS profile links for prominent private universities in Bangladesh
export const qsUniversities: QsUniversity[] = [
  {
    id: "brac",
    name: "BRAC University",
    shortName: "BRAC",
    imageUrl: "/brac.png",
    qsUrl: "https://www.topuniversities.com/universities/brac-university",
  },
  {
    id: "nsu",
    name: "North South University",
    shortName: "NSU",
    imageUrl: "/nsu.png",
    qsUrl: "https://www.topuniversities.com/universities/north-south-university",
  },
  {
    id: "iub",
    name: "Independent University, Bangladesh",
    shortName: "IUB",
    imageUrl: "/iub.png",
    qsUrl: "https://www.topuniversities.com/universities/independent-university-bangladesh-iub",
  },
  {
    id: "ewu",
    name: "East West University",
    shortName: "EWU",
    imageUrl: "/ewu.png",
    qsUrl: "https://www.topuniversities.com/universities/east-west-university",
  },
  {
    id: "uiu",
    name: "United International University",
    shortName: "UIU",
    imageUrl: "/uiu.png",
    qsUrl: "https://www.topuniversities.com/universities/united-international-university",
  },
  {
    id: "aiub",
    name: "American International University-Bangladesh",
    shortName: "AIUB",
    imageUrl: "/aiub.png",
    qsUrl: "https://www.topuniversities.com/universities/american-international-university-bangladesh-aiub",
  },
  {
    id: "aust",
    name: "Ahsanullah University of Science and Technology",
    shortName: "AUST",
    imageUrl: "/aust.png",
    qsUrl: "https://www.topuniversities.com/universities/ahsanullah-university-science-technology",
  },
  {
    id: "diu",
    name: "Daffodil International University",
    shortName: "DIU",
    imageUrl: "/diu.jpg",
    qsUrl: "https://www.topuniversities.com/universities/daffodil-international-university",
  },
];
