import React from 'react'
import {FormFeedback, FormGroup, Input, Col, Label} from "reactstrap";

const InputFieldReactStrap = ({required, maxLength, onKeyPress, label, type, input, meta: { error, touched } }) => {
  const isError = !!error
  return (
    <FormGroup row className={required ? 'required' : ''}>
      <Label sm={2}>{label}</Label>
      <Col sm={10}>
        <Input
          onKeyPress={onKeyPress}
          maxLength={maxLength}
          {...input}
          valid={touched && !isError}
          invalid={touched &&  isError}
          type={type}  placeholder={label}/>
        <FormFeedback>{error}</FormFeedback>
      </Col>
    </FormGroup>
  )
}

export default InputFieldReactStrap
