import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

type Goal = {
  id: number;
  name: string;
  goalAmount: number;
}

// NestJS가 이 클래스를 관리하고, 필요한 곳에 제공할 수 있게한다.
@Injectable()
export class GoalsService {
  private nextId = 3;

  private readonly goals: Goal[] = [
    {
      id: 1,
      name: '10억만들기',
      goalAmount: 1_000_000_000,
    },
    {
        id: 2,
        name: '여행자금',
        goalAmount: 20_000_000,
    },
  ];

  getGoals(): Goal[] {
    return this.goals;
  }

  getGoal(id: number): Goal{
    // this.goals에서
    // goal.id === id인 Goal을 찾아 반환
    const goal = this.goals.find((goal) => {
        return goal.id === id
    });

    if (goal === undefined) {
        throw new NotFoundException('Goal을 찾을 수 없습니다.');
    }

    return goal;
  }

  createGoal(name: string, goalAmount: number): Goal {

    const exists = this.goals.some(
      (goal) => goal.name === name,
    );

    if(exists){
      throw new ConflictException('중복된 목표 이름입니다.')
    }

    const ids = this.goals.map((goal) => goal.id);
    const newId = this.nextId++;

    // 1. 새 Goal 객체 생성
    const newGoal: Goal = {
      id: newId,
      name: name,
      goalAmount: goalAmount 
    }
    // 2. this.goals 배열에 추가
    // 서버의 목표 목록에 저장
    this.goals.push(newGoal)
    // 3. 생성한 Goal 반환
    // 함수를 호출한 쪽에 생성 결과 전달 
    return newGoal;
  }

  updateGoal(id: number, name?: string, goalAmount?: number): Goal {
    // TODO: this.getGoal(id)를 호출해서
    // 기존 목표를 goal 변수에 저장하기 
    const goal = this.getGoal(id);
    goal.name = name ?? goal.name;
    goal.goalAmount = goalAmount ?? goal.goalAmount;

    return goal;
  }

  deleteGoal(id: number): void {
    const index = this.goals.findIndex(
      (goal) => goal.id === id
    );

    if (index === -1) {
      throw new NotFoundException('삭제할 목표를 찾을 수 없습니다.')
    }

    this.goals.splice(index, 1);
  }
}
