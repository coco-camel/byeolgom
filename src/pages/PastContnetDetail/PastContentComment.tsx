import { useParams } from 'react-router-dom';
import { Comment } from '../../types/Comment.interface';
import { WorriesDetailParams } from '../../types/WorriesDetailParams.interface';
import styled from 'styled-components';

function PastContentComment({
  comment,
  $count = 0,
}: {
  comment: Comment;
  $count?: number;
}) {
  const params = useParams() as Readonly<WorriesDetailParams>;
  const initialCount = params.whosecontent === 'mySolvedWorry' ? 0 : 1;

  return (
    <div>
      <CommentContent
        className="content"
        $count={$count === 0 ? initialCount : $count}
      >
        {comment.content}
      </CommentContent>
      {comment.children &&
        comment.children.map((child, index) => (
          <PastContentComment key={index} comment={child} $count={$count + 1} />
        ))}
    </div>
  );
}

export default PastContentComment;

const CommentContent = styled.div<{ $count: number }>`
  padding: 15px;
  width: 70%;
  margin-top: 15px;
  border-radius: 10px;
  min-width: 130px;
  word-wrap: break-word;
  background-color: ${(props) =>
    props.$count % 2 === 0 ? '#b7b7b7' : '#616161'};
  margin-left: ${(props) => (props.$count % 2 === 0 ? '0' : 'auto')};
  margin-right: ${(props) => (props.$count % 2 === 0 ? 'auto' : '0')};
  @media (max-width: 640px) {
    font-size: 1.1rem;
  }
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;
