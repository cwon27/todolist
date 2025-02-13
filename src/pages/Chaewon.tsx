import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { selectDateState, todosState } from "@/store/text.atom";
import { createGlobalStyle } from "styled-components";
import TodoTemplate from "../components/chaewon/TodoTemplate";
import TodoHead from "../components/chaewon/TodoHead";
import TodoList from "../components/chaewon/TodoList";
import TodoCreate from "../components/chaewon/TodoCreate";

//import 순서 : react(useEffect같은거) -> reaact주변(DOM같은거) -> 서드파티(캘린더같은거거) -> 커스텀 컴포넌트 -> hooks -> css

const TodoStyle = createGlobalStyle`
  body{
    background-color : #F0FAFC;
  }
`;

//타입 -> typescript이기 때문에 써주기기
export interface Todo {
  id: number;
  text: string;
  done: boolean;
  //달력 추가
  date: string;
}

function Chaewon() {
  //할일 내역 상태 관리리
  //todos의 타입은 Todo[]이고 저장된 내역이 있으면 그걸로 초기화 없으면 빈배열로 초기화
  const [todos, setTodos] = useRecoilState(todosState);

  //날짜 선택 상태 관리 -> 초기화값은 오늘 날짜
  const [selectDate, setSelectDate] = useRecoilState(selectDateState);

  //다음 아이디가 될 값 -> id값이 렌더링되면서 초기화 되는 것을 방지하기 위해 useRef 사용
  const nextId = useRef<number>(todos.length);

  //useEffect : React component가 렌더링 될 때마다 특정 작업을 실행할 수 있도록 하는 리액트 hook
  //따라서 todos가 변경될 때마다 localStorage에 자동 저장. 새로고침 해도 데이터 유지지
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //내역 추가(Create)
  const onCreate = (text: string) => {
    const newTodo: Todo = {
      id: nextId.current,
      text: text,
      done: false,
      date: selectDate.toISOString().split("T")[0], //선택한 날짜로 저장장
    };

    //이전값 보정을 위해 setTodos([newTodo, ...todos]); 말고 아래처럼 작성
    //기존에 있던 값에 새로운 값을 추가해야 하기 때문문
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
    //id값 1증가 -> id값 중복 X
    nextId.current += 1;
  };

  //내역 완료 toggle
  //id가 일치하는 내역을 찾아서 done 상태를 true <-> false로 토클클
  const doneToggle = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id == id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  //내역 삭제(Delete)
  const onRemove = (id: number) => {
    //filter : 원본 배열을 변경하지 않고 새로운 배열을 만들어 반환 -> 상태 업데이트 가능
    //삭제할 일을 제외한 새로운 배열을 생성 -> 삭제 내역만 없어짐짐
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  //내역 수정(Update)
  const onUpdate = (id: number, editText: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id == id ? { ...todo, text: editText } : todo
      )
    );
  };

  //캘린더에서 선택한 날짜에 맞는 내역
  //todos에서 현재 selectDate랑 동일한 날짜의 내역만 필터링링
  const filterTodos = todos.filter(
    (todo) => todo.date == selectDate.toISOString().split("T")[0]
  );

  return (
    <>
      <TodoStyle />
      <TodoTemplate>
        <TodoHead todos={filterTodos} setSelectDate={setSelectDate} />
        <TodoList
          todos={filterTodos}
          doneToggle={doneToggle}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
        <TodoCreate onCreate={onCreate} />
      </TodoTemplate>
    </>
  );
}

export default Chaewon;
