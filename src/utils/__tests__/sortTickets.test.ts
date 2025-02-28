import { transfersData } from "../../data/dummy";
import { TicketProps } from "../../data/types";
import sortTickets from "../sortTickets";

const tickets: TicketProps[] = [
  {
    companyId: "cddfa038-823b-43b1-b18d-395731881077",
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
  },
  {
    id: "5048b977-b9cd-475f-8bfe-83e2448c1e2f",
    companyId: "7dc12d0b-ce42-48a0-8673-0dad4d698764",
    info: {
      stops: ["MOW"],
      origin: "EKV",
      dateEnd: 1658872203624,
      duration: 10320000,
      dateStart: 1658008203624,
      destination: "EKT",
    },
    price: 6700,
  },
  {
    id: "76f847d3-63a0-4094-bdde-35647b000630",
    companyId: "cddfa038-823b-43b1-b18d-395731881077",
    info: {
      stops: ["HKT", "HKG"],
      origin: "KRS",
      dateEnd: 1660686603624,
      duration: 11320000,
      dateStart: 1658353803624,
      destination: "JNB",
    },
    price: 6700,
  },
];

describe("sortTickets", () => {
  const companyId = "7dc12d0b-ce42-48a0-8673-0dad4d698764";
  const filters = {
    sortType: "",
    company: "all",
    transfers: transfersData,
    origin: "",
    destination: "",
    dateStart: null,
    dateEnd: null,
  };

  it("returns empty list with no tickets", () => {
    expect(sortTickets([], filters)).toEqual([]);
  });

  it("returns initial list with no filters", () => {
    expect(sortTickets(tickets, filters)).toEqual(tickets);
  });

  it("returns list with correct companyId", () => {
    expect(sortTickets(tickets, { ...filters, company: companyId })).toEqual(
      tickets.filter((ticket) => ticket.companyId === companyId)
    );
  });

  it("returns list with correct stops length", () => {
    expect(
      sortTickets(tickets, {
        ...filters,
        transfers: {
          ...filters.transfers,
          transfers_1: { ...filters.transfers["transfers_1"], value: true },
        },
      }).length
    ).toEqual(2);

    expect(
      sortTickets(tickets, {
        ...filters,
        transfers: {
          ...filters.transfers,
          transfers_0: { ...filters.transfers["transfers_0"], value: true },
        },
      }).length
    ).toEqual(0);
  });

  it("returns list with correct origin", () => {
    expect(sortTickets(tickets, { ...filters, origin: "PTB" }).length).toEqual(
      1
    );

    expect(sortTickets(tickets, { ...filters, origin: "ANY" }).length).toEqual(
      0
    );
  });

  it("returns list with correct destination", () => {
    expect(
      sortTickets(tickets, { ...filters, destination: "JNB" }).length
    ).toEqual(2);

    expect(
      sortTickets(tickets, { ...filters, destination: "ANY" }).length
    ).toEqual(0);
  });

  it("returns list with correct start date", () => {
    expect(
      sortTickets(tickets, {
        ...filters,
        dateStart: tickets[1].info.dateStart + 1,
      }).length
    ).toEqual(1);

    expect(
      sortTickets(tickets, {
        ...filters,
        dateStart: tickets[1].info.dateStart - 1,
      }).length
    ).toEqual(0);
  });

  it("returns list with correct end date", () => {
    expect(
      sortTickets(tickets, {
        ...filters,
        dateEnd: tickets[0].info.dateEnd - 1,
      }).length
    ).toEqual(1);

    expect(
      sortTickets(tickets, {
        ...filters,
        dateEnd: tickets[0].info.dateEnd + 1,
      }).length
    ).toEqual(0);
  });

  it("returns list with correct sort", () => {
    expect(sortTickets(tickets, { ...filters, sortType: "price" })).toEqual(
      tickets.sort((ticketA, ticketB) => ticketA.price - ticketB.price)
    );

    expect(sortTickets(tickets, { ...filters, sortType: "speed" })).toEqual(
      tickets.sort(
        (ticketA, ticketB) => ticketA.info.duration - ticketB.info.duration
      )
    );

    expect(sortTickets(tickets, { ...filters, sortType: "optimal" })).toEqual(
      tickets.sort((ticketA, ticketB) => ticketA.price - ticketB.price)
    );
  });
});
