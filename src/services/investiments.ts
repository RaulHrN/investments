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

          if(reports[index - 1]){
            percent = (((report.value - reports[index - 1].value)*100) /  reports[index - 1].value).toFixed(2);
          }

          return {...report, percent};

        })
      return { ...investment, reports: reportWithPercentage };
    });

  return sanitizedInvestments;
};
