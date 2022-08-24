import React from "react";
import { getInvestments } from "../../services/investiments";
import { Card } from "../../components/Card/Card";
import "./fundoAcoes.css";

export const FundoAcoes = () => {
  const investments = getInvestments();

  return (
    <div>
      {investments.map((investment, index) => {
        return (
          <section key={index}>
            <h1>{investment.description}</h1>
            <p>
              Redimento total:{" "}
              <span
                className={
                  investment.totalRendPerc && investment.totalRendPerc > 0
                    ? "positivo"
                    : "negativo"
                }
              >
                R$ {investment.totalRend} ({investment.totalRendPerc}%)
              </span>
            </p>
            <div className="invest-card">
              {investment.reports.map((report, index: number) => {
                return <Card report={report} key={index} />;
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};
