import styled, { css } from "styled-components";
import { MdDone, MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import TodoEdit from "./TodoEdit";

//삭제 버튼
const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

//수정 버튼
const Edit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  margin-right: 8px;
  &:hover {
    color: #ffda81;
  }
  display: none;
`;

//내역 한개씩 block
const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0px;
  &:hover {
    ${Remove},${Edit} {
      display: initial;
    }
  }
`;

//체크 버튼
const CheckCircle = styled.div<{ done: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #58d7eb;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #58d7eb;
      color: #58d7eb;
    `}
`;

//내역 텍스트
const Text = styled.div<{ done: boolean }>`
  flex: 1;
  font-size: 21px;
  color: #343a40b3;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

interface TodoItemProps {
  id: number;
  text: string;
  done: boolean;
  doneToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onUpdate: (id: number, editText: string) => void;
}

function TodoItem({
  id,
  done,
  text,
  doneToggle,
  onRemove,
  onUpdate,
}: TodoItemProps) {
  //수정 input 상태 관리 -> 버튼 눌러서 input이 나왔냐 안나왔냐
  const [isEditing, setIsEditing] = useState(false);

  //수정 버튼 클릭
  const editHandlerClick = () => {
    setIsEditing(true);
  };

  //수정 버튼 클릭
  const editHandlerComplete = (editText: string) => {
    onUpdate(id, editText);
    setIsEditing(false);
  };

  //수정 취소 버튼 클릭
  const editHandlerCancel = () => {
    setIsEditing(false);
  };

  //수정 input이 나와있는 상태라면
  if (isEditing) {
    return (
      <TodoEdit
        editText={text}
        onComplete={editHandlerComplete}
        onCancel={editHandlerCancel}
      />
    );
  }

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={() => doneToggle(id)}>
        {done && <MdDone />}
      </CheckCircle>
      <Text done={done}>{text}</Text>
      <Edit onClick={editHandlerClick}>
        <FaEdit />
      </Edit>
      <Remove onClick={() => onRemove(id)}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default TodoItem;
