import styled from 'styled-components';
import { useEffect, useState } from 'react';
import GetOtherWorry from '../modal/GetOtherWorry';
import { WorryDetail } from '../../types/WorryDetail.interface';
import {
  postArrived,
  getWorryDetail,
  getCommentDetail,
} from '../../api/postArrived';
import { PostArrivedItem } from '../../types/PostArrivedItem.interface';
import { useQueryClient } from '@tanstack/react-query';
import { usePostArrivedStore } from '../../store/postArrivedStore';
import PostArrivedList from './PostArrivedList';
import { usePostArrived } from '../../hooks/queries/usePostArrived';

function PostArrived() {
  const [detail, setDetail] = useState<WorryDetail>({} as WorryDetail);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { postArrivedList, setPostArrivedListState, setPostArrivedAsRead } =
    usePostArrivedStore();

  const queryClient = useQueryClient();

  const postArrivedQuery = usePostArrived();

  useEffect(() => {
    postArrived();
    setPostArrivedListState(postArrivedQuery.data);
  }, [postArrivedQuery.data, setPostArrivedListState]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['postArrived'],
    });
  }, [postArrivedList, queryClient]);

  const handleClick = async (item: PostArrivedItem) => {
    try {
      if (item.commentId !== null) {
        const detail = await getCommentDetail({ commentid: item.commentId });
        setDetail(detail);
        setShowModal(true);
      } else {
        const detail = await getWorryDetail({ worryid: item.worryId });
        setDetail(detail);
        setShowModal(true);
      }
      setPostArrivedAsRead(item.worryId);
    } catch (error) {
      console.error('Error fetching detail:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (postArrivedQuery.isPending) return <div>Loading...</div>;

  if (postArrivedQuery.isError) return <div>Error</div>;

  return (
    <>
      {postArrivedList && (
        <PostArrivedList
          postArrivedList={postArrivedList}
          onClick={handleClick}
        />
      )}
      {showModal && (
        <DetailContainer>
          <GetOtherWorry detail={detail} closeModal={handleCloseModal} />
        </DetailContainer>
      )}
    </>
  );
}

export default PostArrived;

const DetailContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;
