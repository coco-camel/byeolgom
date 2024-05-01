import styled from 'styled-components';

export const Button = styled.button`
  font-size: 16px;
  border: none;
  cursor: pointer;
  padding-bottom: 15px;
  color: #b0b0b0;
  width: 50%;
  border-bottom: 2px solid #b0b0b0;

  &.active {
    color: #e2e2e2;
    border-bottom: 2px solid #eee;
  }
`;

export const LockerTabWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 54px;
  width: 100%;
  box-sizing: border-box;
`;
export const PastContentHeader = styled.div<{
  $padding?: string;
  $content?: string;
}>`
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.$content || 'none'};
  padding: ${(props) => props.$padding || '0'};
  span {
    font-size: 16px;
    color: #eee;
    font-weight: 300;
  }
`;

export const PastContentNone = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

export const NoneText = styled.div`
  font-size: 13px;
  font-size: light;
  color: #8b8b8b;
  margin-top: 6px;
`;

export const LoadMoreDiv = styled.div`
  height: 10px;
`;

export const PastContentContainer = styled.div`
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
`;

export const LockerListWrap = styled.div`
  position: relative;
  width: 100%;
  height: 70%;
  overflow: auto;
  padding: 0 20px;
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
    height: 75vh;
  }
`;

export const PastContentWrap = styled.div<{
  $margin?: string;
  $padding?: string;
  $backgroundcolor?: string;
}>`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.$backgroundcolor || 'none'};
  margin: ${(props) => props.$margin || '0'};
  padding: ${(props) => props.$padding || '0'};
  .content {
    max-width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

interface CommentContentProps {
  $count: number;
  $theme: boolean;
}

export const CommentContent = styled.div<CommentContentProps>`
  padding: 10px;
  width: 70%;
  margin-top: 15px;
  border-radius: 10px;
  min-width: 130px;
  word-wrap: break-word;
  font-size: 12px;
  background-color: ${(props) =>
    props.$count % 2 === 0
      ? props.$theme
        ? 'rgba(0, 0, 0, 0.6)'
        : 'rgba(142, 180, 238, 0.6)'
      : props.$theme
        ? 'rgba(47, 71, 104, 0.6)'
        : 'rgba(255,255,255,0.7)'};
  margin-left: ${(props) => (props.$count % 2 === 0 ? '0' : 'auto')};
  margin-right: ${(props) => (props.$count % 2 === 0 ? 'auto' : '0')};
`;

export const CommentLayOut = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const CommentListWrap = styled.div`
  width: 100%;
  height: 370px;
  overflow: auto;
  padding: 0 20px;
  box-sizing: border-box;
  position: relative;
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
    width: 100vw;
    height: 75vh;
  }
`;

interface CommentRocketStateProps {
  $text?: boolean;
}

export const CommentRocketState = styled.div<CommentRocketStateProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${({ $text }) =>
    $text ? 'rgba(255, 255, 255, 0.2)' : 'inherit'};
  margin: ${({ $text }) => ($text ? '20px auto' : '10px auto')};
  padding: ${({ $text }) => ($text ? '10px' : '0')};
  border-radius: ${({ $text }) => ($text ? '10px' : '0')};

  span {
    font-size: 12px;
  }
`;

export const ImgSpan = styled.div`
  position: absolute;
  font-size: 12px;
`;
