import styled from 'styled-components';

export const CardStyled = styled.div<{ show: boolean }>`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-top: 15px;
  opacity: ${(props) => (props.show ? 1 : 0)};
  width: 100%;
  max-width: 50%;
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

export const CardBodyStyled = styled.div`
  backdrop-filter: blur(15px);
  border-radius: 15px;
`;

export const TitleStyled = styled.h5`
  font-size: 1.5rem;
  color: #fff;
  font-weight: bold;
`;

export const TextStyled = styled.p`
  font-size: 1.1rem;
  color: #fff;
`;

export const IconStyled = styled.img`
  width: 50px;
  height: 50px;
  display: block;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
`;
