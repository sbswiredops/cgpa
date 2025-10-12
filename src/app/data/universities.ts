export type GradeScale = {
  grade: string;
  point: number;
  description?: string;
};

export type UniversityInfo = {
  id: string;
  name: string;
  shortName: string;
  gradingScale: GradeScale[];
};

const standardScale: GradeScale[] = [
  { grade: "A+", point: 4 },
  { grade: "A", point: 3.75 },
  { grade: "A-", point: 3.5 },
  { grade: "B+", point: 3.25 },
  { grade: "B", point: 3 },
  { grade: "B-", point: 2.75 },
  { grade: "C+", point: 2.5 },
  { grade: "C", point: 2.25 },
  { grade: "D", point: 2 },
  { grade: "F", point: 0 },
];

const nsuScale: GradeScale[] = [
  { grade: "A", point: 4 },
  { grade: "A-", point: 3.7 },
  { grade: "B+", point: 3.3 },
  { grade: "B", point: 3 },
  { grade: "B-", point: 2.7 },
  { grade: "C+", point: 2.3 },
  { grade: "C", point: 2 },
  { grade: "C-", point: 1.7 },
  { grade: "D", point: 1 },
  { grade: "F", point: 0 },
];

const iubScale: GradeScale[] = [
  { grade: "A", point: 4 },
  { grade: "A-", point: 3.75 },
  { grade: "B+", point: 3.5 },
  { grade: "B", point: 3.25 },
  { grade: "B-", point: 3 },
  { grade: "C+", point: 2.75 },
  { grade: "C", point: 2.5 },
  { grade: "C-", point: 2.25 },
  { grade: "D", point: 2 },
  { grade: "F", point: 0 },
];

export const universities: UniversityInfo[] = [
  {
    id: "aiub",
    name: "American International University-Bangladesh",
    shortName: "AIUB",
    gradingScale: standardScale,
  },
  {
    id: "brac",
    name: "BRAC University",
    shortName: "BRAC",
    gradingScale: standardScale,
  },
  {
    id: "nsu",
    name: "North South University",
    shortName: "NSU",
    gradingScale: nsuScale,
  },
  {
    id: "iub",
    name: "Independent University, Bangladesh",
    shortName: "IUB",
    gradingScale: iubScale,
  },
  {
    id: "ewu",
    name: "East West University",
    shortName: "EWU",
    gradingScale: standardScale,
  },
  {
    id: "uiu",
    name: "United International University",
    shortName: "UIU",
    gradingScale: standardScale,
  },
  {
    id: "aust",
    name: "Ahsanullah University of Science and Technology",
    shortName: "AUST",
    gradingScale: standardScale,
  },
  {
    id: "du",
    name: "Dhaka University",
    shortName: "DU",
    gradingScale: standardScale,
  },
];
