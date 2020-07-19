import axios from 'axios';

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  async apiCall(request) {
    try {
      const response = await request();
      return response.data;
    } catch (e) {
      console.log(e);
      return e.response.data;
    }
  }

  // Exercises

  async getExercise(id) {
    return await this.apiCall(() => this.api.get(`/exercises/${id}`));
  }

  async getAllExercises() {
    return await this.apiCall(() => this.api.get('/exercises/'));
  }

  async addExercise(exercise) {
    return await this.apiCall(() => this.api.post('/exercises/add', exercise));
  }

  async editExercise(exercise) {
    return await this.apiCall(() =>
      this.api.put(`/exercises/update/${exercise._id}`, exercise)
    );
  }

  async deleteExercise(id) {
    return await this.apiCall(() => this.api.delete(`/exercises/${id}`));
  }

  // Users

  async addUser(user) {
    return await this.apiCall(() => this.api.post('/users/add', user));
  }

  async getUsers() {
    return await this.apiCall(() => this.api.get('/users/'));
  }
}

const api = new Api();

export default api;

