import './App.css'

function App() {
  const getGoals = async () => {
    const response = await fetch('http://localhost:3000/goals');

    // 응답 본문(Body) = 서버가 보내준 실제 데이터
    // response.json() = JSON 형식의 응답 본문을 javaScript에서 
    // 사용할 수 있는 값으로 변환 

    /**
     * response.json()은 HTTP응답 본문을 읽고, 
     * JSON 형식의 데이터를 JavaScript에서 사용할 수 있는 값으로 
     * 변환하는 비동기 매서드 이다. 
     */
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <h1>FIFY</h1>
      <button onClick={getGoals}>목표 불러오기</button>
    </div>
  )
}

export default App
