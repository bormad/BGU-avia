import React, { ReactFragment, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import './styles.sass';

type Props = {
	children?: ReactNode | ReactFragment;
};

const Main = (props: Props) => {
	const location = useLocation();

	// Получаем пользователя из Redux Store
	const user = useSelector((state: any) => state.users?.user);

	// Если пользователя нет в Redux Store, берем из Local Storage
	const username =
		user?.username ||
		JSON.parse(localStorage.getItem('user') || '{}')?.username;

	// Определяем путь для ссылки
	const linkPath = location.pathname === '/login' ? '/' : '/login';

	return (
		<div>
			<Box className='main'>
				<Container maxWidth='md'>
					<Link
						to={linkPath} // Используем linkPath для перенаправления
						style={{ textDecoration: 'none', color: 'inherit' }}
					>
						<Box display='flex' alignItems='center'>
							<AccountCircleIcon style={{ color: '#2196F3' }} />
							<Typography
								variant='body1'
								style={{ marginLeft: 4, color: '#2196F3', fontWeight: 700 }}
							>
								{username || 'login'}
							</Typography>
						</Box>
					</Link>
					<Stack
						direction='column'
						justifyContent='flex-start'
						alignItems='center'
						spacing={4}
					>
						{props.children}
					</Stack>
				</Container>
			</Box>
		</div>
	);
};

export default Main;
