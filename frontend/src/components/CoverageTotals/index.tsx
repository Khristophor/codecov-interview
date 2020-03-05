import * as React from "react";
import styled from "styled-components";
type Total = string | number | null;
interface Props {
  totals?: Total[];
}

const convertToPercentage = (num: number): string => {
  return num.toFixed(2) + "%";
};

const checkNotEffected = (num: Total): string | number => {
  if (!num) return "ø";
  if (num === "0") return convertToPercentage(+num);
  return num > 0 ? convertToPercentage(+num) : "ø";
};
const CoverageTotals = ({ totals = [] }: Props) => {
  const [
    fileCount,
    linesCount,
    hitsCount,
    missesCount,
    partialsCount,
    coverage,
    branchesCount,
    methodsCount,
    messagesCount,
    sessionsCount,
    complexity,
    complexity_total,
    diff
  ] = totals;
  // I dont love this diff[5] buisness, it's fragil, but I'm not sure about the correct names for whats returned in the diff / if it's the same as totals so I'm just using a manual index.
  const diffCoverage = Array.isArray(diff) && diff[5]; // get diff coverage
  const totalCoverageDiff = Array.isArray(diff) && diff[4]; // get partials?

  return (
    <Bullet>
      <Item first={true}>{checkNotEffected(coverage)}</Item>
      <Item
        percentage={checkNotEffected(diffCoverage)}
        color="rgba(141, 203, 39, 0.13)"
      >
        {checkNotEffected(diffCoverage)}
      </Item>
      <Item last={true}>{checkNotEffected(totalCoverageDiff)}</Item>
    </Bullet>
  );
};

export default CoverageTotals;

const Bullet = styled.span`
  display: flex;
`;

const Item = styled.span<{
  first?: boolean;
  last?: boolean;
  percentage?: string | number;
  color?: string;
}>`
  flex: 1;
  align-self: center;
  padding: 0.5rem;
  color: ${p => (p.first ? "#f01f7a" : "var(--blue-grey)")};
  text-align: center;
  border-style: solid;
  border-width: 1px;
  border-color: currentColor;
  border-radius: ${p => {
    if (p.first) return "5px 0 0 5px";
    if (p.last) return "0 5px 5px 0";
    return "";
  }};
  background: ${p =>
    !p.percentage || p.percentage === "0.00%"
      ? "none"
      : `linear-gradient(to right, ${p.color || "red"}, ${p.color || "red"} ${
          p.percentage
        }, transparent 50%)`};
`;
