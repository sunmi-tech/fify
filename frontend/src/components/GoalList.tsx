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
            <button onClick={() => onEditGoal(goal.id, { name: "세계여행" })}>
              수정
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default GoalList;
