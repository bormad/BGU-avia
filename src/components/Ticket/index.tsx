import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { getPriceInRoubles, getTransferTime, renderTime } from "../../utils";
import { setUser } from "../UserPage/UserPage";
import { TicketProps } from "../../data/types";
import "./styles.sass";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchTickets } from "../../redux/ticketsSlice";

const Ticket = ({
  id,
  price,
  companyId,
  departure,
  destination,
  departureAt,
  arrivalAt,
}: TicketProps) => {
  const companies = useSelector((state: RootState) => state.companies.entities);
  const user = useSelector((state: RootState) => state.users?.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const company = useMemo(
    () => companies.find((company) => company.id === companyId),
    [companies, companyId]
  );

  // Рассчитываем продолжительность полёта в минутах
  const departureTime = new Date(departureAt);
  const arrivalTime = new Date(arrivalAt);
  const durationMilliseconds = arrivalTime.getTime() - departureTime.getTime();
  const durationMinutes = Math.floor(durationMilliseconds / 60000); // преобразуем миллисекунды в минуты

  const transferTime = useMemo(
    () => getTransferTime(durationMinutes),
    [durationMinutes]
  );

  // Состояние для управления модальным окном редактирования
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedTicket, setEditedTicket] = useState({
    id,
    price,
    companyId,
    departure,
    destination,
    departureAt,
    arrivalAt,
  });

  // Функция для открытия окна редактирования
  const handleEdit = () => {
    setOpenEditDialog(true);
  };

  // Функция для закрытия окна редактирования
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  // Функция для сохранения изменений
  const handleSaveEdit = async () => {
    if (!user) {
      alert("Пожалуйста, войдите в систему, чтобы сохранить изменения.");
      return;
    }

    try {
      // Отправляем обновленные данные на сервер TODO
      const response = await fetch(`http://localhost:4000/tickets/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedTicket),
      });

      if (!response.ok) {
        throw new Error("Ошибка при обновлении данных на сервере");
      }

      // Обновляем состояние билетов в Redux
      // @ts-ignore
      dispatch(fetchTickets());
      handleCloseEditDialog();
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Не удалось сохранить изменения на сервере");
    }
  };

  // Функция для покупки билета
  const handleBuy = async () => {
    if (!user) {
      alert("Пожалуйста, войдите в систему, чтобы купить билет.");
      return;
    }

    const payload = {
      flightId: id, // передаем только ID рейса
    };

    try {
      const response = await fetch(
        `http://localhost:4000/users/${user.id}/book-flight`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      console.log(response, "object");

      if (!response.ok) {
        throw new Error("Ошибка при покупке билета");
      }

      const data = await response.json();
      const updatedUser = { ...user, purchasedTickets: data.purchasedTickets };

      dispatch(setUser(updatedUser)); // обновляем данные пользователя в Redux
      localStorage.setItem("user", JSON.stringify(updatedUser)); // обновляем данные локально
      alert("Билет успешно куплен!");
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Не удалось купить билет");
    }
  };

  return (
    <Card>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className="ticket__top"
        >
          <h2 className="ticket__price">{getPriceInRoubles(price)}</h2>
          {company ? <img src={company.logo} alt={company.name} /> : null}
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box className="ticket__infoItem">
            <Typography className="ticket__text_gray ticket__text_upper">
              {departure} - {destination}
            </Typography>
            {/* <Typography className="ticket__text">
              {renderTime(departureAt)} - {renderTime(arrivalAt)}
            </Typography> */}
          </Box>

          <Box className="ticket__infoItem">
            <Typography className="ticket__text_gray ticket__text_upper">
              В пути
            </Typography>
            <Typography className="ticket__text">
              {transferTime[0]}ч {transferTime[1]}м
            </Typography>
          </Box>
        </Stack>

        <Box mt={2}>
          {user && location.pathname !== "/login" ? (
            user.role === "ADMIN" ? (
              <Button variant="contained" color="primary" onClick={handleEdit}>
                Редактировать
              </Button>
            ) : (
              <Button variant="contained" color="secondary" onClick={handleBuy}>
                Купить билет
              </Button>
            )
          ) : null}
        </Box>
      </CardContent>

      {/* Модальное окно для редактирования билета */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Редактировать билет</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Цена"
            type="number"
            fullWidth
            variant="outlined"
            value={editedTicket.price}
            onChange={(e) =>
              setEditedTicket({
                ...editedTicket,
                price: Number(e.target.value),
              })
            }
          />
          <TextField
            margin="dense"
            label="Откуда"
            type="text"
            fullWidth
            variant="outlined"
            value={editedTicket.departure}
            onChange={(e) =>
              setEditedTicket({ ...editedTicket, departure: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Куда"
            type="text"
            fullWidth
            variant="outlined"
            value={editedTicket.destination}
            onChange={(e) =>
              setEditedTicket({ ...editedTicket, destination: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Время вылета"
            type="datetime-local"
            fullWidth
            variant="outlined"
            value={editedTicket.departureAt}
            onChange={(e) =>
              setEditedTicket({ ...editedTicket, departureAt: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Время прилёта"
            type="datetime-local"
            fullWidth
            variant="outlined"
            value={editedTicket.arrivalAt}
            onChange={(e) =>
              setEditedTicket({ ...editedTicket, arrivalAt: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Отмена
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Ticket;
