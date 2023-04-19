import axios from "axios";



const CreateAxiosInstance = () => {
  // let token = localStorage.getItem("access")
  // console.log(localStorage.getItem("access"),"4");
  return axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
}

export default CreateAxiosInstance;
