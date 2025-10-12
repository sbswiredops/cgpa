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
  /** Optional numeric score ranges mapping to letter grades (min/max inclusive) */
  numericRanges?: { grade: string; min: number; max: number }[];
  /** Optional free-form calculation guide or notes for the university (markdown-friendly) */
  calculationGuide?: string;
  /** Optional calculation rules (per-university policies) */
  rules?: {
    /** Exclude failing/non-contributing grades (point === 0) from GPA denominator */
    excludeFailFromDenominator?: boolean;
    /** Minimum grade (letter) considered as 'earned' credit. Example: 'D' */
    earnedGradeMin?: string;
    /** Degree requirement CGPA threshold (optional) */
    degreeRequirementCgpa?: number;
    /** Which grades count as attempted credits (whitelist). If provided, only these grades are considered for credits attempted. */
    attemptGrades?: string[];
    /** If true, when a course is retaken the last attempt's grade is used (informational; requires course ids to enforce) */
    lastAttemptWins?: boolean;
    /** Optional probation CGPA threshold (e.g. 1.5 means CGPA < 1.5 puts student on probation) */
    probationCgpa?: number;
    /** Number of consecutive semesters allowed on probation before dismissal */
    probationConsecutiveSemestersAllowed?: number;
    /** If student first-semester CGPA is below this threshold, they may be asked to withdraw */
    firstSemesterWithdrawThreshold?: number;
    /** Semester number by which a higher CGPA is required to continue (e.g. 6) */
    continuationRequirementSemester?: number;
    /** Required CGPA at continuationRequirementSemester to continue (e.g. 2.0) */
    continuationRequirementCgpa?: number;
  };
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

const bracScale: GradeScale[] = [
  { grade: "A+", point: 4.0, description: "97 - 100 — Exceptional" },
  { grade: "A", point: 4.0, description: "90 - <97 — Excellent" },
  { grade: "A-", point: 3.7, description: "85 - <90" },
  { grade: "B+", point: 3.3, description: "80 - <85" },
  { grade: "B", point: 3.0, description: "75 - <80 — Good" },
  { grade: "B-", point: 2.7, description: "70 - <75" },
  { grade: "C+", point: 2.3, description: "65 - <70" },
  { grade: "C", point: 2.0, description: "60 - <65 — Fair" },
  { grade: "C-", point: 1.7, description: "57 - <60" },
  { grade: "D+", point: 1.3, description: "55 - <57" },
  { grade: "D", point: 1.0, description: "52 - <55 — Poor" },
  { grade: "D-", point: 0.7, description: "50 - <52" },
  { grade: "F", point: 0.0, description: "<50 — Failure" },
];

