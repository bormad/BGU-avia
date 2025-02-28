import transformCompanies from "../transformCompanies";
import { companies as companiesData } from "../../data/dummy";

describe("transformCompanies", () => {
  const initialState = { all: "Все" };
  const companies = [
    {
      id: "7dc12d0b-ce42-48a0-8673-0dad4d698764",
      logo: "XiamenAir Logo.png",
      name: "XiamenAir",
    },
    {
      id: "cddfa038-823b-43b1-b18d-395731881077",
      logo: "S7 Logo.png",
      name: "S7 Airlines",
    },
  ];

  it("returns initial state", () => {
    expect(transformCompanies([])).toEqual(initialState);
  });

  it("returns correct companies object", () => {
    expect(transformCompanies(companies)).toEqual({
      ...companiesData,
      ...initialState,
    });
  });
});
