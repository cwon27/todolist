import React from "react";
import styled from "styled-components";

const TodoTemplateBlock = styled.div`
  width: 650px;
  height: 700px;

  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.07);

  margin: 130px auto 32px auto;
  display: flex;
  flex-direction: column;
`;

interface TodoTemplateProps {
  children: React.ReactNode; // children 타입을 React.ReactNode로 설정해서 Raect의 모든 요소를 받을 수 있게 함함
}

//TodoTemplate는 children을 props로 받아 내부에서 렌더링
function TodoTemplate({ children }: TodoTemplateProps) {
  return <TodoTemplateBlock>{children}</TodoTemplateBlock>;
}

export default TodoTemplate;
