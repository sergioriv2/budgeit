import styled from "styled-components";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Layout = styled.div`
  background-color: var(--dark-gray);
  width: 100%;
  padding: 15px 20px;
  border-radius: 10px;
  margin: 30px auto;
  font-size: 15px;
  transition: all 0.3s;
  min-height: 245px;
  @media (min-width: 1024px) {
    font-size: 16px;
    border-radius: 5px;
  }
`;

const HeaderPlaceholder = styled.div`
  margin-bottom: 20px;
  font-size: 26px;
  padding-bottom: 10px;
  width: 150px;
`;

const DetailPlaceholder = styled.div`
  margin-bottom: 15px;
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (min-width: 1024px) {
    margin: 25px 0;
  }
`;

const DetailTitle = styled.div`
  max-width: 50%;
  width: 100%;
  @media (min-width: 768px) {
    max-width: 300px;
  }
`;

const DetailValue = styled.div`
  max-width: 100px;
  width: 100%;
  @media (min-width: 768px) {
    max-width: 150px;
  }
`;

export const OperationPlaceholder = () => {
  return (
    <Layout>
      <SkeletonTheme baseColor="#1d1d1d" highlightColor="#ffffff0d">
        <HeaderPlaceholder>
          <Skeleton></Skeleton>
        </HeaderPlaceholder>

        <DetailPlaceholder>
          <DetailTitle>
            <Skeleton></Skeleton>
          </DetailTitle>
          <DetailValue>
            <Skeleton></Skeleton>
          </DetailValue>
        </DetailPlaceholder>
        <DetailPlaceholder>
          <DetailTitle>
            <Skeleton></Skeleton>
          </DetailTitle>
          <DetailValue>
            <Skeleton></Skeleton>
          </DetailValue>
        </DetailPlaceholder>
        <DetailPlaceholder>
          <DetailTitle>
            <Skeleton></Skeleton>
          </DetailTitle>
          <DetailValue>
            <Skeleton></Skeleton>
          </DetailValue>
        </DetailPlaceholder>
      </SkeletonTheme>
    </Layout>
  );
};
