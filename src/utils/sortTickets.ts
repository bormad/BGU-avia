import { getLongestTime } from ".";
import { TicketProps } from "../data/types";

type TransfersType = {
  [prop: string]: {
    value: boolean;
    label: string;
    num: number;
  };
};

const sortTickets = (
  tickets: TicketProps[],
  filters: {
    sortType: string;
    company: string;
    origin: string;
    destination: string;
    dateStart: number | null;
    dateEnd: number | null;
  }
): TicketProps[] => {
  const { sortType, company, origin, destination, dateStart, dateEnd } =
    filters;

  if (tickets.length === 0) return [];

  return tickets
    .filter((ticket) => {
      const companyMatch = ticket.companyId === company || company === "all";
      const originMatch =
        (origin &&
          ticket.departure?.toLowerCase().includes(origin.toLowerCase())) ||
        !origin;

      const destinationMatch =
        (destination &&
          ticket.destination
            ?.toLowerCase()
            .includes(destination.toLowerCase())) ||
        !destination;

      const startDateMatch =
        (dateStart && dateStart >= +new Date(ticket.departureAt)) || !dateStart;

      const endDateMatch =
        (dateEnd && dateEnd <= +new Date(ticket.arrivalAt)) || !dateEnd;

      return (
        companyMatch &&
        originMatch &&
        destinationMatch &&
        startDateMatch &&
        endDateMatch
      );
    })
    .sort((ticketA, ticketB) => {
      switch (sortType) {
        case "price":
          return ticketA.price - ticketB.price;
        case "speed":
          return getLongestTime(ticketA, ticketB);
        case "optimal":
          const priceDiff = ticketA.price - ticketB.price;
          if (priceDiff === 0) {
            return getLongestTime(ticketA, ticketB);
          } else return priceDiff;
        default:
          return ticketA.price - ticketB.price;
      }
    });
};

export default sortTickets;
