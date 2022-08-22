import React from "react";
import { Report } from "../../model/report";

interface CardProps {
  report: Report;
}

export function Card({ report}: CardProps) {
  return (
    <div className="card">
      <span>
        {month(report.month)}/{report.year} -
      </span>
      <span>R$ {report.value.toFixed(2)}</span>
      <span> {report.percent}%</span>
    </div>
  );
}

function month(monthNum: number) {
  const date = new Date();
  date.setMonth(monthNum - 1);

  return date.toLocaleString("pt-BR", {
    month: "short",
  });
}
