import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './layouts/Main';
import Logo from './components/ui/Logo';
import SearchParams from './components/SearchParams';
import Body from './components/Body';
import UserPage from './components/UserPage/UserPage'; // Импортируйте компонент страницы пользователя

function App() {
	return (
		<Main>
			<Logo />
			<Routes>
				<Route
					path='/'
					element={
						<>
							<SearchParams />
							<Body />
						</>
					}
				/>
				<Route path='/login' element={<UserPage />} />
			</Routes>
		</Main>
	);
}

export default App;
