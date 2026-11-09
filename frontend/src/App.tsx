import "./App.css";
import GoalList from "./components/GoalList";
import { useGoals } from "./hooks/useGoals";

function App() {
  const {
    goals,
    isLoading,
    error,
    hasLoaded,
    getGoals,
  } = useGoals();

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
