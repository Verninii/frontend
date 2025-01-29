import axios from "axios";

const API_URL = "https://backend-production-6b12.up.railway.app/user";

const api = axios.create({
  baseURL: API_URL,
});

export const getUsers = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post("/", userData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
};

export const updateUser = async (id, updatedData) => {
  try {
    const response = await api.put(`/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    throw error;
  }
};

export default api;