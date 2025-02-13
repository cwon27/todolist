import { Todo } from "@/pages/Chaewon";
import { atom } from "recoil";

export const textState = atom({
  key: "textState",
  default: "default text",
});

//Chaewon.tsx에서 상태 관리 하는 것 -> todos, selectDate
const getSavedTodos = () => {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    return JSON.parse(savedTodos);
  }
  return [];
};

export const todosState = atom<Todo[]>({
  key: "todosState",
  default: getSavedTodos(),
});

export const selectDateState = atom<Date>({
  key: "selectDateState",
  default: new Date(),
});

//TodoHead.tsx에서 상태 관리 하는 것 -> calendarOpen
export const calendarOpenState = atom<boolean>({
  key: "calendarOpenState",
  default: false,
});
