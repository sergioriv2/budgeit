import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Label = styled.p`
  font-size: 18px;
  color: var(--light-gray);
`;

const Layout = styled.div`
  text-align: center;

  @media (min-width: 1024px) {
    width: 200px;
  }
`;

const Value = styled.p`
  font-size: 25px;
  font-weight: bold;
  font-family: var(--title-font-2);
  right: 0;
  &:before {
    content: "$ ";
  }
  transition: all 0.2s;
  @media (min-width: 1024px) {
    font-size: 45px;
  }
  ${(props) => {
    if (props.loadingBudget) return `display: none`;
  }}
`;

const ValuePlaceholder = styled.div`
  max-width: 140px;
  margin: 0 auto;
  width: 100%;
  height: 40px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 1024px) {
    max-width: 160px;
    height: 50px;
  }
`;

export const Budget = (props) => {
  const { budget, loading } = props;

  return (
    <Layout>
      <Label>Balance Total</Label>
      {loading ? (
        <ValuePlaceholder>
          <Skeleton
            height={30}
            baseColor="#1d1d1d"
            highlightColor="#ffffff0d"
          ></Skeleton>
        </ValuePlaceholder>
      ) : null}
      <Value loadingBudget={loading}>
        {!loading && budget?.total_budget
          ? budget?.total_budget.toLocaleString({
              style: "currency",
              currency: "ARS",
            })
          : 0}
      </Value>
    </Layout>
  );
};
