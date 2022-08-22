import { Investment } from "../model/investiment";
import { Report } from "../model/report";
import InvestmentsJson from "./investments.json";

interface Response {
  investments: Investment[];
  reports: Report[];
}

interface SanitizedInvestments extends Investment {
  reports: Report[];
}

export const getInvestments = (): SanitizedInvestments[] => {
  const investments: Response = InvestmentsJson;

  return sanitizeInvestments(investments);
};

const sanitizeInvestments = (investments: Response): SanitizedInvestments[] => {
  const sanitizedInvestments: SanitizedInvestments[] =
    investments.investments.map((investment) => {
      const reports = investments.reports
        .filter((report) => investment.id === report.investmentId)
        .sort((a, b) => a.month - b.month);

      const reportWithPercentage = reports.map((report, index) => {
        let percent: number | string = 0;
        let generalPercent: number | string = 0;

        const firstValue = reports[0].value;
        const lastValue = reports[reports.length - 1].value;
        const general: string = (lastValue).toFixed(2);

        if (reports[index - 1]) {
          percent = getPercentage(report.value, reports[index - 1].value);
          generalPercent = getPercentage(lastValue, firstValue);
        }
        return {
          generalPercent,
          general,
          ...report,
          percent,
        };
      });
      
      return { ...investment,investments: reportWithPercentage, reports: reportWithPercentage };
    });

  function getPercentage(currValue: number, preValue: number) {
    let result: number | string = (
      ((currValue - preValue) * 100) /
      preValue
    ).toFixed(2);
    return result;
  }

  return sanitizedInvestments;
};
