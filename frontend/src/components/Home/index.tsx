import * as React from "react";
import styled from "styled-components";
import Octicon from "octicons-react-ts";
import { formatDistance } from "date-fns";

import { Page, Container } from "../styles";
import useApiRequest from "../../hooks/useApi";
import { Status } from "../../context";
import UserBadge from "../UserBadge";
import CoverageTotals from "../CoverageTotals";

export default function Example() {
  const [state, makeRequest] = useApiRequest(
    `https://codecov.io/api/gh/ansible`,
    {
      verb: "get"
    }
  );
  const [repos, setRepos] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (state) {
      setSearchTerm(event.target.value);
    }
  };

  // On load
  React.useEffect(() => {
    makeRequest();
  }, []);

  // On serchTerm change
  React.useEffect(() => {
    const results = state?.response?.data?.repos.filter((repo: any) =>
      repo.name.toLowerCase().includes(searchTerm)
    );
    setRepos(results);
  }, [searchTerm, state]);

  return (
    <Page>
      {state.status === Status.FETCHING && <div>Fetching...</div>}
      {state.status === Status.SUCCESS && repos && (
        <Container>
          <FilterInput
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Content>
            {repos.map((repo: any, i: number) => (
              <Row key={i}>
                <Octicon name="repo"></Octicon>
                <Details>
                  <RepoName>{repo.name}</RepoName>
                  <Info>
                    Latest commit{" "}
                    {formatDistance(new Date(), new Date(repo.latest_commit))}{" "}
                    ago by
                    <UserBadge
                      userName={repo.cache.commit.author.username}
                      serviceId={repo.cache.commit.author.service_id}
                    ></UserBadge>
                  </Info>
                </Details>
                <CoverageTotals totals={repo?.cache?.commit?.totals} />
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
