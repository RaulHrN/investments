import React from "react";
import "./Card.css";
import { Report } from "../../model/report";

interface CardProps {
  report: Report;
}

export const Card = ({ report }: CardProps) => {
  const getClass = (valor: number | undefined): string =>
    !valor || valor === 0 ? "" : valor > 0 ? "positivo" : "negativo";

  const month = (monthNum: number) => {
    const date = new Date();
    date.setMonth(monthNum - 1);

    return date.toLocaleString("pt-BR", {
      month: "short",
    });
  };

  return (
    <div className="card">
      <div className="card-year">
        <span>
          {month(report.month)}/{report.year} -
        </span>
        <span className={getClass(report.reportPercentage)}>
          R$ {report.value.toFixed(2)}
        </span>
      </div>
      <span className={getClass(report.reportPercentage)}>
        {report.reportPercentage}%
      </span>
    </div>
  );
};
