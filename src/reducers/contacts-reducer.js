const defaultContact = {
  name: {},
};

const defaultState = {
  contacts: [],
  contact: defaultContact,
  fetching: false,
  fetched: false,
  serverError: null,
  errors: {},
  loading: false,
};

const normalizeErrors = (data) => {
  const { firstName, lastName, age, photo } = data.errors;
  return { firstName, lastName, age, photo };
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case "FETCH_CONTACTS_PENDING": {
      return {
        ...state,
        fetching: true,
      };
    }

    case "FETCH_CONTACTS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        serverError: null,
        contacts: action.payload.data.data,
      };
    }

    case "FETCH_CONTACTS_REJECTED": {
      return {
        ...state,
        fetching: false,
        serverError: action.payload.message,
      };
    }

    case "NEW_CONTACT": {
      return {
        ...state,
        contact: defaultContact,
      };
    }

    case "SAVE_CONTACT_PENDING": {
      return {
        ...state,
        loading: true,
      };
    }

    case "SAVE_CONTACT_FULFILLED": {
      return {
        ...state,
        contacts: [...state.contacts, action.payload.data],
        serverError: null,
        errors: {},
        loading: false,
      };
    }

    case "SAVE_CONTACT_REJECTED": {
      const data = action.payload.response.data;
      const errors = normalizeErrors(data);
      return {
        ...state,
        serverError: data.message,
        errors: errors,
        loading: false,
      };
    }

    case "FETCH_CONTACT_PENDING": {
      return {
        ...state,
        loading: true,
        contact: defaultContact,
      };
    }

    case "FETCH_CONTACT_FULFILLED": {
      return {
        ...state,
        contact: action.payload.data,
        serverError: null,
        errors: {},
        loading: false,
      };
    }

    case "UPDATE_CONTACT_PENDING": {
      return {
        ...state,
        loading: true,
      };
    }

    case "UPDATE_CONTACT_FULFILLED": {
      const contact = action.payload.data;
      return {
        ...state,
        contacts: state.contacts.map((item) =>
          item.id === contact.id ? contact : item
        ),
        serverError: null,
        errors: {},
        loading: false,
      };
    }

    case "UPDATE_CONTACT_REJECTED": {
      const data = action.payload.response.data;
      const errors = normalizeErrors(data);
      return {
        ...state,
        serverError: data.message,
        errors: errors,
        loading: false,
      };
    }

    case "DELETE_CONTACT_FULFILLED": {
      const id = action.payload.data.id;
      return {
        ...state,
        contacts: state.contacts.filter((item) => item.id !== id),
      };
    }

    default:
      return state;
  }
};
