import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000'
  // Production'da buraya Heroku URL'i koyacağım
});

export default instance;
