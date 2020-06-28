import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Exercise = (props) => {
  const { username, description, reps } = props.exercise;
  const id = props.exercise._id;
  const date = props.exercise.date.substring(0, 10);

  const td = (data) => <td className="align-middle">{data}</td>;

  const actions = (
    <div className="text-center">
      <Link to={`/edit/${id}`}>
        <Button variant="primary" size="sm" className="mr-1">
          Edit
        </Button>
      </Link>
      <Button
        variant="danger"
        size="sm"
        onClick={() => props.deleteExercise(id)}
      >
        Delete
      </Button>
    </div>
  );

  if (window.innerWidth >= props.minTableWidth) {
    return (
      <tr>
        {td(username)}
        {td(description)}
        {td(reps)}
        {td(date)}
        <td>{actions}</td>
      </tr>
    );
  }
  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title>{description}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{username}</Card.Subtitle>
        <Card.Text>
          Reps: {reps} <br />
          Date: {date}
          {actions}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Exercise;
