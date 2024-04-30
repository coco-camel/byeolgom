import styled from 'styled-components';

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
