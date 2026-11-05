import "./App.css";
import { useState } from "react";
import GoalList from "./components/GoalList";
import type { Goal } from './types/goal';

function App() {
  const [goals, setGoals] = useState<[Goal[]]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  const getGoals = async () => {
    setError(null);
    setIsLoading(true);

    try {
      // 오류가 발생할 수 있는 코드
      const response = await fetch("http://localhost:3000/goals");

      if (!response.ok) {
        throw new Error("API 요청에 실패했습니다.");
      }

      const data = await response.json();
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

  return (
    <div>
      <h1>FIFY</h1>
      <button disabled={isLoading} onClick={getGoals}>
        {isLoading ? "불러오는 중 ..." : "목표 불러오기"}
      </button>
      {error && (
        <p>
          {hasLoaded
            ? "최신정보를 불러오지 못했습니다. 이전에 조회한 데이터를 표시하고 있어요"
            : "목표를 불러오지 못했습니다. 다시 시도해 주세요."}
        </p>
      )}
      {/**
        왼쪽 goals -> 자식 컴포넌트에 전달하는 props 이름
        오른쪽 { goals } -> App 에서 useState로 관리하는 상태변수
       */}
      <GoalList goals={goals} />
    </div>
  );
}

export default App;
