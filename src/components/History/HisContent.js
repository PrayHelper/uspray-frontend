import styled from "styled-components";

const HisContent = (props) => {
  return (
    <ContentWrapper>
      <TopContentWrapper>
        <NameWrapper>
          <Name>{props.name}</Name>
        </NameWrapper>
        <Vline />
        <Content>{props.content}</Content>
      </TopContentWrapper>
      <Date>{props.date.replace(/-/g, "/")}</Date>
      <Hline />
    </ContentWrapper>
  );
};

export default HisContent;

const Hline = styled.hr`
  width: 100%;
  color: var(--color-secondary-grey);
  size: 1px;
  opacity: 0.5;
  border-right: 0;
  border-left: 0;
`;

const Vline = styled.div`
  border-left: 1px solid var(--color-secondary-grey);
  height: 14px;
  margin-top: 4px;
`;

const ContentWrapper = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
`;

const TopContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const NameWrapper = styled.div``;

const Name = styled.div`
  color: var(--color-dark-green);
  font-size: 14px;
  text-align: center;
  width: 71px;
  font-weight: 500;
`;

const Content = styled.div`
  color: var(--color-dark-grey);
  font-size: 14px;
  margin-left: 8px;
  margin-right: 8px;
  word-break: keep-all;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Date = styled.div`
  display: flex;
  flex-direction: row-reverse;
  color: var(--color-dark-green);
  font-size: 12px;
  margin: 8px 16px 12px 0px;
`;
