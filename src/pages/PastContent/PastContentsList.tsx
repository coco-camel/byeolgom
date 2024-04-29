import { formatDate } from '../../utills/formatDate/formatDate';
import { Link } from 'react-router-dom';
import rocketA from '@/rocketA.svg';
import rocketB from '@/rocketB.svg';
import rocketC from '@/rocketC.svg';
import star from '@/star.svg';
import ChevronRight from '@/chevronRight.svg?react';
import { forwardRef } from 'react';
import SkeletonItem from '../../components/skeleton/SkeletonItem';
import {
  LoadMoreDiv,
  LockerListWrap,
  PastContentContainer,
  PastContentNone,
  PastContentWrap,
  PastContentsContainer,
} from './pastContentsStyle';

interface PastContentsListProps {
  pastContents: worryList[];
  whoseContent: string;
  isPending: boolean;
}

interface worryList {
  worryId: number;
  icon: string;
  content: string;
  createdAt: Date;
}

const PastContentsList = forwardRef<HTMLDivElement, PastContentsListProps>(
  ({ pastContents, whoseContent, isPending }, ref) => {
    const rocket: { [key: string]: string } = {
      rocketA: rocketA,
      rocketB: rocketB,
      rocketC: rocketC,
    };
    return (
      <PastContentsContainer>
        <LockerListWrap>
          {pastContents && pastContents.length > 0
            ? pastContents.map((list, index) => (
                <Link
                  to={`/pastcontents/${whoseContent}/${list.worryId}`}
                  key={index}
                >
                  <PastContentWrap $margin={'15px 0'}>
                    <img
                      src={
                        whoseContent === 'mySolvedWorry'
                          ? rocket[`rocket${list.icon}`]
                          : star
                      }
                      style={{ width: '30px', height: '30px' }}
                    />
                    <PastContentContainer>
                      <div>{formatDate(list.createdAt)}</div>
                      <div className="content">{list.content}</div>
                    </PastContentContainer>
                    <ChevronRight width={17} height={17} fill="#EEEEEE" />
                  </PastContentWrap>
                </Link>
              ))
            : !isPending && (
                <PastContentWrap>
                  {whoseContent === 'mySolvedWorry' ? (
                    <PastContentNone>
                      <span>보관 중인 글이 없어요</span>
                      <span>상대방의 답변에 답례를 보내주세요</span>
                    </PastContentNone>
                  ) : (
                    <PastContentNone>
                      <span>보관 중인 글이 없어요</span>
                      <span>정성껏 답변을 작성해 보세요</span>
                    </PastContentNone>
                  )}
                </PastContentWrap>
              )}
          {isPending &&
            [...Array(10).keys()].map((i) => <SkeletonItem key={i} />)}
          <LoadMoreDiv ref={ref} />
        </LockerListWrap>
      </PastContentsContainer>
    );
  },
);

export default PastContentsList;
