import styled from 'styled-components';

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 87%;
  /* width: 100%; */
  background-color: #f4f4f4;
  padding: 20px;
  overflow-y: auto;
  border-radius: 20px 20px 0 0;
`;

export const Chat = styled.div<{ isUser: boolean }>`
  max-width: 60%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 15px;
  text-align: ${({ isUser }) => (isUser ? 'right' : 'left')};
  background-color: ${({ isUser }) => (isUser ? '#0078FF' : '#ECECEC')};
  color: ${({ isUser }) => (isUser ? 'white' : 'black')};
  align-self: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
`;