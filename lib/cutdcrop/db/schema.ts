import type { Database } from "./database.types";

export type SummaryStatus = Database["public"]["Enums"]["summary_status"];
export type QuizStatus = Database["public"]["Enums"]["quiz_status"];

export type Summary = Database["public"]["Tables"]["summaries"]["Row"];
export type Quiz = Database["public"]["Tables"]["quizzes"]["Row"];
