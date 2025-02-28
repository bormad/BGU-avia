import { Company, radioBtnsData } from "../data/types";

const initialState = { all: "Все" };

const transformCompanies = (companies: Company[]): radioBtnsData =>
  companies.reduce(
    (acc, company) => ({
      ...acc,
      [company.id]: company.name,
    }),
    initialState
  );

export default transformCompanies;
