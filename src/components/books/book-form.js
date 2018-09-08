import React, {Component} from 'react';
import {Form, FormGroup, Input, Label, Button, FormFeedback, Col} from "reactstrap";

class BookForm extends Component {
  initialState = {
    fields: {
      title: {
        valid: false,
        invalid: false,
        error: '',
        value: '',
      },
      author: {
        valid: false,
        invalid: false,
        error: '',
        value: '',
      },
      year: {
        valid: false,
        invalid: false,
        error: '',
        value: '',
      },
      description: {
        valid: false,
        invalid: false,
        error: '',
        value: '',
      },
    },
  }

  state = this.initialState

  render() {
    const {fields} = this.state
    return (
      <div>
        <h1>Создание книги</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup row className="required">
            <Label for="title" sm={2}>Название</Label>
            <Col sm={10}>
              <Input
                value={fields.title.value}
                onChange={this.handleChange('title')}
                valid={fields.title.valid}
                invalid={fields.title.invalid}
                type="text" name="title" placeholder="Название"/>
            </Col>
          </FormGroup>
          <FormGroup className='required' row>
            <Label for="author" sm={2}>Автор</Label>
            <Col sm={10}>
              <Input
                value={fields.author.value}
                onChange={this.handleChange('author')}
                valid={fields.author.valid}
                invalid={fields.author.invalid}
                type="text" name="author" placeholder="Автор"/>
              <FormFeedback>{fields.author.error}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="year" sm={2}>Год издания</Label>
            <Col sm={10}>
              <Input
                value={fields.year.value}
                onChange={this.handleChange('year')}
                onKeyPress={this.handleKeyPressIntegerField}
                valid={fields.year.valid}
                invalid={fields.year.invalid}
                pattern="[0-9]{4}"
                type="number" name="year" placeholder="Год издания"/>
              <FormFeedback>{fields.year.error}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup className='required' row>
            <Label for="description" sm={2}>Описание</Label>
            <Col sm={10}>
              <Input
                value={fields.description.value}
                onChange={this.handleChange('description')}
                valid={fields.description.valid}
                invalid={fields.description.invalid}
                type="textarea" name="description"/>
              <FormFeedback>{fields.description.error}</FormFeedback>
            </Col>
          </FormGroup>
          <Button disabled={!this.isValidForm()}>Сохранить</Button>
        </Form>
      </div>
    );
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
    this.setState(this.initialState)
  }

  isValidForm = () => ['title', 'author', 'year', 'description'].every(this.isValidField)

  isValidField = (type) => {
    let value = this.state.fields[type].value;
    return this.isValidFieldByValue(type, value)
  }

  isValidFieldByValue = (type, value) => {
    if (typeof value === 'string' || value instanceof String) {
      value = value.trim()
    }

    switch (type) {
      case 'year' :
        return value <= (new Date()).getFullYear()
      default:
        return value.length >= fieldLimits[type].min
    }
  }

  handleChange = (type) => (e) => {
    const {value} = e.target
    if (value.length > fieldLimits[type].max) return

    const valid = this.isValidFieldByValue(type, value)
    const invalid = !valid
    this.setState({
      fields: {
        ...this.state.fields,
        [type]: {
          ...this.state.fields[type],
          value,
          valid,
          invalid
        }
      }
    })
  }

  handleKeyPressIntegerField = (e) => {
    const char = String.fromCharCode(e.keyCode || e.charCode);
    const r = /[0-9]/

    if (!r.test(char)) {
      e.preventDefault();
    }
  }
}

const fieldLimits = {
  title: {
    min: 3,
    max: 150
  },
  author: {
    min: 3,
    max: 100
  },
  description: {
    min: 3,
    max: 2000
  },
  year: {
    min: 0,
    max: 4
  }
}

export default BookForm;
