import styled from 'styled-components';

export const InputContainer = styled.div`
  /* width: 100%; */
  display: flex;
  padding: 10px;
  background-color: white;
  border-top: 1px solid #ddd;
  border-radius: 0 0 20px 20px;
`;

export const Input = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: none;
  border-radius: 20px;
  background-color: #f0f0f0;
  font-size: 16px;
  outline: none;
`;

export const SendButton = styled.button`
  background-color: #0078ff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 50%;
  margin-left: 10px;
  cursor: pointer;
  font-size: 16px;
`;