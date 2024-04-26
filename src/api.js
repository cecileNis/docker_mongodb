const axios = require("axios");

const API = "http://localhost:8000";
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API}/users`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API}/user`, userData);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUser = async (id, password) => {
  try {
    const response = await axios.delete(`${API}/user`, {
      data: {
        password: password,
        userId: id,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
