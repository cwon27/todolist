import styled, { css } from "styled-components";
import { MdAdd } from "react-icons/md";
import React, { useState } from "react";

const CircleButton = styled.button<{ open: boolean }>`
  background: #58d7eb;
  &:hover {
    background: #53cbde;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  ${(props) =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding: 32px 32px 72px;
  border-bottom-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

interface TodoCreateProps {
  onCreate: (text: string) => void;
}

function TodoCreate({ onCreate }: TodoCreateProps) {
  //버튼 toggle 관리
  const [insertBtn, setInsertBtn] = useState(false);

  const onToggle = () => setInsertBtn(!insertBtn);

  //내용 입력(Create)
  const [text, setText] = useState("");

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim() !== "") {
      //text가 비어있지 않으면
      onCreate(text);
      setText("");
      setInsertBtn(false);
    }
  };

  return (
    <>
      {insertBtn && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input
              value={text}
              onChange={onChangeText}
              autoFocus
              placeholder="할 일을 입력 후, Enter를 누르세요."
            />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={insertBtn}>
        <MdAdd />
      </CircleButton>
    </>
  );
}

export default TodoCreate;
