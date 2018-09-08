import React, {Component} from 'react';
import {Form, FormGroup, Input} from "reactstrap";

class SearchFilter extends Component {
  render() {
    return (
      <div>
        <Form>
          <FormGroup>
            <Input type="text" name="search"  placeholder="Поиск" />
          </FormGroup>
        </Form>
      </div>
    );
  }
}


export default SearchFilter;
