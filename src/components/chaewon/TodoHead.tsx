import styled from "styled-components";
import type { Todo } from "../../pages/Chaewon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/calendar.css";
import { useState } from "react";

const TodoHeadBlock = styled.div`
  padding: 48px 32px 24px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40b3;
    font-weight: bold;
  }
  .tasks-left {
    color: #53cbde;
    font-size: 20px;
    margin-top: 20px;
    font-weight: bold;
  }
  .todo-p {
    display: inline-block;
    color: #b5b5b5;
    margin-bottom: 5px;
    cursor: pointer;
  }
  .datepicker {
    position: absolute;
  }
`;

interface TodoHeadProps {
  todos: Todo[];
  //const [selectDate, setSelectDate] = useState<Date>(new Date()); 였으니까 아래처럼 타입 선언언
  selectDate: Date;
  setSelectDate: (date: Date) => void;
}

function TodoHead({ todos, selectDate, setSelectDate }: TodoHeadProps) {
  //캘린더 나와있는지 상태 관리
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);

  //날짜 format
  const week = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const dayWeek = week[selectDate.getDay()];
  const formattedDate = `${selectDate.getFullYear()}년 ${
    selectDate.getMonth() + 1
  }월 ${selectDate.getDate()}일 ${dayWeek}`;

  //할일 몇개 남은지 확인 : done이 false인 요소 필터링 해서 개수 셈
  const unDone = todos.filter((todo) => !todo.done);

  //캘린더 열고 닫기
  const toggleCalendar = () => {
    setCalendarOpen(!calendarOpen);
  };

  //날짜 선택
  const calendarHandler = (date: Date | null) => {
    if (date) {
      setSelectDate(date);
      setCalendarOpen(false);
    }
  };

  return (
    <TodoHeadBlock>
      <p className="todo-p" onClick={toggleCalendar}>
        🗓️ TODO LIST
      </p>
      {calendarOpen && (
        <DatePicker
          fixedHeight
          selected={selectDate}
          onChange={calendarHandler}
          inline
        />
      )}
      <h1>{formattedDate}</h1>
      <div className="tasks-left">할 일이 {unDone.length}개 남았습니다!</div>
    </TodoHeadBlock>
  );
}

export default TodoHead;
