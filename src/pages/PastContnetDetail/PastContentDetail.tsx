import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../../utills/formatDate/formatDate';
import { WorriesDetailParams } from '../../types/WorriesDetailParams.interface';
import PastContentComment from './PastContentComment';
import back from '@/back.svg';
import rocketA from '@/rocketA.svg';
import rocketB from '@/rocketB.svg';
import rocketC from '@/rocketC.svg';
import { usePastContentDetail } from '../../hooks/queries/usePastContentDetail';
import { useWhoseContentStore } from '../../store/whoseContentStore';
import {
  CommentLayOut,
  CommentListWrap,
  PastContentContainer,
  PastContentHeader,
  PastContentWrap,
} from '../PastContent/PastContentsStyle';

function PastContentDetail() {
  const rocket: { [key: string]: string } = {
    rocketA: rocketA,
    rocketB: rocketB,
    rocketC: rocketC,
  };
  const params = useParams() as Readonly<WorriesDetailParams>;
  const navigate = useNavigate();
  const setWhoseContentState = useWhoseContentStore(
    (state) => state.setWhoseContentState,
  );
  const handleBackNavigation = () => {
    setWhoseContentState(params.whosecontent);
    navigate(-1);
  };

  const pastContentDetailQuery = usePastContentDetail(params);

  if (pastContentDetailQuery.isPending) return <div>Loading...</div>;

  if (pastContentDetailQuery.isError) return <div>Error</div>;

  return (
    <>
      {pastContentDetailQuery.data && (
        <div>
          <PastContentHeader $padding={'0 20px'}>
            <button onClick={handleBackNavigation}>
              <img src={back} width={20} height={20} />
            </button>
          </PastContentHeader>
          <PastContentWrap
            $padding={'14px 20px'}
            $backgroundcolor={'rgba(255, 255, 255, 0.2)'}
          >
            <img
              src={rocket[`rocket${pastContentDetailQuery.data.icon}`]}
              width={20}
              height={24}
            />
            <PastContentContainer>
              <div>{formatDate(pastContentDetailQuery.data.createdAt)}</div>
              <div>{pastContentDetailQuery.data.content}</div>
            </PastContentContainer>
          </PastContentWrap>
          <CommentLayOut>
            <CommentListWrap>
              {pastContentDetailQuery.data.comments.map((item, index) => (
                <PastContentComment key={index} comment={item} />
              ))}
            </CommentListWrap>
          </CommentLayOut>
        </div>
      )}
    </>
  );
}

export default PastContentDetail;
