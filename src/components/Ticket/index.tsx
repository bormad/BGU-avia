import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { getPriceInRoubles, getTransferTime, renderTime } from '../../utils';
import { setUser } from '../UserPage/UserPage';
import { TicketProps } from '../../data/types';
import './styles.sass';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchTickets } from '../../redux/ticketsSlice';

const Ticket = ({ price, companyId, info, id }: TicketProps) => {
	const companies = useSelector((state: RootState) => state.companies.entities);
	const user = useSelector((state: RootState) => state.users?.user);
	const dispatch = useDispatch();
	const location = useLocation();
	console.log(info);
	const { origin, destination, dateStart, dateEnd, stops, duration } = info;
	type CityCodes = any;

	const company = useMemo(
		() => companies.find((company) => company.id === companyId),
		[companies, companyId]
	);

	const transferTime = useMemo(() => getTransferTime(duration), [duration]);

	// Состояние для управления модальным окном редактирования
	const [openEditDialog, setOpenEditDialog] = useState(false);
	const [editedTicket, setEditedTicket] = useState({ ...info, price });

	// Функция для обработки редактирования билета
	const handleEdit = () => {
		setOpenEditDialog(true);
	};

	const handleCloseEditDialog = () => {
		setOpenEditDialog(false);
	};

	const handleSaveEdit = async () => {
		if (!user) {
			alert('Пожалуйста, войдите в систему, чтобы сохранить изменения.');
			return;
		}

		try {
			// Отправляем обновленные данные на сервер
			const response = await fetch(`http://localhost:3001/tickets/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(editedTicket)
			});

			if (!response.ok) {
				throw new Error('Ошибка при обновлении данных на сервере');
			}

			// Обновляем состояние билетов в Redux
			// @ts-ignore
			dispatch(fetchTickets());
			handleCloseEditDialog();
		} catch (error) {
			console.error('Ошибка:', error);
			alert('Не удалось сохранить изменения на сервере');
		}
	};

	// Функция для добавления билета в купленные
	const handleBuy = async () => {
		if (!user) {
			alert('Пожалуйста, войдите в систему, чтобы купить билет.');
			return;
		}

		const newTicket = {
			id: Math.random().toString(36).substr(2, 9),
			price: price,
			companyId: companyId,
			info: info
		};

		const updatedPurchasedTickets = [...user.purchasedTickets, newTicket];
		const updatedUser = { ...user, purchasedTickets: updatedPurchasedTickets };

		try {
			const response = await fetch(`http://localhost:3001/users/${user.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ purchasedTickets: updatedPurchasedTickets })
			});

			if (!response.ok) {
				throw new Error('Ошибка при обновлении данных на сервере');
			}

			dispatch(setUser(updatedUser));
			localStorage.setItem('user', JSON.stringify(updatedUser));
			alert('Билет добавлен в купленные');
		} catch (error) {
			console.error('Ошибка:', error);
			alert('Не удалось обновить данные на сервере');
		}
	};

	return (
		<Card>
			<CardContent>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
					className='ticket__top'
				>
					<h2 className='ticket__price'>{getPriceInRoubles(price)}</h2>
					{company ? <img src={company.logo} alt={company.name} /> : null}
				</Stack>

				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='flex-start'
				>
					<Box className='ticket__infoItem'>
						<Typography className='ticket__text_gray ticket__text_upper'>
							{origin} - {destination}
						</Typography>
						<Typography className='ticket__text'>
							{renderTime(dateStart)} - {renderTime(dateEnd)}
						</Typography>
					</Box>

					<Box className='ticket__infoItem'>
						<Typography className='ticket__text_gray ticket__text_upper'>
							В пути
						</Typography>
						<Typography className='ticket__text'>
							{transferTime[0]}ч {transferTime[1]}м
						</Typography>
					</Box>

					<Box sx={{ alignSelf: 'center' }} className='ticket__infoItem'>
						{stops.length === 0 ? (
							<Typography className='ticket__text_gray ticket__text_upper'>
								Без пересадок
							</Typography>
						) : stops.length > 1 ? (
							<>
								<Typography className='ticket__text_gray ticket__text_upper'>
									{stops.length} пересадки
								</Typography>
								<Typography className='ticket__text'>
									{stops.join(', ')}
								</Typography>
							</>
						) : (
							<>
								<Typography className='ticket__text_gray ticket__text_upper'>
									{stops.length} пересадка
								</Typography>
								<Typography className='ticket__text'>
									{stops.toString()}
								</Typography>
							</>
						)}
					</Box>
				</Stack>

				<Box mt={2}>
					{user && location.pathname !== '/login' ? (
						user.role === 'admin' ? (
							<Button variant='contained' color='primary' onClick={handleEdit}>
								Редактировать
							</Button>
						) : (
							<Button variant='contained' color='secondary' onClick={handleBuy}>
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
						margin='dense'
						label='Цена'
						type='number'
						fullWidth
						variant='outlined'
						value={editedTicket.price}
						onChange={
							(e) =>
								setEditedTicket({
									...editedTicket,
									price: Number(e.target.value)
								}) // Преобразуем в число
						}
					/>
					<TextField
						margin='dense'
						label='Откуда'
						type='text'
						fullWidth
						variant='outlined'
						value={editedTicket.origin}
						onChange={
							(e) =>
								setEditedTicket({
									...editedTicket,
									origin: e.target.value as CityCodes
								}) // Приводим к типу CityCodes
						}
					/>
					<TextField
						margin='dense'
						label='Куда'
						type='text'
						fullWidth
						variant='outlined'
						value={editedTicket.destination}
						onChange={
							(e) =>
								setEditedTicket({
									...editedTicket,
									destination: e.target.value as CityCodes
								}) // Приводим к типу CityCodes
						}
					/>
					{/* Добавь другие поля для редактирования, если необходимо */}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseEditDialog} color='primary'>
						Отмена
					</Button>
					<Button onClick={handleSaveEdit} color='primary'>
						Сохранить
					</Button>
				</DialogActions>
			</Dialog>
		</Card>
	);
};

export default Ticket;
