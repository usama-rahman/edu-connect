import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addQuizAssessment } from "@/app/actions/quiz";
import QuestionSvg from "./svg/QuestionSvg";
import InfoSvg from "./svg/InfoSvg";

function QuizModal({ courseId, quizSetId, quizzes, open, setOpen }) {
  const router = useRouter();
  const totalQuizes = quizzes?.length;
  const [quizIndex, setQuizIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const lastQuizIndex = totalQuizes - 1;
  const currentQuiz = quizzes[quizIndex];

  // change quiz
  const quizChangeHanlder = (type) => {
    const nextQuizIndex = quizIndex + 1;
    const prevQuizIndex = quizIndex - 1;
    if (type === "next" && nextQuizIndex <= lastQuizIndex) {
      return setQuizIndex((prev) => prev + 1);
    }
    if (type === "prev" && prevQuizIndex >= 0) {
      setQuizIndex((prev) => prev - 1);
    }
  };

  const updateAnswer = (event, quizId, selected) => {
    const checked = event.target.checked;

    const obj = {};
    if (checked) {
      obj["option"] = selected;
    }

    const answer = {
      quizId: quizId,
      options: [obj],
    };

    const found = answers.find((a) => a.quizId === answer.quizId);

    if (found) {
      const filtered = answers.filter((a) => a.quizId !== answer.quizId);
      setAnswers([...filtered, answer]);
    } else {
      setAnswers([...answers, answer]);
    }
  };

  const submitQuiz = async () => {
    try {
      await addQuizAssessment(courseId, quizSetId, answers);
      setOpen(false);
      router.refresh();
      toast.success(`Thanks for submitting the quiz.`);
    } catch (error) {
      toast.error("Problem in submitting the quiz");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[95%] block">
          <div className="pb-4 border-b border-border text-sm">
            <span className="text-success inline-block mr-1">
              {quizIndex + 1} / {quizzes.length}
            </span>
            টি প্রশ্ন
          </div>
          <div className="py-4">
            <h3 className="text-xl font-medium mb-10">
              <QuestionSvg />

              {quizzes[quizIndex].title}
            </h3>
            <span className="text-[10px] block text-end">
              <InfoSvg />
              There is no negative marking.
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-5 mb-6">
            {currentQuiz?.options.map((option) => (
              <div key={option.label}>
                <input
                  className="opacity-0 invisible absolute [&:checked_+_label]:bg-success/5"
                  type="radio"
                  name="answer"
                  onChange={(e, quizId, quizTitle, selected) =>
                    updateAnswer(
                      e,
                      quizzes[quizIndex].id,
                      quizzes[quizIndex].title,
                      option.label
                    )
                  }
                  id={`option-${option.label}`}
                />
                <Label
                  className="border border-border rounded px-2 py-3 block cursor-pointer hover:bg-gray-50 transition-all font-normal"
                  htmlFor={`option-${option.label}`}
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
          <DialogFooter className="flex gap-4 justify-between w-full sm:justify-between">
            <Button
              className="gap-2 rounded-3xl"
              disabled={quizIndex === 0}
              onClick={() => quizChangeHanlder("prev")}
            >
              <ArrowLeft /> Previous Quiz
            </Button>
            <Button
              className="gap-2 rounded-3xl bg-green-600"
              onClick={submitQuiz}
              type="submit"
            >
              Submit
            </Button>
            <Button
              className="gap-2 rounded-3xl"
              disabled={quizIndex >= lastQuizIndex}
              onClick={() => quizChangeHanlder("next")}
            >
              Next Quiz <ArrowRight />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default QuizModal;
