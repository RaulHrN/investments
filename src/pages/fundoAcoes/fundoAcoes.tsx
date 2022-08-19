import React from "react";
import { getInvestments } from "../../services/investiments";
import { Card } from "../../components/Card/Card";
import "./fundoAcoes.css";

export function FundoAcoes() {
  const investments = getInvestments();

  return (
    <div className="invest-card">
      {investments.map((investment, index) => {
        return (
          <section key={index}>
            <h1>{investment.description}</h1>
            <div>
              {investment.reports.map((report, index: number) => {
                return <Card report={report} previousReport = {investment.reports[index-1]} key={index} />;
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
