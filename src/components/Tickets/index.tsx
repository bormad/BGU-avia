import React from "react";
import Stack from "@mui/material/Stack";
import Ticket from "../Ticket";
import Button from "../ui/Button";

import { TicketProps } from "../../data/types";

import "./styles.sass";
import useShow from "../../hooks/useShow";
import { numWord } from "../../utils";

const DEFAULT_TICKETS_COUNT = 5;
const TICKETS_WORDS = ["билет", "билета", "билетов"];

const Tickets = (props: { tickets: TicketProps[] }) => {
  const [showedTickets, ticketsLeft, showAll, addTickets] = useShow(
    props.tickets
  );

  return (
    <Stack spacing={2} className="tickets">
      {showedTickets.length > 0 ? (
        <>
          {showedTickets.map((ticket) => (
            <Ticket
              key={ticket.id}
              id={ticket.id}
              price={ticket.price}
              companyId={ticket.companyId}
              info={ticket.info}
            />
          ))}
          {!showAll && ticketsLeft > 0 && (
            <Stack justifyContent="center" direction="row">
              <Button onButtonClick={addTickets}>
                {ticketsLeft < DEFAULT_TICKETS_COUNT
                  ? `Показать ${ticketsLeft} ${numWord(
                      ticketsLeft,
                      TICKETS_WORDS
                    )}`
                  : `Показать еще ${DEFAULT_TICKETS_COUNT} билетов`}
              </Button>
            </Stack>
          )}
        </>
      ) : (
        <h3 className="tickets__empty">
          Для выбранных фильтров билетов не найдено!
        </h3>
      )}
    </Stack>
  );
};

export default Tickets;
