import React, {Component} from 'react';
import {reduxForm, Field, autofill, change} from 'redux-form'
import PropTypes from "prop-types";
import {Alert, Button} from "reactstrap";
import FieldReactStrap from "../../common/input-field-react-strap";
import {ImageDropzoneFieldReactStrap} from "../../common/image-field-react-strap";
import {normalizeWithoutSpaces} from "../../../ducks/utils";
import {getBase64} from "../../../ducks/utils";


class BookForm extends Component {
  static propTypes = {
    book: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      author: PropTypes.string,
      year: PropTypes.year,
      image: PropTypes.string,
      description: PropTypes.string,
    }),
    handleSubmit: PropTypes.func,
    error: PropTypes.string,
  }

  constructor(props) {
    super(props)
    const {book, autofill} = this.props
    if (book) {
      autofill('title', book.title)
      autofill('author', book.author)
      autofill('description', book.description)
      autofill('year', book.year)
      autofill('image', book.image)
    }
  }

  render() {
    const {invalid, submitting, error, submitSucceeded} = this.props
    return (
      <div>
        <Alert isOpen={submitSucceeded && !submitting}>
          {(submitSucceeded && !submitting) ? 'Изменения успешно сохранены' : ''}
        </Alert>
        <Alert isOpen={!!error} color="danger">
          {error}
        </Alert>
        <form onSubmit={this.props.handleSubmit}>
          <Field
            required={true}
            normalize={normalizeWithoutSpaces}
            maxLength={150} name="title" label="Название" component={FieldReactStrap}/>
          <Field required={true} normalize={normalizeWithoutSpaces} maxLength={100} name="author" label="Автор"
                 component={FieldReactStrap}/>
          <Field
            onKeyPress={this.handleKeyPressIntegerField}
            type="number" name="year" label="Год издания" component={FieldReactStrap}/>
          <Field
            type="textarea"
            required={true}
            normalize={normalizeWithoutSpaces}
            maxLength={2000} name="description" label="Описание" component={FieldReactStrap}/>
          <Field name="image" label="Изображение" onDropHandle={this.uploadImage} onDeleteHandle={this.onDeleteImage} component={ImageDropzoneFieldReactStrap} type="hidden" />
          <div>
            <Button disabled={invalid || submitting}>Сохранить</Button>
          </div>
        </form>
      </div>
    )
  }

  handleKeyPressIntegerField = (e) => {
    const char = String.fromCharCode(e.keyCode || e.charCode);
    const r = /[0-9]/

    if (!r.test(char)) {
      e.preventDefault();
    }
  }

  uploadImage = (upload) => {
    if (upload.length === 0) {
      return
    }
    const {change} = this.props
    getBase64(upload[0])
      .then((value) => {
        if (value) {
          change('image', value)
        }
      })
      .catch(err => console.error(err))
  }

  onDeleteImage = (e) => {
    e.stopPropagation()
    const {change} = this.props
    change('image', '')
  }
}

function validate({title, author, year, description}) {
  const errors = {}
  if (!title) errors.title = 'Это обязательное поле'

  if (!author) errors.author = 'Это обязательное поле'

  if (!description) errors.description = 'Это обязательное поле'


  if (year > (new Date()).getFullYear()) {
    errors.year = 'Год должен быть не больше текущего'
  }

  return errors
}


export default reduxForm({
  form: 'book',
  validate
}, {autofill, change})(BookForm)