const ewuScale: GradeScale[] = [
  { grade: "A+", point: 4.0, description: "80% and above" },
  { grade: "A", point: 3.75, description: "75% to less than 80%" },
  { grade: "A-", point: 3.5, description: "70% to less than 75%" },
  { grade: "B+", point: 3.25, description: "65% to less than 70%" },
  { grade: "B", point: 3.0, description: "60% to less than 65%" },
  { grade: "B-", point: 2.75, description: "55% to less than 60%" },
  { grade: "C+", point: 2.5, description: "50% to less than 55%" },
  { grade: "C", point: 2.25, description: "45% to less than 50%" },
  { grade: "D", point: 2.0, description: "40% to less than 45%" },
  { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
  // Special/administrative
  { grade: "F*", point: 0.0, description: "Failure" },
  { grade: "U*", point: 0.0, description: "Unsatisfactory" },
  { grade: "I", point: 0.0, description: "Incomplete" },
  { grade: "P", point: 0.0, description: "Pass" },
  { grade: "R", point: 0.0, description: "Repeat/Retake" },
  { grade: "S", point: 0.0, description: "Satisfactory" },
  { grade: "W", point: 0.0, description: "Withdrawal" },
];

const nsuScale: GradeScale[] = [
  { grade: "A", point: 4, description: "93 and above — Excellent" },
  { grade: "A-", point: 3.7, description: "90 - 92" },
  { grade: "B+", point: 3.3, description: "87 - 89" },
  { grade: "B", point: 3.0, description: "83 - 86 — Good" },
  { grade: "B-", point: 2.7, description: "80 - 82" },
  { grade: "C+", point: 2.3, description: "77 - 79" },
  { grade: "C", point: 2.0, description: "73 - 76 — Average" },
  { grade: "C-", point: 1.7, description: "70 - 72" },
  { grade: "D+", point: 1.3, description: "67 - 69" },
  { grade: "D", point: 1.0, description: "60 - 66 — Poor" },
  { grade: "F", point: 0.0, description: "Below 60 — Failure" },
  { grade: "I", point: 0.0, description: "Incomplete" },
  { grade: "W", point: 0.0, description: "Withdrawal" },
];

const iubScale: GradeScale[] = [
  { grade: "A+", point: 4.0, description: "4.0" },
  { grade: "A", point: 4.0, description: "90% and above — Excellent" },
  { grade: "A-", point: 3.7, description: "85% to less than 90% — Excellent" },
  { grade: "B+", point: 3.3, description: "80% to less than 85% — Good" },
  { grade: "B", point: 3.0, description: "75% to less than 80% — Good" },
  { grade: "B-", point: 2.7, description: "70% to less than 75% — Good" },
  { grade: "C+", point: 2.3, description: "65% to less than 70% — Passing" },
  { grade: "C", point: 2.0, description: "60% to less than 65% — Passing" },
  { grade: "C-", point: 1.7, description: "55% to less than 60% — Passing" },
  { grade: "D+", point: 1.3, description: "50% to less than 55% — Deficient Passing" },
  { grade: "D", point: 1.0, description: "45% to less than 50% — Deficient Passing" },
  { grade: "D-", point: 0.7, description: "<45 (or 50-<52 in some variants) — Minimal Passing" },
  { grade: "F", point: 0.0, description: "Less than 45% — Failing" },
  // Special / administrative grades
  { grade: "I", point: 0.0, description: "Incomplete" },
  { grade: "W", point: 0.0, description: "Withdrawal" },
  { grade: "Y", point: 0.0, description: "Audit" },
  { grade: "O", point: 0.0, description: "Administrative Withdrawal" },
  { grade: "Z", point: 0.0, description: "No Grade Received" },
  { grade: "P", point: 0.0, description: "Pass" },
  { grade: "S", point: 0.0, description: "Satisfactory" },
  { grade: "U", point: 0.0, description: "Unsatisfactory" },
  { grade: "T", point: 0.0, description: "Repeated (Credit Not Allowed)" },
  { grade: "R", point: 0.0, description: "Repeated (Credit Allowed)" },
  { grade: "E", point: 0.0, description: "Examination" },
];

const uiuScale: GradeScale[] = [
  { grade: "A", point: 4.0, description: "90 - 100 — Outstanding" },
  { grade: "A-", point: 3.67, description: "86 - 89 — Excellent" },
  { grade: "B+", point: 3.33, description: "82 - 85 — Very Good" },
  { grade: "B", point: 3.0, description: "78 - 81 — Good" },
  { grade: "B-", point: 2.67, description: "74 - 77 — Above Average" },
  { grade: "C+", point: 2.33, description: "70 - 73 — Average" },
  { grade: "C", point: 2.0, description: "66 - 69 — Below Average" },
  { grade: "C-", point: 1.67, description: "62 - 65 — Poor" },
  { grade: "D+", point: 1.33, description: "58 - 61 — Very poor" },
  { grade: "D", point: 1.0, description: "55 - 57 — Pass" },
  { grade: "F", point: 0.0, description: "0 - 54 — Fail" },
];

const austScale: GradeScale[] = [
  { grade: "A+", point: 4.0, description: "80% or above" },
  { grade: "A", point: 3.75, description: "75% to less than 80%" },
  { grade: "A-", point: 3.5, description: "70% to less than 75%" },
  { grade: "B+", point: 3.25, description: "65% to less than 70%" },
  { grade: "B", point: 3.0, description: "60% to less than 65%" },
  { grade: "B-", point: 2.75, description: "55% to less than 60%" },
  { grade: "C+", point: 2.5, description: "50% to less than 55%" },
  { grade: "C", point: 2.25, description: "45% to less than 50%" },
  { grade: "D", point: 2.0, description: "40% to less than 45%" },
  { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
];

// Numeric ranges for AUST (min/max inclusive). Used to map numeric score -> letter grade.
const austNumericRanges = [
  { grade: "A+", min: 80, max: 100 },
  { grade: "A", min: 75, max: 79.999 },
  { grade: "A-", min: 70, max: 74.999 },
  { grade: "B+", min: 65, max: 69.999 },
  { grade: "B", min: 60, max: 64.999 },
  { grade: "B-", min: 55, max: 59.999 },
  { grade: "C+", min: 50, max: 54.999 },
  { grade: "C", min: 45, max: 49.999 },
  { grade: "D", min: 40, max: 44.999 },
  { grade: "F", min: 0, max: 39.999 },
];

// Manarat International University grading scale and numeric ranges (UGC-approved mapping)
const manaratScale: GradeScale[] = [
  { grade: "A+", point: 4.0, description: "80% and above" },
  { grade: "A", point: 3.75, description: "75% to less than 80%" },
  { grade: "A-", point: 3.5, description: "70% to less than 75%" },
  { grade: "B+", point: 3.25, description: "65% to less than 70%" },
  { grade: "B", point: 3.0, description: "60% to less than 65%" },
  { grade: "B-", point: 2.75, description: "55% to less than 60%" },
  { grade: "C+", point: 2.5, description: "50% to less than 55%" },
  { grade: "C", point: 2.25, description: "45% to less than 50%" },
  { grade: "D", point: 2.0, description: "40% to less than 45%" },
  { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
  // Administrative / other grades
  { grade: "I", point: 0.0, description: "Incomplete" },
  { grade: "W", point: 0.0, description: "Withdrawal" },
  { grade: "R", point: 0.0, description: "Repeat" },
];

const manaratNumericRanges = [
  { grade: "A+", min: 80, max: 100 },
  { grade: "A", min: 75, max: 79.999 },
  { grade: "A-", min: 70, max: 74.999 },
  { grade: "B+", min: 65, max: 69.999 },
  { grade: "B", min: 60, max: 64.999 },
  { grade: "B-", min: 55, max: 59.999 },
  { grade: "C+", min: 50, max: 54.999 },
  { grade: "C", min: 45, max: 49.999 },
  { grade: "D", min: 40, max: 44.999 },
  { grade: "F", min: 0, max: 39.999 },
];

// Generic Bangladesh (UGC-style) grading scale and numeric ranges
const bangladeshScale: GradeScale[] = [
  { grade: "A+", point: 4.0, description: "80% and above" },
  { grade: "A", point: 3.75, description: "75% to less than 80%" },
  { grade: "A-", point: 3.5, description: "70% to less than 75%" },
  { grade: "B+", point: 3.25, description: "65% to less than 70%" },
  { grade: "B", point: 3.0, description: "60% to less than 65%" },
  { grade: "B-", point: 2.75, description: "55% to less than 60%" },
  { grade: "C+", point: 2.5, description: "50% to less than 55%" },
  { grade: "C", point: 2.25, description: "45% to less than 50%" },
  { grade: "D", point: 2.0, description: "40% to less than 45%" },
  { grade: "F", point: 0.0, description: "Below 40% — Failure" },
  // Administrative grades
  { grade: "I", point: 0.0, description: "Incomplete" },
  { grade: "W", point: 0.0, description: "Withdraw" },
  { grade: "X", point: 0.0, description: "Absent From Examination" },
];

const bangladeshNumericRanges = [
  { grade: "A+", min: 80, max: 100 },
  { grade: "A", min: 75, max: 79.999 },
  { grade: "A-", min: 70, max: 74.999 },
  { grade: "B+", min: 65, max: 69.999 },
  { grade: "B", min: 60, max: 64.999 },
  { grade: "B-", min: 55, max: 59.999 },
  { grade: "C+", min: 50, max: 54.999 },
  { grade: "C", min: 45, max: 49.999 },
  { grade: "D", min: 40, max: 44.999 },
  { grade: "F", min: 0, max: 39.999 },
];

// Sylhet International University grading scale / numeric ranges (UGC-aligned)
const siuScale: GradeScale[] = [
  { grade: "A+", point: 4.0, description: "80% and above" },
  { grade: "A", point: 3.75, description: "75% to less than 80%" },
  { grade: "A-", point: 3.5, description: "70% to less than 75%" },
  { grade: "B+", point: 3.25, description: "65% to less than 70%" },
  { grade: "B", point: 3.0, description: "60% to less than 65%" },
  { grade: "B-", point: 2.75, description: "55% to less than 60%" },
  { grade: "C+", point: 2.5, description: "50% to less than 55%" },
  { grade: "C", point: 2.25, description: "45% to less than 50%" },
  { grade: "D", point: 2.0, description: "40% to less than 45%" },
  { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
  // Administrative
  { grade: "I", point: 0.0, description: "Incomplete" },
];

const siuNumericRanges = [
  { grade: "A+", min: 80, max: 100 },
  { grade: "A", min: 75, max: 79.999 },
  { grade: "A-", min: 70, max: 74.999 },
  { grade: "B+", min: 65, max: 69.999 },
  { grade: "B", min: 60, max: 64.999 },
  { grade: "B-", min: 55, max: 59.999 },
  { grade: "C+", min: 50, max: 54.999 },
  { grade: "C", min: 45, max: 49.999 },
  { grade: "D", min: 40, max: 44.999 },
  { grade: "F", min: 0, max: 39.999 },
];

// DIU grading scale (as provided)
const diuScale: GradeScale[] = [
  { grade: "A+", point: 4.0 },
  { grade: "A", point: 3.75 },
  { grade: "A-", point: 3.5 },
  { grade: "B+", point: 3.25 },
  { grade: "B", point: 3.0 },
  { grade: "B-", point: 2.75 },
  { grade: "C+", point: 2.5 },
  { grade: "C", point: 2.25 },
  { grade: "C-", point: 2.0 },
  { grade: "D+", point: 1.75 },
  { grade: "D", point: 1.5 },
  { grade: "F", point: 0.0 },
];

// AUB grading scale (matches mapping provided by user)
const aubScale: GradeScale[] = [
  { grade: "A+", point: 4.0 },
  { grade: "A", point: 3.75 },
  { grade: "A-", point: 3.5 },
  { grade: "B+", point: 3.25 },
  { grade: "B", point: 3.0 },
  { grade: "B-", point: 2.75 },
  { grade: "C+", point: 2.5 },
  { grade: "C", point: 2.25 },
  { grade: "D", point: 2.0 },
  { grade: "F", point: 0.0 },
];

// CWU grading scale (same mapping as DIU / standard 4.0 variant)
const cwuScale: GradeScale[] = [
  { grade: "A+", point: 4.0 },
  { grade: "A", point: 3.75 },
  { grade: "A-", point: 3.5 },
  { grade: "B+", point: 3.25 },
  { grade: "B", point: 3.0 },
  { grade: "B-", point: 2.75 },
  { grade: "C+", point: 2.5 },
  { grade: "C", point: 2.25 },
  { grade: "D", point: 2.0 },
  { grade: "F", point: 0.0 },
];

// IUBAT grading scale (matches provided mapping)
const iubatScale: GradeScale[] = [
  { grade: "A+", point: 4.0 },
  { grade: "A", point: 3.75 },
  { grade: "A-", point: 3.5 },
  { grade: "B+", point: 3.25 },
  { grade: "B", point: 3.0 },
  { grade: "B-", point: 2.75 },
  { grade: "C+", point: 2.5 },
  { grade: "C", point: 2.25 },
  { grade: "D", point: 2.0 },
  { grade: "F", point: 0.0 },
];

// IIUC grading scale and numeric ranges (UGC uniform mapping)
const iiucScale: GradeScale[] = [
  { grade: "A+", point: 4.0, description: "80-100 — Excellent" },
  { grade: "A", point: 3.75, description: "75-79 — Very Good" },
  { grade: "A-", point: 3.5, description: "70-74" },
  { grade: "B+", point: 3.25, description: "65-69 — Good" },
  { grade: "B", point: 3.0, description: "60-64" },
  { grade: "B-", point: 2.75, description: "55-59 — Satisfactory" },
  { grade: "C+", point: 2.5, description: "50-54" },
  { grade: "C", point: 2.25, description: "45-49 — Pass" },
  { grade: "D", point: 2.0, description: "40-44" },
  { grade: "F", point: 0.0, description: "0-39 — Fail" },
];

const iiucNumericRanges = [
  { grade: "A+", min: 80, max: 100 },
  { grade: "A", min: 75, max: 79.999 },
  { grade: "A-", min: 70, max: 74.999 },
  { grade: "B+", min: 65, max: 69.999 },
  { grade: "B", min: 60, max: 64.999 },
  { grade: "B-", min: 55, max: 59.999 },
  { grade: "C+", min: 50, max: 54.999 },
  { grade: "C", min: 45, max: 49.999 },
  { grade: "D", min: 40, max: 44.999 },
  { grade: "F", min: 0, max: 39.999 },
];

// UAP grading scale (UGC uniform mapping with E/I administrative grades)
const uapScale: GradeScale[] = [
  { grade: "A+", point: 4.0, description: "80% and above" },
  { grade: "A", point: 3.75, description: "75% to less than 80%" },
  { grade: "A-", point: 3.5, description: "70% to less than 75%" },
  { grade: "B+", point: 3.25, description: "65% to less than 70%" },
  { grade: "B", point: 3.0, description: "60% to less than 65%" },
  { grade: "B-", point: 2.75, description: "55% to less than 60%" },
  { grade: "C+", point: 2.5, description: "50% to less than 55%" },
  { grade: "C", point: 2.25, description: "45% to less than 50%" },
  { grade: "D", point: 2.0, description: "40% to less than 45%" },
  { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
  { grade: "E", point: 0.0, description: "Exemption (administrative)" },
  { grade: "I", point: 0.0, description: "Incomplete (administrative)" },
];

const uapNumericRanges = [
  { grade: "A+", min: 80, max: 100 },
  { grade: "A", min: 75, max: 79.999 },
  { grade: "A-", min: 70, max: 74.999 },
  { grade: "B+", min: 65, max: 69.999 },
  { grade: "B", min: 60, max: 64.999 },
  { grade: "B-", min: 55, max: 59.999 },
  { grade: "C+", min: 50, max: 54.999 },
  { grade: "C", min: 45, max: 49.999 },
  { grade: "D", min: 40, max: 44.999 },
  { grade: "F", min: 0, max: 39.999 },
];

export const universities: UniversityInfo[] = [
  {
    id: "aiub",
    name: "American International University-Bangladesh",
    shortName: "AIUB",
    gradingScale: standardScale,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "uap",
    name: "University of Asia Pacific",
    shortName: "UAP",
    gradingScale: uapScale,
    numericRanges: uapNumericRanges,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "E", "I"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "iiuc",
    name: "International Islamic University Chittagong",
    shortName: "IIUC",
    gradingScale: iiucScale,
    numericRanges: iiucNumericRanges,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "brac",
    name: "BRAC University",
    shortName: "BRAC",
    gradingScale: bracScale,

    rules: {
      // BRAC considers the standard letter grades as attempted and earned per usual mapping
      attemptGrades: [
        "A+",
        "A",
        "A-",
        "B+",
        "B",
        "B-",
        "C+",
        "C",
        "C-",
        "D+",
        "D",
        "D-",
        "F",
      ],
      earnedGradeMin: "D",
      // Probation and continuation policy
      probationCgpa: 1.5,
      probationConsecutiveSemestersAllowed: 2,
      firstSemesterWithdrawThreshold: 1.0,
      continuationRequirementSemester: 6,
      continuationRequirementCgpa: 2.0,
    },
  },
  {
    id: "nsu",
    name: "North South University",
    shortName: "NSU",
    gradingScale: nsuScale,

    rules: {
      // NSU counts standard letter grades as attempted credits (administrative grades like W/I do not count)
      attemptGrades: ["A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      // Minimum earned grade for credit to be counted as 'earned'
      earnedGradeMin: "D",
      // Degree requirement (graduation) CGPA
      degreeRequirementCgpa: 2.0,
      // NSU treats W and I as non-contributing administrative grades (so excludeFailFromDenominator remains false)
      excludeFailFromDenominator: false,
    },
  },
  {
    id: "iub",
    name: "Independent University, Bangladesh",
    shortName: "IUB",
    gradingScale: iubScale,

    rules: {
      attemptGrades: [
        "A+",
        "A",
        "A-",
        "B+",
        "B",
        "B-",
        "C+",
        "C",
        "C-",
        "D+",
        "D",
        "D-",
        "F",
      ],
      earnedGradeMin: "D",
    },
  },
  {
    id: "ewu",
    name: "East West University",
    shortName: "EWU",
    gradingScale: ewuScale,
    rules: {
      // EWU: Only courses graded A+, A, A-, B+, B, B-, C+, C, D, and F are used to determine credits attempted.
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      // Passing grades are A..D (earnedGradeMin default is 'D')
      earnedGradeMin: "D",
      // Repeats: CGPA uses grade from last attempt only (informational; requires course ids to enforce)
      lastAttemptWins: true,
    },
  },
  {
    id: "uiu",
    name: "United International University",
    shortName: "UIU",
    gradingScale: uiuScale,
    rules: {
      // Per UIU policy: courses with 'F' are not counted as earned credit hours (exclude from denominator)
      excludeFailFromDenominator: true,
      earnedGradeMin: "D",
      degreeRequirementCgpa: 2.0,
    },
  },
  {
    id: "aust",
    name: "Ahsanullah University of Science and Technology",
    shortName: "AUST",
    gradingScale: austScale,
    numericRanges: austNumericRanges,
  },
  {
    id: "du",
    name: "Dhaka University",
    shortName: "DU",
    gradingScale: standardScale,
  },
  {
    id: "diu",
    name: "Daffodil International University",
    shortName: "DIU",
    gradingScale: aubScale,
    rules: {
      attemptGrades: [
        "A+",
        "A",
        "A-",
        "B+",
        "B",
        "B-",
        "C+",
        "C",
        "C-",
        "D+",
        "D",
        "F",
      ],
      earnedGradeMin: "D",
    },
  },
  {
    id: "cwu",
    name: "Central Women's University",
    shortName: "CWU",
    gradingScale: cwuScale,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "iubat",
    name: "International University of Business Agriculture and Technology",
    shortName: "IUBAT",
    gradingScale: iubatScale,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "aub",
    name: "Asian University of Bangladesh",
    shortName: "AUB",
    gradingScale: aubScale,
    // Provide a short calculation guide helpful for users — based on the user's provided text
    calculationGuide: `Understanding Asian University of Bangladesh’s Grading System\n\nBefore calculating your CGPA, it's important to know how Asian University of Bangladesh (AUB) grades students. Here’s the grading scale:\n\nGrade\tGrade Point\nA+\t4.00\nA\t3.75\nA-\t3.50\nB+\t3.25\nB\t3.00\nB-\t2.75\nC+\t2.50\nC\t2.25\nD\t2.00\nF\t0.00\n\nEach course has a certain number of credit hours. This shows how much the course affects your CGPA. For example, a 4-credit-hour course impacts your CGPA more than a 3-credit-hour course. It’s important to understand this when calculating your CGPA or using an online calculator.\n\nAUB uses a weighted grading system. This means courses with more credit hours affect your CGPA more. Core subjects, which usually have more credit hours, carry more weight.\n\nFormula for Calculating CGPA Manually\nCGPA = Total Grade Points ÷ Total Credit Hours\n\nExample:\nSubject\tCredit Hours\tGrade\tGrade Point\tTotal Grade Points\nMath\t3\tA\t3.75\t11.25\nEnglish\t3\tB+\t3.25\t9.75\nProgramming\t4\tA-\t3.50\t14.00\nPhysics\t3\tB\t3.00\t9.00\nTotal Credit Hours: 3 + 3 + 4 + 3 = 13\nTotal Grade Points: 11.25 + 9.75 + 14.00 + 9.00 = 44.00\nCGPA: 44.00 ÷ 13 = 3.38\n\nThis method works well but can be slow and easy to mess up, especially with many courses. Many students prefer automated tools for faster, more accurate results.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "miu",
    name: "Manarat International University",
    shortName: "MIU",
    gradingScale: manaratScale,
    numericRanges: manaratNumericRanges,
    // Informational calculation guide could be added later if desired
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W", "R"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "bu",
    name: "Bangladesh University",
    shortName: "BU",
    gradingScale: bangladeshScale,
    numericRanges: bangladeshNumericRanges,
    calculationGuide: `Bangladesh University grading follows the common UGC-style 4.0 scale. For more information see https://www.bu.edu.bd/`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W", "X"],
      earnedGradeMin: "C+",
      degreeRequirementCgpa: 2.5,
    },
  },
  {
    id: "bgctub",
    name: "BGC Trust University Bangladesh",
    shortName: "BGC TUB",
    gradingScale: bangladeshScale,
    numericRanges: bangladeshNumericRanges,

    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W", "X"],
      earnedGradeMin: "D",
      degreeRequirementCgpa: 2.5,
    },
  },
  {
    id: "siu",
    name: "Sylhet International University",
    shortName: "SIU",
    gradingScale: siuScale,
    numericRanges: siuNumericRanges,
    rules: {
      attemptGrades: ["A+","A","A-","B+","B","B-","C+","C","D","F","I"],
      earnedGradeMin: "D",
      // SIU's policy: F is recorded and requires repeat; many policies treat F as non-earned credit.
      excludeFailFromDenominator: true,
      // Graduation minimum CGPA (normal progress threshold)
      degreeRequirementCgpa: 2.25,
    },
  },
  
  // University of Development Alternative (UODA)
  {
    id: "uoda",
    name: "University of Development Alternative",
    shortName: "UODA",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "81-100 — Outstanding" },
      { grade: "A", point: 3.75, description: "76-80 — Excellent" },
      { grade: "A-", point: 3.5, description: "71-75 — Very Good" },
      { grade: "B+", point: 3.25, description: "66-70 — Moderate" },
      { grade: "B", point: 3.0, description: "61-65 — Good" },
      { grade: "B-", point: 2.75, description: "56-60 — Satisfactory" },
      { grade: "C+", point: 2.5, description: "51-55 — Average" },
      { grade: "C", point: 2.25, description: "46-50 — Fair" },
      { grade: "D", point: 2.0, description: "40-45 — Pass" },
      { grade: "F", point: 0.0, description: "Below 40 — Fail" },
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdraw" },
    ],
    numericRanges: [
      { grade: "A+", min: 81, max: 100 },
      { grade: "A", min: 76, max: 80.999 },
      { grade: "A-", min: 71, max: 75.999 },
      { grade: "B+", min: 66, max: 70.999 },
      { grade: "B", min: 61, max: 65.999 },
      { grade: "B-", min: 56, max: 60.999 },
      { grade: "C+", min: 51, max: 55.999 },
      { grade: "C", min: 46, max: 50.999 },
      { grade: "D", min: 40, max: 45.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    rules: {
      attemptGrades: ["A+","A","A-","B+","B","B-","C+","C","D","F","I","W"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "puc",
    name: "Premier University",
    shortName: "PUC",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above — A+" },
      { grade: "A", point: 3.75, description: "75% to less than 80% — A" },
      { grade: "A-", point: 3.5, description: "70% to less than 75% — A-" },
      { grade: "B+", point: 3.25, description: "65% to less than 70% — B+" },
      { grade: "B", point: 3.0, description: "60% to less than 65% — B" },
      { grade: "B-", point: 2.75, description: "55% to less than 60% — B-" },
      { grade: "C+", point: 2.5, description: "50% to less than 55% — C+" },
      { grade: "C", point: 2.25, description: "45% to less than 50% — C" },
      { grade: "D", point: 2.0, description: "40% to less than 45% — D" },
      { grade: "F", point: 0.0, description: "Less than 40% — F" },
      { grade: "I", point: 0.0, description: "Incomplete" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    rules: {
      attemptGrades: ["A+","A","A-","B+","B","B-","C+","C","D","F","I"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "seu",
    name: "Southeast University",
    shortName: "SEU",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawal" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `Southeast University grading (UGC-aligned). GPA/CGPA = (Σ (grade point × credit)) / (Σ credit). Courses with D or higher count as earned credits. F is failing and should be repeated.`,
    rules: {
      attemptGrades: ["A+","A","A-","B+","B","B-","C+","C","D","F","I","W"],
      earnedGradeMin: "D",
      degreeRequirementCgpa: 2.25,
    },
  },
  {
    id: "stamforduniversity",
    name: "Stamford University Bangladesh",
    shortName: "Stamford",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdraw" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `Stamford University grading summary:\n\n- Continuous and summative assessments contribute to the final course grade (quizzes, participation, attendance, assignments, case studies, midterm and final exams).\n- For 3-credit courses at least four class tests (best two counted); for 2-credit courses at least three class tests (best two counted).\n- After midterm, the 1st part of course is considered completed and not carried to final.\n\nGPA/CGPA calculation: GPA = (Σ (grade points × credit hours)) / (Σ credit hours).\n\nAttendance marks (added to score):\n90-100 => 10, 85-89 => 9, 80-84 => 8, 75-79 => 7, 70-74 => 6, 65-69 => 5, 60-64 => 4, 55-59 => 3, 50-54 => 2, 45-49 => 1, <45 => 0.\n\nAcademic probation: Undergraduate/graduate/postgraduate students with GPA < 2.50 will be placed on probation for one semester; failure to improve will result in dismissal.`,
    rules: {
      attemptGrades: ["A+","A","A-","B+","B","B-","C+","C","D","F","I","W"],
      earnedGradeMin: "D",
      probationCgpa: 2.5,
    },
  },
  {
    id: "sub",
    name: "State University of Bangladesh",
    shortName: "SUB",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawal" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `State University of Bangladesh uses the UGC 4.0 grading scale. CGPA is computed as the weighted average of grade points: CGPA = (Σ (grade point × credit hours)) / (Σ credit hours). Minimum CGPA required to graduate: 2.50.`,
    rules: {
      attemptGrades: ["A+","A","A-","B+","B","B-","C+","C","D","F","I","W"],
      earnedGradeMin: "D",
      degreeRequirementCgpa: 2.5,
    },
  },
  {
    id: "cityuniversity",
    name: "City University",
    shortName: "CityU",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% - 100%" },
      { grade: "A", point: 3.75, description: "75% - 79.99%" },
      { grade: "A-", point: 3.5, description: "70% - 74.99%" },
      { grade: "B+", point: 3.25, description: "65% - 69.99%" },
      { grade: "B", point: 3.0, description: "60% - 64.99%" },
      { grade: "B-", point: 2.75, description: "55% - 59.99%" },
      { grade: "C+", point: 2.5, description: "50% - 54.99%" },
      { grade: "C", point: 2.25, description: "45% - 49.99%" },
      { grade: "D", point: 2.0, description: "40% - 44.99%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
      { grade: "I", point: 0.0, description: "Incomplete" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `City University follows the UGC 4.0 grading scale. Course evaluation includes final exams, terminal exams, assignments, term papers, and class tests. Failed courses (F) must be retaken; when a course is retaken the higher grade is retained on the transcript for improved grade. CGPA is calculated as CGPA = (Σ (grade point × credit)) / (Σ credit).`,
    rules: {
      attemptGrades: ["A+","A","A-","B+","B","B-","C+","C","D","F","I"],
      earnedGradeMin: "D",
      // CityU policy: when a course is retaken, the higher grade is kept on transcript
      lastAttemptWins: false,
    },
  },
  {
    id: "primeuniversity",
    name: "Prime University",
    shortName: "PrimeU",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80.00 - 100.00" },
      { grade: "A", point: 3.75, description: "75.00 - 79.99" },
      { grade: "A-", point: 3.5, description: "70.00 - 74.99" },
      { grade: "B+", point: 3.25, description: "65.00 - 69.99" },
      { grade: "B", point: 3.0, description: "60.00 - 64.99" },
      { grade: "B-", point: 2.75, description: "55.00 - 59.99" },
      { grade: "C+", point: 2.5, description: "50.00 - 54.99" },
      { grade: "C", point: 2.25, description: "45.00 - 49.99" },
      { grade: "D", point: 2.0, description: "40.00 - 44.99" },
      { grade: "F", point: 0.0, description: "0.00 - 39.99" },
      { grade: "I", point: 0.0, description: "Incomplete" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `Prime University grading (summary): numeric marks map to letter grades and grade points as listed. CGPA is computed as the weighted average: CGPA = (Σ (grade point × credit hours)) / (Σ credit hours).`,
    rules: {
      attemptGrades: ["A+","A","A-","B+","B","B-","C+","C","D","F","I"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "nub",
    name: "Northern University Bangladesh",
    shortName: "NUB",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawal" },
      { grade: "X", point: 0.0, description: "Absent from final exam" },
      { grade: "Y", point: 0.0, description: "Caught for unfair means" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `Northern University Bangladesh (NUB) grading summary:\n\nGPA = (Σ (grade point × credit hours)) / (Σ credit hours attempted).\n\nExample:\nCourse\tCr.Hr\tGrade\tGP\tTGP\nENG101\t3\tA+\t4.00\t12.00\nMTH101\t3\tB\t3.00\t9.00\nPHY101\t3\tC\t2.25\t6.75\nHUM101\t3\tF\t0.00\t0.00\nTotal Credit Hours: 12\nTotal Grade Points: 27.75\nGPA = 27.75 / 12 = 2.31\n\nCGPA is computed similarly using cumulative totals of grade points and credit hours earned up to that time.`,
    rules: {
      attemptGrades: ["A+","A","A-","B+","B","B-","C+","C","D","F","I","W","X","Y"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "southern",
    name: "Southern University Bangladesh",
    shortName: "Southern",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
      // Administrative/status codes
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "CR", point: 0.0, description: "Credit" },
      { grade: "W", point: 0.0, description: "Withdraw" },
      { grade: "R", point: 0.0, description: "Repeat" },
      { grade: "AU", point: 0.0, description: "Audit" },
      { grade: "S", point: 0.0, description: "Satisfactory" },
      { grade: "U", point: 0.0, description: "Unsatisfactory" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `Southern University Bangladesh uses the UGC-approved 4.0 grading scale.\n\nGPA = (Σ (grade point × credit hours)) / (Σ credit hours attempted).\n\nGrade/status codes: I (Incomplete), CR (Credit), W (Withdraw), R (Repeat), AU (Audit), S (Satisfactory), U (Unsatisfactory), etc.\n\nNotes: Courses with status codes such as CR, W, AU, S, U, I are generally excluded from GPA computation per university policy. Transfer or guest students must meet transfer CGPA / credit requirements determined at admission.`,
    rules: {
      attemptGrades: ["A+","A","A-","B+","B","B-","C+","C","D","F"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "gub",
    name: "Green University of Bangladesh",
    shortName: "GUB",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above — Excellent" },
      { grade: "A", point: 3.75, description: "75% to less than 80% — Excellent" },
      { grade: "A-", point: 3.5, description: "70% to less than 75% — Very Good" },
      { grade: "B+", point: 3.25, description: "65% to less than 70% — Good" },
      { grade: "B", point: 3.0, description: "60% to less than 65% — Good" },
      { grade: "B-", point: 2.75, description: "55% to less than 60% — Good" },
      { grade: "C+", point: 2.5, description: "50% to less than 55% — Average" },
      { grade: "C", point: 2.25, description: "45% to less than 50% — Average" },
      { grade: "D", point: 2.0, description: "40% to less than 45% — Below Average" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failing" },
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawal" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `GUB follows the UGC uniform grading system.\n\nGrade points in each course = (numerical equivalent × credit hours).\nCGPA = (Σ grade points) / (Σ credit hours attempted).\n\nRetake/Repeat policy: student may repeat a failed course within next two trimesters; the higher grade will be used in CGPA calculation. I grades convert to F if not improved within two trimesters.`,
    rules: {
      attemptGrades: ["A+","A","A-","B+","B","B-","C+","C","D","F","I","W"],
      earnedGradeMin: "D",
      // GUB: higher grade on retake is used (as stated in policy)
      lastAttemptWins: false,
      // Probation and dismissal thresholds
      probationCgpa: 2.0,
      probationConsecutiveSemestersAllowed: 3,
      degreeRequirementCgpa: 2.0,
    },
  },
];
