import { useState } from "react";
import type { Goal } from "../types/goal";
import { fetchGoals } from "../api/goal";

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  const getGoals = async () => {
    setError(null);
    setIsLoading(true);
    try {
      // 오류가 발생할 수 있는 코드
      // await은 Promise가 거부되면 그 에러를 현재 위치에서 던져진 것 처럼 전달을
      // 하기 때문에 catch에서 에러를 잡을 수 있음.
      const data = await fetchGoals();

      setGoals(data);
      setHasLoaded(true);
    } catch (error) {
      // 오류가 발생했을 때 실행
      console.log(error);
      setError("목표를 불러오지 못했습니다.");
    } finally {
      // 요청이 끝났다는 의미이지 성공했다는 의미는 아님
      setIsLoading(false);
    }

    // 응답 본문(Body) = 서버가 보내준 실제 데이터
    // response.json() = JSON 형식의 응답 본문을 javaScript에서
    // 사용할 수 있는 값으로 변환

    /**
     * response.json()은 HTTP응답 본문을 읽고,
     * JSON 형식의 데이터를 JavaScript에서 사용할 수 있는 값으로
     * 변환하는 비동기 매서드 이다.
     */
  };

  // 객체 리터럴의 속성 축약 문법으로
  // return { goals: goals, setGoals: setGoals }; 와 같은 의미
  return {
    goals,
    isLoading,
    error,
    hasLoaded,
    getGoals
  };
}
