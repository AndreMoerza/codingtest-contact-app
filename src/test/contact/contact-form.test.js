import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "../../enzyme";
import ContactForm from "../../components/contact-form";
import store from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

describe("Create Contact(Snapshot)", () => {
  let create;

  beforeEach(() => {
    create = shallow(
      <Router>
        <Provider store={store}>
          <ContactForm />
        </Provider>
      </Router>
    )
      .dive()
      .dive();
  });

  it("Create Contact ", () => {
    const component = renderer.create(
      <Router>
        <Provider store={store}>
          <ContactForm />
        </Provider>
      </Router>
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
