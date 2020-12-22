import React, { useState } from "react";
import Registration from "./Registration";
import Login from "./Login";
import styled from "styled-components";

const BackgroundDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

const LoginDiv = styled.div`
  padding: 24px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  background-color: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.secondaryColor};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

export default function LoginPage(props) {
  const [register, setRegister] = useState(false);

  const handleRegister = () => {
    setRegister((prev) => !prev);
  };

  const handleSuccessfulAuth = (data) => {
    props.handleLogin(data);
    props.history.push("/dashboard");
  };

  return (
    <BackgroundDiv className="row">
      <LoginDiv className="col col-md-4">
        {register ? (
          <Registration
            handleSuccessfulAuth={handleSuccessfulAuth}
            handleRegister={handleRegister}
          />
        ) : (
          <Login
            handleSuccessfulAuth={handleSuccessfulAuth}
            handleRegister={handleRegister}
          />
        )}
      </LoginDiv>
    </BackgroundDiv>
  );
}
