import axios from '../utils/axios';

const TOKEN_KEY = 'calmomed_token';
const USER_KEY = 'calmomed_user';

export const authService = {
  async login(email, password) {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return { token, user };
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao fazer login' };
    }
  },

  async register(name, email, password, cpf) {
    try {
      const response = await axios.post('/api/auth/register', {
        name, email, password, cpf, role: 'user'
      });
      const { token, user } = response.data;
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return { token, user };
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao cadastrar' };
    }
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    delete axios.defaults.headers.common['Authorization'];
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser() {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  async getProfile() {
    try {
      const response = await axios.get('/api/auth/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao buscar perfil' };
    }
  },

  initializeAuth() {
    const token = this.getToken();
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  },

  async forgotPassword(email) {
    try {
      const response = await axios.post('/api/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao solicitar recuperação de senha' };
    }
  },

  async resetPassword(token, newPassword) {
    try {
      const response = await axios.post('/api/auth/reset-password', { token, newPassword });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao redefinir senha' };
    }
  }
};

export const postosService = {
  async getAll() {
    try {
      const response = await axios.get('/api/postos');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao buscar postos' };
    }
  },

  async getById(id) {
    try {
      const response = await axios.get(`/api/postos/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao buscar posto' };
    }
  },

  async create(postoData) {
    try {
      const response = await axios.post('/api/postos', postoData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao criar posto' };
    }
  },

  async update(id, postoData) {
    try {
      const response = await axios.patch(`/api/postos/${id}`, postoData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao atualizar posto' };
    }
  },

  async delete(id) {
    try {
      const response = await axios.delete(`/api/postos/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao deletar posto' };
    }
  }
};

export default axios;
