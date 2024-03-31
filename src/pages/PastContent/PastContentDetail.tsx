import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { worriesDetail } from '../../api/pastContentApi';
import { formatDate } from '../../utills/formatDate/formatDate';
import { PastContent } from '../../types/PastContent.interface';
import { WorriesDetailParams } from '../../types/WorriesDetailParams.interface';

function PastContentDetail() {
  const [pastContent, setPastContent] = useState<PastContent>();

  const params = useParams() as Readonly<WorriesDetailParams>;

  useEffect(() => {
    const fetchData = async () => {
      const data = await worriesDetail(params);
      setPastContent(data);
    };
    fetchData();
  }, [params]);

  return (
    <>
      {pastContent && (
        <div>
          <div>{pastContent.icon}</div>
          <div>{pastContent.content}</div>
          <div>{formatDate(pastContent.createdAt)}</div>
          {pastContent.comments.map((item, index) => {
            return (
              <div key={index}>
                <div className="content">{item.content}</div>
                <div>{formatDate(item.updatedAt)}</div>
              </div>
            );
          })}
          <div></div>
        </div>
      )}
    </>
  );
}

export default PastContentDetail;
