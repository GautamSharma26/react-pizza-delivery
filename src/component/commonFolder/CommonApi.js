import axios from "axios";



const CreateAxiosInstance = () => {
  const api = process.env.REACT_APP_API_URL
  // let token = localStorage.getItem("access")
  // console.log(localStorage.getItem("access"),"4");
  return axios.create({
    baseURL: `${api}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
}

export default CreateAxiosInstance;
