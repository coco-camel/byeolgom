import {
  PastContentContainer,
  PastContentWrap,
  SkeletonDiv,
} from './skeletonStyle';

function SkeletonItem() {
  return (
    <PastContentWrap>
      <SkeletonDiv $width="30px" $height="30px" />
      <PastContentContainer>
        <SkeletonDiv $width="85px" $height="10px" $margin="2px 0" />
        <SkeletonDiv $width="90%" $height="14px" $margin="3px 0" />
      </PastContentContainer>
      <SkeletonDiv $width="17px" $height="17px" />
    </PastContentWrap>
  );
}

export default SkeletonItem;
