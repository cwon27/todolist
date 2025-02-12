import { useState } from "react";
import styled from "styled-components";

const EditBlock = styled.div`
  display: flex;
  padding: 12px 0px;
`;

const EditInput = styled.input`
  flex: 1;
  padding: 8px 15px;
  font-size: 21px;
  border: 1px solid #dedede;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-left: 5px;
`;

const EditButton = styled.button`
  margin-left: 5px;
  padding: 8px 10px;
  background-color: #58d7eb;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #53cbde;
  }
`;

interface TodoEditProps {
  editText: string;
  onComplete: (editText: string) => void;
  onCancel: () => void;
}

function TodoEdit({ editText, onComplete, onCancel }: TodoEditProps) {
  //수정 text 상태 관리
  const [newText, setNewText] = useState(editText);

  const editComplete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    //text가 비어있지 않으면
    if (newText.trim() !== "") {
      onComplete(newText);
    }
  };

  return (
    <EditBlock>
      <EditInput
        type="text"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        placeholder="할 일을 수정한 후, 수정버튼을 누르세요."
      />
      <ButtonGroup>
        <EditButton onClick={editComplete}>수정</EditButton>
        <EditButton onClick={onCancel}>취소</EditButton>
      </ButtonGroup>
    </EditBlock>
  );
}

export default TodoEdit;
