import axios from "axios";

export const client = axios.create({
  baseURL: "https://simple-contact-crud.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});
