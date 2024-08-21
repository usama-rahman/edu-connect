"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import QuizModal from "./quiz-modal";
import AskSvg from "./svg/AskSvg";

export function Quiz({ courseId, quizSet, isTaken }) {
  const [open, setOpen] = useState(false);

  const quizzes = quizSet.quizIds.map((quiz) => {
    return {
      id: quiz._id.toString(),
      title: quiz.title,
      description: quiz.description,
      options: quiz.options.map((option) => {
        return {
          label: option.text,
          isTrue: option.is_correct,
        };
      }),
    };
  });

  return (
    <>
      <div class="max-w-[270px] bg-white border border-border rounded-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
        <div className="flex h-32 items-center justify-center bg-gradient-to-r from-sky-500 to-indigo-500 px-6 text-center">
          <span className="text-lg font-semibold text-white">
            {quizSet.title}
          </span>
        </div>
        <div class="p-4">
          <div className="flex items-center justify-between gap-6 text-sm mb-2 font-medium text-gray-700">
            <span>Total Mark</span>
            <Badge className="bg-success/20 text-primary hover:bg-success/20">
              {quizSet.quizIds ? quizSet.quizIds.length * 5 : 0}
            </Badge>
          </div>
          <p class="mb-4 font-normal text-gray-500 dark:text-gray-400 text-sm">
            Taking the quiz is optional but it is highly recommended.
          </p>
          <Button
            className="flex gap-2 capitalize border-sky-500 text-sky-500 hover:text-sky-500 hover:bg-sky-500/5 w-full"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            <AskSvg />

            <span>{isTaken ? `Quiz Taken` : `Take Quiz`}</span>
          </Button>
        </div>
      </div>
      <QuizModal
        courseId={courseId}
        quizSetId={quizSet._id.toString()}
        quizzes={quizzes}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
