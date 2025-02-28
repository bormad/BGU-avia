export type checkboxesData = {
  [prop: string]: {
    value: boolean;
    label: string;
    num: number;
  };
};

export type checkboxesProps = {
  data: checkboxesData;
  setData: (newData: checkboxesData) => void;
};

export type radioBtnsData = {
  [prop: string]: string;
};

export type radioBtnsProps = {
  state: string;
  data: radioBtnsData;
  setData: (newState: string) => void;
};

export type buttonsGroupProps = {
  value: string;
  data: {
    [prop: string]: string;
  };
  setValue: (newData: string) => void;
};

export type CityCodes =
  | "MOW"
  | "HKT"
  | "HKG"
  | "JNB"
  | "PTB"
  | "ARH"
  | "TRN"
  | "KRS"
  | "SRT"
  | "LOS"
  | "EKV"
  | "EKT";

export interface City {
  value: string;
  label: string;
}

export type TicketProps = {
  id: string;
  price: number;
  companyId: string;
  info: {
    origin: CityCodes;
    destination: CityCodes;
    dateStart: number;
    dateEnd: number;
    stops: CityCodes[];
    duration: number;
  };
};

export type Company = {
  id: string;
  name: string;
  logo: string;
};
