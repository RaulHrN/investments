import { Investment } from "../model/investment";
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

      const firstValue: number = reports[0].value;

      const totalRendPerc: number | string = getPercentage(
        reports[reports.length - 1].value,
        firstValue
      );
      const totalRend: string = (
        reports[reports.length - 1].value - firstValue
      ).toFixed(2);

      const reportPercentage = reports.map((report, index) => {
        let reportPercentage: number = 0;
        if (reports[index - 1]) {
          reportPercentage = getPercentage(report.value, reports[index - 1].value);
        }

        return {
          ...report,
          reportPercentage,
        };
      });

      return {
        ...investment,
        totalRend,
        totalRendPerc,
        reports: reportPercentage,
      };
    });

  const getPercentage = (currValue: number, preValue: number) => {
    let result: number | string = (
      ((currValue - preValue) * 100) /
      preValue
    ).toFixed(2);
    return Number(result);
  }
  return sanitizedInvestments;
};
