import * as React from "react";
import styled from "styled-components";

import { Page, Container } from "../styles";
import useApiRequest from "../../hooks/useApi";
import { Status } from "../../context";
import UserBadge from "../UserBadge";

export default function Example() {
  const [state, makeRequest] = useApiRequest(
    `https://codecov.io/api/gh/ansible/ansible/commits`,
    {
      verb: "get"
    }
  );
  const [commits, setCommits] = React.useState([]);

  // On load
  React.useEffect(() => {
    makeRequest();
  }, []);

  // Load commits
  React.useEffect(() => {
    setCommits(state?.response?.data?.commits);
  }, [state]);

  console.log(commits);

  return (
    <Page>
      {state.status === Status.FETCHING && <div>Fetching...</div>}
      {state.status === Status.SUCCESS && (
        <Container>
          <div>Chart goes here</div>
          <Content>
            <Title>Recent Commits</Title>
            {commits &&
              commits.map((commit: any, i) => (
                <Row key={i}>
                  <div>
                    <UserBadge
                      userName=""
                      serviceId={commit?.author?.service_id}
                    ></UserBadge>
                  </div>
                  <div>{commit.message}</div>
                </Row>
              ))}
          </Content>
        </Container>
      )}
      {state.status === Status.ERROR && (
        <div>
          <h1>Something went wrong...</h1>
          <div>{JSON.stringify(state.response)}</div>
        </div>
      )}
    </Page>
  );
}

const Content = styled.div`
  border-radius: 8px;
  box-shadow: 0 2px 15px 0 rgba(14, 27, 41, 0.05);
  background-color: #ffffff;
  background: white;
  margin-top: 2rem;
  padding: 3rem;
  display: grid;
  grid-gap: 3rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 2rem 1fr 15rem;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.06;
  letter-spacing: normal;
  color: #00243d;
`;

const FilterInput = styled.input`
  border-radius: 5px;
  box-shadow: 0 2px 15px 0 rgba(14, 27, 41, 0.05);
  background-color: #ffffff;
  padding: 1rem;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const Info = styled.div`
  display: flex;
  align-items: center;

  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: var(--blue-grey);
`;

const RepoName = styled.span`
  font-size: 16px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #1d1e20;
  text-transform: capitalize;
`;
