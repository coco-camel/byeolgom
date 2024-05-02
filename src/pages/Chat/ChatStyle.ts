import styled from 'styled-components';

export const LoadMoreDiv = styled.div`
  height: 10px;
`;

export const PastContentContainer = styled.div`
  position: relative;
  flex-grow: 1;
  margin: 0 10px;
  overflow: hidden;
  div {
    color: #e2e2e2;
    font-size: 14px;
    padding: 2px 0;
    word-wrap: break-word;
  }
  :nth-child(1) {
    word-wrap: break-word;
    font-size: 10px;
  }
`;

export const PastContentsContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const LockerListWrap = styled.div`
  position: relative;
  width: 100%;
  height: 85%;
  overflow: auto;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  @media (max-width: 640px) {
    width: 90vw;
    height: 85vh;
  }
`;

export const PastContentWrap = styled.div<{
  $hasEntered?: boolean;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;
  background-color: ${(props) => (props.$hasEntered ? 'none' : '#eeeeee20')};
  .content {
    max-width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const PastContentNone = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
`;

export const PageHeader = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #eee;
  font-weight: 300;
`;

export const NoneText = styled.div`
  font-size: 13px;
  font-size: light;
  color: #8b8b8b;
  margin-top: 6px;
`;

export const UnreadIndicator = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  right: 0;
  top: 0;
  border-radius: 50%;
  background-color: #d30000;
`;

export const ChatDetailHeader = styled.div`
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 20px;
  justify-content: space-between;
`;

export const ChatroomContainer = styled.div`
  position: relative;
  width: 100%;
  height: 88%;
`;

export const PastContentButton = styled.button`
  width: 86px;
  height: 27px;
  border-radius: 100px;
  background-color: #eeeeee;
  font-size: 12px;
  &:hover {
    color: #ffffff;
    background-color: #e88439;
  }
`;

export const ChatContainer = styled.div`
  height: 90%;
  padding: 20px;
  overflow-y: auto;
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const ChatInput = styled.input`
  width: 70%;
  height: 46px;
  padding: 10px;
  font-size: 12px;
  border-radius: 15px;
`;

export const SendButton = styled.button`
  width: 60px;
  height: 46px;
  padding: 10px;
  font-size: 12px;
  border-radius: 25px;
  background-color: #2f4768;
  color: #eee;
  border: none;
  cursor: pointer;
  margin-left: 5px;

  &:hover {
    background-color: #253954;
  }
`;

export const AcceptedContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
  margin-top: -40px;

  .span {
    font-size: 12px;
  }
`;

export const BorderBox = styled.div`
  width: 70%;
  height: 10px;
  border-top: white 1px solid;
`;

export const AcceptedButton = styled.button<{
  $backColor: string;
  $color: string;
}>`
  width: 70px;
  height: 28px;
  border-radius: 20px;
  font-size: 12px;
  background-color: ${(props) => props.$backColor || '#eee'};
  color: ${(props) => props.$color || '#eee'};
`;

export const MessageContainer = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 5px;
  width: 100%;
`;

export const MessageBubble = styled.div`
  display: flex;
  justify-content: flex-end;
  max-width: 184px;
  font-size: 12px;
  color: #eee;
  border-radius: 20px;
  padding: 10px;

  .mymessage {
    background-color: #2f4768;
    word-wrap: break-word;
    align-self: flex-end;
  }
  .usermessage {
    background-color: #121212;
    word-wrap: break-word;
    align-self: flex-end;
  }
`;
