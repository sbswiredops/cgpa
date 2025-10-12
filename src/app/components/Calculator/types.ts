import type { GradeScale, UniversityInfo } from "../../data/universities";

export type CourseEntry = {
  credits: number | "";
  grade: string;
  // Optional numeric score (0-100). Used when a university provides numeric->grade ranges
  score?: number | "";
};

export type CalculatorFormValues = {
  includePrevious: boolean;
  previousCgpa: number | "";
  previousCredits: number | "";
  courses: CourseEntry[];
};

export type CalculationSnapshot = {
  currentCredits: number;
  currentGpa: number;
  cumulativeGpa: number | null;
  totalCredits: number;
  savedAt: Date;
  university: UniversityInfo;
};

export type GradingScaleProps = {
  gradingScale: GradeScale[];
};
