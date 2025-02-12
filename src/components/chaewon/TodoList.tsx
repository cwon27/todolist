import styled from "styled-components";
import TodoItem from "./TodoItem";
import type { Todo } from "../../pages/Chaewon";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px 0px;
  margin-bottom: 70px;
  overflow-y: auto;
`;

interface TodoListProps {
  todos: Todo[];
  doneToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onUpdate: (id: number, editText: string) => void;
}

function TodoList({ todos, doneToggle, onRemove, onUpdate }: TodoListProps) {
  return (
    <TodoListBlock>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          doneToggle={doneToggle}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      ))}
    </TodoListBlock>
  );
}

export default TodoList;
