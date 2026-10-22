import './App.css'
import { useState } from 'react';

type Goal = {
  id: number;
  name: string;
  goalAmount: number;
};

function App() {
  const [goals, setGoals] = useState<[Goal[]]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const getGoals = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/goals');
      const data = await response.json();
    }
    

    // 응답 본문(Body) = 서버가 보내준 실제 데이터
    // response.json() = JSON 형식의 응답 본문을 javaScript에서 
    // 사용할 수 있는 값으로 변환 

    /**
     * response.json()은 HTTP응답 본문을 읽고, 
     * JSON 형식의 데이터를 JavaScript에서 사용할 수 있는 값으로 
     * 변환하는 비동기 매서드 이다. 
     */
    
    setGoals(data);
  };

  return (
    <div>
      <h1>FIFY</h1>
      <button onClick={getGoals}>목표 불러오기</button>

      <h2>나의 목표</h2>
        {goals.map((goal) => {
          return(
          <div key={goal.id}>
            <p>{goal.name}</p>
            <p>{goal.goalAmount.toLocaleString('ko-KR')}원</p>
          </div>
          )
        })}
    </div>
  )
}

export default App
