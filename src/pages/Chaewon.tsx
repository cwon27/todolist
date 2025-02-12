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

export interface Todo {
  id: number;
  text: string;
  done: boolean;
  //달력 추가
  date: string;
}

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
  //할일 내역
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      //로컬에 저장된 할일 내역이 있는 경우
      return JSON.parse(savedTodos);
    }
    //없는 경우 -> 더미? 아예 안나오게 고민고민
    return dummyData;
  });

  //다음 아이디가 될 값
  const nextId = useRef<number>(todos.length);

  //localStorage에 내역 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //날짜 선택 상태 관리 -> 초기값은 오늘 날짜
  const [selectDate, setSelectDate] = useState<Date>(new Date());

  //내역 추가(Create)
  const onCreate = (text: string) => {
    const newTodo: Todo = {
      id: nextId.current,
      text: text,
      done: false,
      date: selectDate.toISOString().split("T")[0],
    };

    //이전값 보정을 위해 setTodos([newTodo, ...todos]); 말고 아래처럼 작성
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
    //id값 1증가 -> 중복 X
    nextId.current += 1;
  };

  //내역 완료 toggle
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

  //날짜에 맞는 내역만 나오게
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
