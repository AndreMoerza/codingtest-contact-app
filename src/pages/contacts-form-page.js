import React, { Component } from "react";
import ContactForm from "../components/contact-form";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { SubmissionError } from "redux-form";
import {
  newContact,
  saveContact,
  fetchContact,
  updateContact,
} from "../actions/contacts-actions";

class ContactsFormPage extends Component {
  state = {
    redirect: false,
  };

  componentDidMount = () => {
    const { id } = this.props.match.params;
    if (id) {
      this.props.fetchContact(id);
    } else {
      this.props.newContact();
    }
  };

  submit = (contact) => {
    if (!contact.id) {
      return this.props
        .saveContact(contact)
        .then((response) => this.setState({ redirect: true }))
        .catch((err) => {
          throw new SubmissionError(this.props.errors);
        });
    } else {
      const id = contact.id;
      delete contact.id;
      return this.props
        .updateContact(id, contact)
        .then((response) => this.setState({ redirect: true }))
        .catch((err) => {
          throw new SubmissionError(this.props.errors);
        });
    }
  };

  render() {
    return (
      <div>
        {this.state.redirect ? (
          <Redirect to="/" />
        ) : (
          <ContactForm
            contact={this.props.contact}
            errorMessage={this.props.errorMessage}
            errors={this.props.errors}
            loading={this.props.loading}
            onSubmit={this.submit}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contact: state.contactStore.contact.data,
    errorMessage: state.contactStore.errorMessage,
    errors: state.contactStore.errors,
    loading: state.contactStore.loading,
  };
}

export default connect(mapStateToProps, {
  newContact,
  saveContact,
  fetchContact,
  updateContact,
})(ContactsFormPage);
