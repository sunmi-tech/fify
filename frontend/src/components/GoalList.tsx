import { useState } from "react";
import type { Goal, UpdateGoalInput } from "../types/goal";

type GoalListProps = {
  goals: Goal[];

  // TODO: onEditGoal 함수 타입 추가
  onEditGoal: (id: number, input: UpdateGoalInput) => Promise<void>;
};

/**
 * 구조분해 할당이란?
 * 객체나 배열에서 원하는 값을 꺼내 변수에 담는 문법
 * 리엑트는 컴포넌트에 전달한 속성들을 하나의 Props 객체로 묶어서 전달함
 *
 */
function GoalList({ goals, onEditGoal }: GoalListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editError, setEditError] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  return (
    <div>
      <h2>나의 목표</h2>
      {goals.map((goal) => {
        return (
          <div key={goal.id}>
            <p>{goal.name}</p>
            <p>{goal.goalAmount.toLocaleString("ko-KR")}원</p>
            {/* 
              onClick={() => {}} 방식으로 화살표 함수를 사용하는 이유는
              onClick에 함수를 전달받아 보관하고 있다가 버튼을 클릭하면 실행하지만
              화살표함수를 사용하지않고 바로
              onClick={onEditGoal()}을 사용하면 버튼이 클릭되기 전에 컴포넌트가 랜더링되는
              과정에서 바로 수정 API 요청이 발생한다.

              
            */}
            {editingId === goal.id ? (
              <div>
                <input
                  value={editName}
                  onChange={(event) => setEditName(event.target.value)}
                />
                <input
                  type="number"
                  value={editAmount}
                  onChange={(event) => setEditAmount(event.target.value)}
                />

                <button
                  onClick={() => {
                    setEditingId(null);
                  }}
                >
                  취소
                </button>
                <button
                  disabled={isSaving}
                  onClick={async () => {
                    setEditError(null);

                    if (editName.trim() === "") {
                      setEditError("목표 이름을 입력해 주세요.");
                      return;
                    }

                    const goalAmount = Number(editAmount);
                    if (!Number.isInteger(goalAmount) || goalAmount <= 0) {
                      setEditError("올바른 목표 금액을 입력해 주세요.");
                      return;
                    }
                    
                    setIsSaving(true);
                    try {
                      await onEditGoal(goal.id, {
                        name: editName,
                        goalAmount: goalAmount,
                      });
                      setEditingId(null);
                    } catch (error) {
                      console.log(error);
                      setEditError("목표 수정에 실패했습니다.");
                    } finally {
                      setIsSaving(false);
                    }
                  }}
                >
                  {isSaving ? "저장중" : "저장"}
                </button>
                {editError && <p role="alert">{editError}</p>}
              </div>
            ) : (
              <button
                onClick={() => {
                  setEditingId(goal.id);
                  setEditName(goal.name);
                  setEditAmount(String(goal.goalAmount));
                  setEditError(null);
                }}
              >
                수정
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default GoalList;
