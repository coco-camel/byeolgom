import { useParams } from 'react-router-dom';
import { Comment } from '../../types/Comment.interface';
import { WorriesDetailParams } from '../../types/WorriesDetailParams.interface';
import styled from 'styled-components';

function PastContentComment({
  comment,
  $count,
}: {
  comment: Comment;
  $count?: number;
}) {
  const params = useParams() as Readonly<WorriesDetailParams>;
  const initialCount =
    $count === undefined
      ? params.whosecontent === 'mySolvedWorry'
        ? 0
        : 1
      : $count;
  return (
    <div>
      <CommentContent $count={initialCount}>{comment.content}</CommentContent>
      {comment.children &&
        comment.children.map((child, index) => (
          <PastContentComment
            key={index}
            comment={child}
            $count={initialCount + 1}
          />
        ))}
    </div>
  );
}

export default PastContentComment;

const CommentContent = styled.div<{ $count: number }>`
  padding: 10px;
  width: 70%;
  margin-top: 15px;
  border-radius: 10px;
  min-width: 130px;
  word-wrap: break-word;
  font-size: 12px;
  background-color: ${(props) =>
    props.$count % 2 === 0
      ? 'rgba(18, 18, 18, 0.6)'
      : 'rgba(47, 71, 104, 0.6)'};
  margin-left: ${(props) => (props.$count % 2 === 0 ? '0' : 'auto')};
  margin-right: ${(props) => (props.$count % 2 === 0 ? 'auto' : '0')};
  @media (max-width: 640px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
