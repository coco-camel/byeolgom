import { useParams } from 'react-router-dom';
import { Comment } from '../../types/Comment.interface';
import { WorriesDetailParams } from '../../types/WorriesDetailParams.interface';
import {
  CommentContent,
  CommentTimeWrap,
} from '../PastContent/pastContentsStyle';
import { useThemeStore } from '../../store/themeStore';
import { formatTime } from '../../utills/formatDate/formatDate';

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

  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  return (
    <div>
      <CommentContent $theme={isDarkMode} $count={initialCount}>
        {comment.content}
      </CommentContent>
      <CommentTimeWrap $count={initialCount}>
        {comment.createdAt && formatTime(comment.createdAt)}
      </CommentTimeWrap>
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
