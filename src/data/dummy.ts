import S7_LOGO from "../assets/s7_logo.png";
import XIAMEN_LOGO from "../assets/xiamen_air_logo.png";

import { City, TicketProps } from "./types";

export const sorts = {
  speed: "Самый быстрый",
  price: "Самый дешёвый",
  optimal: "Оптимальный",
};

export const companiesLogo: {
  [prop: string]: string;
} = {
  "cddfa038-823b-43b1-b18d-395731881077": S7_LOGO,
  "7dc12d0b-ce42-48a0-8673-0dad4d698764": XIAMEN_LOGO,
};

export const tickets: TicketProps[] = [
  {
    id: "9cf597f2-7bf1-4d67-9e04-9020ac26a9f8",
    price: 4100,
    companyId: "cddfa038-823b-43b1-b18d-395731881077",
    departure: "PTB",
    destination: "JNB",
    departureAt: "2022-08-19T10:30:03.623Z",
    arrivalAt: "2022-08-20T11:30:03.623Z",
  },
  {
    id: "76f847d3-63a0-4094-bdde-35647b000630",
    price: 31300,
    companyId: "cddfa038-823b-43b1-b18d-395731881077",
    departure: "KRS",
    destination: "JNB",
    departureAt: "2022-07-18T10:30:03.624Z",
    arrivalAt: "2022-07-19T11:30:03.624Z",
  },
  {
    id: "5048b977-b9cd-475f-8bfe-83e2448c1e2f",
    price: 6700,
    companyId: "7dc12d0b-ce42-48a0-8673-0dad4d698764",
    departure: "EKV",
    destination: "EKT",
    departureAt: "2022-07-27T10:30:03.624Z",
    arrivalAt: "2022-07-28T11:30:03.624Z",
  },
  {
    id: "532375bb-2557-4687-a61b-403c0e0d7ba8",
    price: 57400,
    companyId: "cddfa038-823b-43b1-b18d-395731881077",
    departure: "HKG",
    destination: "ARH",
    departureAt: "2022-10-01T10:30:03.624Z",
    arrivalAt: "2022-10-02T11:30:03.624Z",
  },
  {
    id: "958aecea-d0ca-4128-b219-29d1806b0ce5",
    price: 12300,
    companyId: "cddfa038-823b-43b1-b18d-395731881077",
    departure: "MOW",
    destination: "ARH",
    departureAt: "2022-07-12T10:30:03.624Z",
    arrivalAt: "2022-07-13T11:30:03.624Z",
  },
  {
    id: "9f5ead8f-fed3-46be-beee-a4cbb8809111",
    price: 68900,
    companyId: "cddfa038-823b-43b1-b18d-395731881077",
    departure: "MOW",
    destination: "EKT",
    departureAt: "2022-08-03T10:30:03.624Z",
    arrivalAt: "2022-08-04T11:30:03.624Z",
  },
  {
    id: "cae3f047-a882-4f1c-a71a-179ba1896188",
    price: 20700,
    companyId: "7dc12d0b-ce42-48a0-8673-0dad4d698764",
    departure: "LOS",
    destination: "ARH",
    departureAt: "2022-07-10T10:30:03.624Z",
    arrivalAt: "2022-07-11T11:30:03.624Z",
  },
  {
    id: "5bf68e02-0429-48a8-a51b-c6022908baf6",
    price: 21300,
    companyId: "7dc12d0b-ce42-48a0-8673-0dad4d698764",
    departure: "EKT",
    destination: "KRS",
    departureAt: "2022-10-02T10:30:03.624Z",
    arrivalAt: "2022-10-03T11:30:03.624Z",
  },
  {
    id: "9885af15-fd79-4c66-9ddb-51c2de9f1987",
    price: 4700,
    companyId: "7dc12d0b-ce42-48a0-8673-0dad4d698764",
    departure: "MOW",
    destination: "LOS",
    departureAt: "2022-09-29T10:30:03.624Z",
    arrivalAt: "2022-09-30T11:30:03.624Z",
  },
  {
    id: "5f49e1cf-c17c-4c07-9c82-4bcdbe4f3178",
    price: 52400,
    companyId: "cddfa038-823b-43b1-b18d-395731881077",
    departure: "EKT",
    destination: "ARH",
    departureAt: "2022-08-12T10:30:03.624Z",
    arrivalAt: "2022-08-13T11:30:03.624Z",
  },
];

export const companies = {
  "cddfa038-823b-43b1-b18d-395731881077": "S7 Airlines",
  "7dc12d0b-ce42-48a0-8673-0dad4d698764": "Xiamen Air",
};

export const transfersData = {
  transfers_0: {
    value: false,
    label: "Без пересадок",
    num: 0,
  },
  transfers_1: {
    value: false,
    label: "1 пересадка",
    num: 1,
  },
  transfers_2: {
    value: false,
    label: "2 пересадки",
    num: 2,
  },
  transfers_3: {
    value: false,
    label: "3 пересадки",
    num: 3,
  },
};

export const cities: City[] = [
  {
    value: "SVO",
    label: "Москва",
  },
  {
    value: "HKT",
    label: "Пхукет",
  },
  {
    value: "HKG",
    label: "Гонконг",
  },
  {
    value: "JNB",
    label: "Йоханнесбург",
  },
  {
    value: "PTB",
    label: "Петрозаводск",
  },
  {
    value: "ARH",
    label: "Архангельск",
  },
  {
    value: "TRN",
    label: "Турин",
  },
  {
    value: "KRS",
    label: "Кристиансанн",
  },
  {
    value: "SRT",
    label: "Сорти",
  },
  {
    value: "LOS",
    label: "Лагос",
  },
  {
    value: "EKV",
    label: "Екатеринбург",
  },
  {
    value: "EKT",
    label: "Эскильстуна",
  },
];
