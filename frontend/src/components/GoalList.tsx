import type { Goal } from '../types/goal';

type GoalListProps = {
  goals: Goal[];
};

/** 
 * 구조분해 할당이란?
 * 객체나 배열에서 원하는 값을 꺼내 변수에 담는 문법
 * 리엑트는 컴포넌트에 전달한 속성들을 하나의 Props 객체로 묶어서 전달함
 * 
*/
function GoalList({ goals }: GoalListProps) {
  return (
    <div>
      <h2>나의 목표</h2>
      {goals.map((goal) => {
        return (
          <div key={goal.id}>
            <p>{goal.name}</p>
            <p>{goal.goalAmount.toLocaleString("ko-KR")}원</p>
          </div>
        );
      })}
    </div>
  );
}

export default GoalList;
