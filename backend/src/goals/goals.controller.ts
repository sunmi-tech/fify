import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { GoalsService } from './goals.service.js';

// /goals로 들어오는 HTTP 요청을 이 Controller가 담당한다.
@Controller('goals')
export class GoalsController {
  // constructor는 클래스로 객체가 만들어질때 실행되는 특별한 매서드
  // private는 property를 GoalsController 내부에서만 사용하겠다는 의미
  // readonly는 한번 설정된 property를 나중에 다른 값으로 다시 할당하지 못하게 함
  constructor(
    private readonly goalsService: GoalsService,
  ) {}

  @Get()
  // 사람이 코드를 읽기 쉽게 우리가 의미 있게 붙이는 것일 뿐인 이름
  // Goal 목록조회 API
  getGoals() {
    // getGoals는 함수 그자체
    // getGoals() 는 함수 실행
    return this.goalsService.getGoals();
  }

  // 여기서 URL parameter이름을 id라고 정의해둠
  @Get(':id')
  // @Param('id')는 Nest JS에게 URL parameter중 'id'라는 이름의 값을 찾아서 바로 뒤의 함수 매개변수에 넣어줘. 라는 의미
  getGoal(@Param('id', ParseIntPipe) id: number) {
    return this.goalsService.getGoal(id);
  }
}
