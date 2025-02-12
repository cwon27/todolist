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
  children: React.ReactNode;
}

function TodoTemplate({ children }: TodoTemplateProps) {
  return <TodoTemplateBlock>{children}</TodoTemplateBlock>;
}

export default TodoTemplate;
