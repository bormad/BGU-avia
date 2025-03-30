import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filterSlice';
import ticketsReducer from './ticketsSlice';
import companiesReducer from './companiesSlice';
import { userReducer } from '../components/UserPage/UserPage';

export const store = configureStore({
	reducer: {
		filters: filtersReducer,
		tickets: ticketsReducer,
		companies: companiesReducer,
		users: userReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
