import axios from 'axios';


const NonauthApi = () => {
  const api = process.env.REACT_APP_API_URL
    return axios.create({
      baseURL: `${api}`
    });
  }

export default NonauthApi;