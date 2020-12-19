import styled from "styled-components";

export default styled.button`
  background-color: ${(props) => props.theme.splash};
  border-color: transparent;
  color: ${(props) => props.theme.secondaryColor};
  width: stretch;
  padding: 4px;
  border-radius: 2px;
`;
