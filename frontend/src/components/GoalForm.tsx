import { useState } from "react";
import type { CreateGoalInput } from "../types/goal";

type GoalFormProps = {
  onAddGoal: (input: CreateGoalInput) => Promise<void>;
};

function GoalForm({ onAddGoal }: GoalFormProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // 이벤트의 브라우저 기본 동작을 취소
    event.preventDefault();
    setFormError(null);

    if (name.trim() === "") {
      setFormError("목표 이름을 입력해 주세요.");
      return;
    }

    const goalAmount = Number(amount);

    if (!Number.isFinite(goalAmount) || goalAmount <= 0) {
      setFormError("올바른 목표 금액을 입력해 주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      await onAddGoal({
        name,
        goalAmount,
      });

      setName("");
      setAmount("");
    } catch (error) {
      // catch에서 받은 error는 TypeScript에서 기본적으로 unknown타입
      console.log(error);
      setFormError("목표 생성에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>새 목표 만들기</h2>
      {/**
       * <form> : 여러 입력 필드를 하나의 제출 단위로 묶어줌
       * onSubmbit: 폼이 제출될 때 실행할 함수를 저장
       * type = "submit": 버튼을 클릭하면 폼 제출을 발생시킴
       * HTML form은 기본적으로 제출 시 페이지를 새로고침하거나 다른 페이지로 이동 할 수 있는데
       * React에서는 보통 이 기본 동작을 막고 JavaScript로 제출 과정을 처리
       * 그때 사용하는 매서드가 event.prventDefault()
       */}
      <form onSubmit={handleSubmit}>
        <input
          // value = {name} : input에 표시할 값을 React 상태와 연결
          value={name}
          // event.target은 input 요소를 가르킴
          onChange={(event) => setName(event.target.value)}
        />

        <input
          type="number"
          value={amount}
          // event.target.value 값은 문자열
          onChange={(event) => setAmount(event.target.value)}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "추가하는 중..." : "목표 추가하기"}
        </button>
        {formError && <p role="alert">{formError}</p>}
      </form>
      <p>입력한 목표: {name}</p>
      <p>입력한 목표 금액: {amount}원</p>
    </div>
  );
}

export default GoalForm;
