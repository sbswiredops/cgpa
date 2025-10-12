import type { GradeScale, UniversityInfo } from "../../data/universities";

export type CourseEntry = {
  credits: number | "";
  grade: string;
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
