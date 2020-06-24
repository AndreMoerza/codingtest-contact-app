import { client } from "./";

export function fetchContacts() {
  return (dispatch) => {
    dispatch({
      type: "FETCH_CONTACTS",
      payload: client.get("/contact"),
    });
  };
}

export function newContact() {
  return (dispatch) => {
    dispatch({
      type: "NEW_CONTACT",
    });
  };
}

export function saveContact(contact) {
  return (dispatch) => {
    return dispatch({
      type: "SAVE_CONTACT",
      payload: client.post("/contact", contact),
    });
  };
}

export function fetchContact(id) {
  return (dispatch) => {
    return dispatch({
      type: "FETCH_CONTACT",
      payload: client.get(`/contact/${id}`),
    });
  };
}

export function updateContact(id, contact) {
  return (dispatch) => {
    return dispatch({
      type: "UPDATE_CONTACT",
      payload: client.put(`contact/${id}`, contact),
    });
  };
}

export function deleteContact(id) {
  return (dispatch) => {
    return dispatch({
      type: "DELETE_CONTACT",
      payload: client.delete(`contact/${id}`),
    });
  };
}
