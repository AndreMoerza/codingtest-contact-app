import React from "react";
import { Card, Button, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function ContactCard({ contact, deleteContact }) {
  return (
    <Card>
      <Image
        src={contact.photo !== "N/A" ? contact.photo : ""}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>
          {contact.firstName} {contact.lastName}
        </Card.Header>

        <Card.Description>Age : {contact.age}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Link
            to={`/contacts/edit/${contact.id}`}
            className="ui basic button green"
          >
            Edit
          </Link>
          <Button basic color="red" onClick={() => deleteContact(contact.id)}>
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}

ContactCard.propTypes = {
  // contact: React.PropTypes.object.isRequired,
  // deleteContact: React.PropTypes.func.isRequired,
};
