import React from "react";
import { Card, CardImg, CardTitle } from "reactstrap";
export default function Photo(props) {
  return (
    <Card>
      <CardImg
        src={props.photoData.thumbnailUrl}
        alt='Card image cap'
        onClick={() => {
          props.imageClickHandler(props.photoData);
        }}
      />
      <CardTitle tag='h6'>
        {props.photoData.id} - {props.photoData.title}
      </CardTitle>
    </Card>
  );
}
