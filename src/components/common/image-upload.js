import React, {Component} from 'react';
import {FormGroup, Col, Input, Label} from "reactstrap";


class ImageUpload extends Component {
  render() {
    return (
      <FormGroup row>
        <Label sm={2} for="image">Изображение</Label>
        <Col sm={10}>
          <Input accept="image/*" onChange={this.handleChange} type="file" name="image"/>
        </Col>
      </FormGroup>
    );
  }

  handleChange = (e) => {
    console.log("change", e.target.value)
  }
}


export default ImageUpload;
