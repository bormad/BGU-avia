import { getLongestTime } from ".";
import { TicketProps } from "../data/types";

type transfersType = {
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
    transfers: transfersType;
    origin: string;
    destination: string;
    dateStart: number | null;
    dateEnd: number | null;
  }
): TicketProps[] => {
  const {
    sortType,
    company,
    transfers,
    origin,
    destination,
    dateStart,
    dateEnd,
  } = filters;

  if (tickets.length === 0) return [];

  return tickets
    .filter((ticket) => {
      const companyMatch = ticket.companyId === company || company === "all";
      const transfersMatch =
        Object.values(transfers).find(
          (transfer) => transfer.num === ticket.info.stops.length
        )?.value ||
        Object.values(transfers).every((transfer) => !transfer.value);

      const originMatch =
        (origin &&
          ticket.info.origin.toLowerCase().includes(origin.toLowerCase())) ||
        !origin;

      const destinationMatch =
        (destination &&
          ticket.info.destination
            .toLowerCase()
            .includes(destination.toLowerCase())) ||
        !destination;

      const startDateMatch =
        (dateStart && dateStart >= ticket.info.dateStart) || !dateStart;

      const endDateMatch =
        (dateEnd && dateEnd <= ticket.info.dateEnd) || !dateEnd;

      return (
        companyMatch &&
        transfersMatch &&
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
