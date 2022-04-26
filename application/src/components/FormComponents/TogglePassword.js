import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 25px;
  position: absolute;
  right: 0;
  bottom: 30%;
`;

export const TogglePassword = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { setInputType } = props;

  useEffect(() => {
    if (showPassword) {
      setInputType("text");
    } else {
      setInputType("password");
    }
  }, [showPassword, setInputType]);

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container onClick={handleClick}>
      {showPassword ? (
        <i className="fa-solid fa-eye"></i>
      ) : (
        <i className="fa-solid fa-eye-slash"></i>
      )}
    </Container>
  );
};
