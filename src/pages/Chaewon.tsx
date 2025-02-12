import { createGlobalStyle } from "styled-components";
import TodoTemplate from "../components/chaewon/TodoTemplate";
import TodoHead from "../components/chaewon/TodoHead";
import TodoList from "../components/chaewon/TodoList";
import TodoCreate from "../components/chaewon/TodoCreate";
import { useEffect, useRef, useState } from "react";

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

//더미데이터 -> 예시로 사용
const dummyData: Todo[] = [
  {
    id: 0,
    text: "React Todo list 완성하기",
    done: false,
    //오늘 날짜
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: 1,
    text: "신입사원 교육 문제 다 풀기",
    done: false,
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: 2,
    text: "React로 게시판 만들기",
    done: false,
    date: new Date().toISOString().split("T")[0],
  },
];

function Chaewon() {
  //할일 내역 상태 관리리
  //todos의 타입은 Todo[]이고 저장된 내역이 있으면 그걸로 초기화 없으면 더미로 초기화
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      //localStorage에서 데이터 불러옴
      return JSON.parse(savedTodos);
    }
    //데이터 없는 경우 -> 더미 나오게 -> 지울까 생각중
    return dummyData;
  });

  //다음 아이디가 될 값
  const nextId = useRef<number>(todos.length);

  //useEffect : React component가 렌더링 될 때마다 특정 작업을 실행할 수 있도록 하는 리액트 hook
  //따라서 todos가 변경될 때마다 localStorage에 자동 저장. 새로고침 해도 데이터 유지지
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //날짜 선택 상태 관리 -> 초기화값은 오늘 날짜
  const [selectDate, setSelectDate] = useState<Date>(new Date());

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
        <TodoHead
          todos={filterTodos}
          selectDate={selectDate}
          setSelectDate={setSelectDate}
        />
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
