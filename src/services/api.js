import axios from "axios";

const api = axios.create({ //cria um objeto axios com um monte de métodos, e define o endpoint base da API com esse endereço aí
    baseURL: "https://api.github.com/",
});

export default api;