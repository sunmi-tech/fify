import type { Goal } from "../types/goal";

// 서버에서 목표 목록을 요청하고, 성공하면 Goal[]반환하는 역할

// 비동기 작업이 성공적으로 완료되면 Goal 배열을 결과로 제공한다는 반환 타입
// JavaScript에서는 async 함수는 항상 Promise를 반환하도록 정의 
// Promise는 비동기 작업의 결과를 나타내는 객체 
// await은 Promise가 성공적으로 완료될 때까지 기다렸다가 결과 값을 꺼내주는 역할을 함
// const result = fetchGoal(); -> 반환값은 Promise<Goal[]>
// const result = await fetchGoal(); -> 반환값은 Goal[]
export async function fetchGoals(): Promise<Goal[]> {
    const response = await fetch('http://localhost:3000/goals');

    if(!response.ok){
        throw new Error('API 요청에 실패했습니다.');
    } 

    const data = await response.json();

    // 이 data는 Goal[] 타입으로 취급해줘. 라고하는 타입단언
    // 실제 데이터가 올바른지 검사는 하지 않음
    return data as Goal[];
}