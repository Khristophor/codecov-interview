import * as React from "react";
import Octicon from "octicons-react-ts";
import { formatDistance } from "date-fns";
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
    <div>
      {state.status === Status.FETCHING && <div>Fetching...</div>}
      {state.status === Status.SUCCESS && repos && (
        <div>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div>
            {repos.map((repo: any, i: number) => (
              <div key={i}>
                <Octicon name="repo"></Octicon>
                {repo.name}{" "}
                <span>
                  Latest commit{" "}
                  {formatDistance(new Date(), new Date(repo.latest_commit))} ago
                  by
                  <UserBadge
                    userName={repo.cache.commit.author.username}
                    serviceId={repo.cache.commit.author.service_id}
                  ></UserBadge>
                </span>
                <CoverageTotals totals={repo?.cache?.commit?.totals} />
              </div>
            ))}
          </div>
        </div>
      )}
      {state.status === Status.ERROR && (
        <div>
          <h1>Something went wrong...</h1>
          <div>{JSON.stringify(state.response)}</div>
        </div>
      )}
    </div>
  );
}
