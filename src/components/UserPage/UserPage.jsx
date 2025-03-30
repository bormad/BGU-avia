import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import Ticket from '../Ticket';
// Импорт компонента Ticket

// Redux slice для управления пользователем
const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: JSON.parse(localStorage.getItem('user') || 'null'),
		isAuthenticated: !!localStorage.getItem('user')
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
			state.isAuthenticated = true;
			// Дополнительно сохраняем в Local Storage
			localStorage.setItem('user', JSON.stringify(action.payload));
		},
		logout: (state) => {
			state.user = null;
			state.isAuthenticated = false;
			localStorage.removeItem('user');
		}
	}
});

export const { setUser, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;

// Компонент UserPage
const UserPage = () => {
	const dispatch = useDispatch();
	const { user, isAuthenticated } = useSelector((state) => state.users);
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [isRegistering, setIsRegistering] = React.useState(false);

	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem('user'));
		if (storedUser) {
			dispatch(setUser(storedUser));
		}
	}, [dispatch]);

	const handleLogin = async () => {
		const response = await fetch('http://localhost:3001/users');
		const users = await response.json();

		const foundUser = users.find(
			(u) => u.username === username && u.password === password
		);

		if (foundUser) {
			dispatch(setUser(foundUser));
			localStorage.setItem('user', JSON.stringify(foundUser));
		} else {
			alert('Неверные учетные данные');
		}
	};

	const handleRegister = async () => {
		// Добавляем массив purchasedTickets при создании нового пользователя
		const newUser = { username, password, role: 'user', purchasedTickets: [] };
		const response = await fetch('http://localhost:3001/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newUser)
		});

		if (response.ok) {
			const registeredUser = await response.json();
			dispatch(setUser(registeredUser));
			localStorage.setItem('user', JSON.stringify(registeredUser));
		} else {
			alert('Ошибка регистрации');
		}
	};

	const handleLogout = () => {
		dispatch(logout());
		localStorage.removeItem('user');
	};

	return (
		<Container maxWidth='sm' style={{ marginTop: '50px' }}>
			{isAuthenticated ? (
				<div style={{ textAlign: 'center' }}>
					<Typography variant='h4' gutterBottom>
						Добро пожаловать, {user.username}!
					</Typography>
					<Typography variant='subtitle1' gutterBottom>
						Ваша роль: {user.role}
					</Typography>
					<Button variant='contained' color='secondary' onClick={handleLogout}>
						Выйти
					</Button>

					{/* Список купленных билетов */}
					<Box mt={4}>
						<Typography variant='h5' gutterBottom>
							Ваши купленные билеты:
						</Typography>
						{user.purchasedTickets.length > 0 ? (
							user.purchasedTickets.map((ticket) => (
								<Ticket
									key={ticket.id}
									price={ticket.price}
									companyId={ticket.companyId}
									info={ticket.info}
								/>
							))
						) : (
							<Typography variant='body1'>
								У вас пока нет купленных билетов.
							</Typography>
						)}
					</Box>
				</div>
			) : (
				<div style={{ textAlign: 'center' }}>
					<Typography variant='h4' gutterBottom>
						{isRegistering ? 'Регистрация' : 'Авторизация'}
					</Typography>
					<TextField
						label='Имя пользователя'
						variant='outlined'
						fullWidth
						style={{ marginBottom: '16px' }}
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<TextField
						label='Пароль'
						type='password'
						variant='outlined'
						fullWidth
						style={{ marginBottom: '16px' }}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						variant='contained'
						color='primary'
						onClick={isRegistering ? handleRegister : handleLogin}
						fullWidth
					>
						{isRegistering ? 'Зарегистрироваться' : 'Войти'}
					</Button>
					<Button
						variant='text'
						color='primary'
						onClick={() => setIsRegistering(!isRegistering)}
						style={{ marginTop: '16px' }}
					>
						{isRegistering
							? 'Уже есть аккаунт? Войти'
							: 'Нет аккаунта? Зарегистрироваться'}
					</Button>
				</div>
			)}
		</Container>
	);
};

// Экспорт компонента
export default UserPage;
