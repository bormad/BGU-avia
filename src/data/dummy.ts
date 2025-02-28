import S7_LOGO from "../assets/s7_logo.png";
import XIAMEN_LOGO from "../assets/xiamen_air_logo.png";

import { City, TicketProps } from "./types";

export const sorts = {
  speed: "Самый быстрый",
  price: "Самый дешевый",
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
    info: {
      stops: ["HKG"],
      origin: "PTB",
      dateEnd: 1660945803623,
      duration: 11520000,
      dateStart: 1659304203623,
      destination: "JNB",
    },
    price: 4100,
    companyId: "cddfa038-823b-43b1-b18d-395731881077",
  },
  {
    id: "76f847d3-63a0-4094-bdde-35647b000630",
    info: {
      stops: ["HKT", "HKG"],
      origin: "KRS",
      dateEnd: 1660686603624,
      duration: 10320000,
      dateStart: 1658353803624,
      destination: "JNB",
    },
    price: 31300,
    companyId: "cddfa038-823b-43b1-b18d-395731881077",
  },
  {
    id: "5048b977-b9cd-475f-8bfe-83e2448c1e2f",
    info: {
      stops: ["MOW"],
      origin: "EKV",
      dateEnd: 1658872203624,
      duration: 14100000,
      dateStart: 1658008203624,
      destination: "EKT",
    },
    price: 6700,
    companyId: "7dc12d0b-ce42-48a0-8673-0dad4d698764",
  },
  {
    id: "532375bb-2557-4687-a61b-403c0e0d7ba8",
    info: {
      stops: ["EKT"],
      origin: "HKG",
      dateEnd: 1664574603624,
      duration: 8880000,
      dateStart: 1663451403624,
      destination: "ARH",
    },
    price: 57400,
    companyId: "cddfa038-823b-43b1-b18d-395731881077",
  },
  {
    id: "958aecea-d0ca-4128-b219-29d1806b0ce5",
    info: {
      stops: [],
      origin: "MOW",
      dateEnd: 1659390603624,
      duration: 1860000,
      dateStart: 1657403403624,
      destination: "ARH",
    },
    price: 12300,
    companyId: "cddfa038-823b-43b1-b18d-395731881077",
  },
  {
    id: "9f5ead8f-fed3-46be-beee-a4cbb8809111",
    info: {
      stops: ["KRS", "SRT"],
      origin: "MOW",
      dateEnd: 1660427403624,
      duration: 16980000,
      dateStart: 1659045003624,
      destination: "EKT",
    },
    price: 68900,
    companyId: "cddfa038-823b-43b1-b18d-395731881077",
  },
  {
    id: "cae3f047-a882-4f1c-a71a-179ba1896188",
    info: {
      stops: [],
      origin: "LOS",
      dateEnd: 1658440203624,
      duration: 2640000,
      dateStart: 1657749003624,
      destination: "ARH",
    },
    price: 20700,
    companyId: "7dc12d0b-ce42-48a0-8673-0dad4d698764",
  },
  {
    id: "5bf68e02-0429-48a8-a51b-c6022908baf6",
    info: {
      stops: [],
      origin: "EKT",
      dateEnd: 1664661003624,
      duration: 840000,
      dateStart: 1663105803624,
      destination: "KRS",
    },
    price: 21300,
    companyId: "7dc12d0b-ce42-48a0-8673-0dad4d698764",
  },
  {
    id: "9885af15-fd79-4c66-9ddb-51c2de9f1987",
    info: {
      stops: ["TRN", "KRS", "SRT"],
      origin: "MOW",
      dateEnd: 1664401803624,
      duration: 12120000,
      dateStart: 1663797003624,
      destination: "LOS",
    },
    price: 4700,
    companyId: "7dc12d0b-ce42-48a0-8673-0dad4d698764",
  },
  {
    id: "5f49e1cf-c17c-4c07-9c82-4bcdbe4f3178",
    info: {
      stops: ["LOS", "EKV"],
      origin: "EKT",
      dateEnd: 1660341003624,
      duration: 24120000,
      dateStart: 1658181003624,
      destination: "ARH",
    },
    price: 52400,
    companyId: "cddfa038-823b-43b1-b18d-395731881077",
  },
];

export const companies = {
  "cddfa038-823b-43b1-b18d-395731881077": "S7 Airlines",
  "7dc12d0b-ce42-48a0-8673-0dad4d698764": "XiamenAir",
};

export const transfersData = {
  transfers_0: {
    value: false,
    label: "Без пересадок",
    num: 0,
  },
  transfers_1: {
    value: false,
    label: "1 персадка",
    num: 1,
  },
  transfers_2: {
    value: false,
    label: "2 персадки",
    num: 2,
  },
  transfers_3: {
    value: false,
    label: "3 персадки",
    num: 3,
  },
};

export const cities: City[] = [
  {
    value: "MOW",
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
    label: "Петерсбург",
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
    label: "Кристиансан",
  },
  {
    value: "SRT",
    label: "Сороти",
  },
  {
    value: "LOS",
    label: "Лагос",
  },
  {
    value: "EKV",
    label: "EKV",
  },
  {
    value: "EKT",
    label: "Эскильстун",
  },
];
