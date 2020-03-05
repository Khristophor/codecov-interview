import * as React from "react";

type Total = string | number | null;
interface Props {
  totals?: Total[];
}
const CoverageTotals = ({ totals = [] }: Props) => {
  console.log(totals);
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
  return (
    <span>
      {fileCount}
      <br />
      {linesCount}
      <br />
      {hitsCount}
      <br />
      {missesCount}
      <br />
      {partialsCount}
      <br />
      {coverage}
      <br />
      {branchesCount}
      <br />
      {methodsCount}
      <br />
      {messagesCount}
      <br />
      {sessionsCount}
      <br />
      {complexity}
      <br />
      {complexity_total}
      <br />
      {diff}
      <br />
    </span>
  );
};

export default CoverageTotals;
