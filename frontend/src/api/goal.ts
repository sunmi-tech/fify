import type { Goal, CreateGoalInput, UpdateGoalInput } from "../types/goal";

// 서버에서 목표 목록을 요청하고, 성공하면 Goal[]반환하는 역할

// 비동기 작업이 성공적으로 완료되면 Goal 배열을 결과로 제공한다는 반환 타입
// JavaScript에서는 async 함수는 항상 Promise를 반환하도록 정의
// Promise는 비동기 작업의 결과를 나타내는 객체
// await은 Promise가 성공적으로 완료될 때까지 기다렸다가 결과 값을 꺼내주는 역할을 함
// const result = fetchGoal(); -> 반환값은 Promise<Goal[]>
// const result = await fetchGoal(); -> 반환값은 Goal[]
export async function fetchGoals(): Promise<Goal[]> {
  const response = await fetch("http://localhost:3000/goals");

  if (!response.ok) {
    throw new Error("API 요청에 실패했습니다.");
  }

  const data = await response.json();

  // 이 data는 Goal[] 타입으로 취급해줘. 라고하는 타입단언
  // 실제 데이터가 올바른지 검사는 하지 않음
  return data as Goal[];
}

export async function createGoal(input: CreateGoalInput): Promise<Goal> {
  const response = await fetch("http://localhost:3000/goals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("API 요청에 실패했습니다.");
  }

  const data = await response.json();

  return data as Goal;
}

export async function updateGoal(id: number, input: UpdateGoalInput): Promise<Goal>{
  const response = await fetch(`http://localhost:3000/goals/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("API 요청에 실패했습니다.")
  }

  // await을 붙이면 Promise가 실행 될때까지 기다린 다음, 파싱된 데이터를 data에 저장
  const data = await response.json();

  return data as Goal;

  /**
   * 위 함수들에서 await이 두번 사용되는 이유는 기다려야 하는 비동기 함수가 2개 이기때문이다.
   * const response = await fetch(url);
   * => fetch는 서버에 HTTP 요청을 보내는 함수 
   * 
   * const data = await response.json();
   * => 응답 본문을 읽고 JSON을 JavaScript 값으로 파싱하는 매서드도 비동기 함수
   */
}