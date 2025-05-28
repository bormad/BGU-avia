import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import Ticket from "../Ticket";

// Redux slice для управления пользователем
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || {},
    isAuthenticated: !!localStorage.getItem("user"),
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = {};
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;

// Компонент UserPage
const UserPage = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.users);

  const [flights, setFlights] = useState([]);
  const [email, setEmail] = useState(""); // Объявляем email
  const [password, setPassword] = useState(""); // Объявляем password
  const [isRegistering, setIsRegistering] = useState(false); // Объявляем isRegistering

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(setUser(storedUser));
    }

    // Загрузка всех рейсов
    fetch("http://localhost:4000/flights")
      .then((response) => response.json())
      .then((data) => setFlights(data))
      .catch((error) => console.error("Ошибка при загрузке рейсов:", error));
  }, [dispatch]);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Используем email и password
      });

      if (!response.ok) {
        throw new Error("Ошибка сервера при входе");
      }

      const { user: data } = await response.json();

      if (data) {
        dispatch(setUser(data));
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        alert("Неверные учетные данные");
      }
    } catch (error) {
      console.error(error);
      alert(
        "Что-то пошло не так при попытке войти. Пожалуйста, попробуйте снова."
      );
    }
  };

  const handleRegister = async () => {
    const newUser = {
      email,
      password,
      displayName: "New User",
      role: "USER",
      purchasedTickets: [],
    };

    const response = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      const registeredUser = await response.json();
      dispatch(setUser(registeredUser));
      localStorage.setItem("user", JSON.stringify(registeredUser));
    } else {
      alert("Ошибка регистрации");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      {isAuthenticated ? (
        <div style={{ textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Добро пожаловать, {user.displayName}!
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Ваша роль: {user.role}
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Выйти
          </Button>

          {/* Список купленных билетов */}
          <Box mt={4}>
            <Typography variant="h5" gutterBottom>
              Ваши купленные билеты:
            </Typography>
            {user.role === "ADMIN" ? (
              // Если пользователь — администратор, показать всех пользователей и их регистрации
              <div>
                {flights.map((flight) => (
                  <div key={flight.id}>
                    <Typography variant="h6">
                      Рейс: {flight.departure} - {flight.destination}
                    </Typography>
                    <ul>
                      {flight.passengers.map((passenger) => (
                        <li key={passenger.id}>
                          {passenger.displayName} - {passenger.email}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              // Если пользователь — обычный пользователь, показать только его регистрации
              <div>
                {flights
                  .filter((flight) =>
                    flight.passengers.some(
                      (passenger) => passenger.id === user.id
                    )
                  )
                  .map((flight) => (
                    <div key={flight.id}>
                      <Typography variant="h6">
                        Рейс: {flight.departure} - {flight.destination}
                      </Typography>
                    </div>
                  ))}
              </div>
            )}
          </Box>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            {isRegistering ? "Регистрация" : "Авторизация"}
          </Typography>
          <TextField
            label="Электронная почта"
            variant="outlined"
            fullWidth
            style={{ marginBottom: "16px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Пароль"
            type="password"
            variant="outlined"
            fullWidth
            style={{ marginBottom: "16px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={isRegistering ? handleRegister : handleLogin}
            fullWidth
          >
            {isRegistering ? "Зарегистрироваться" : "Войти"}
          </Button>
          <Button
            variant="text"
            color="primary"
            onClick={() => setIsRegistering(!isRegistering)}
            style={{ marginTop: "16px" }}
          >
            {isRegistering
              ? "Уже есть аккаунт? Войти"
              : "Нет аккаунта? Зарегистрироваться"}
          </Button>
        </div>
      )}
    </Container>
  );
};

export default UserPage;
