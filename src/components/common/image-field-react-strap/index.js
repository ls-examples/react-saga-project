import React, {Component} from 'react'
import {FormFeedback, FormGroup, Input, Col, Label, Button, Alert} from "reactstrap";
import Dropzone from "react-dropzone";
import './style.css'

export class ImageDropzoneFieldReactStrap extends Component {
  render() {
    const {imageUploadError, required, label, onDropHandle, onDeleteHandle, input, meta: {error}} = this.props
    return (
      <FormGroup row className={required ? 'required' : ''}>
        <Label sm={2}>{label}</Label>
        <Col sm={10}>
          <Dropzone
            ref="dropzone"
            onDrop={onDropHandle}
            multiple={false}
            style={{
              position: 'relative',
              width: '100%',
              height: 200,
              borderWidth: 2,
              borderColor: 'rgb(102, 102, 102)',
              borderStyle: 'dashed',
              borderRadius: 5
            }}
            accept='image/*'>
            <div>
              <div className="mt-2 ml-2">Загрузить изображение</div>
              <Alert className="m-2" isOpen={!!imageUploadError} color="danger">
                {imageUploadError}
              </Alert>
              <div className="mt-2 ml-2 dropzone-preview">
                {input.value ? <Button color="danger delete-btn" onClick={onDeleteHandle}>х</Button> : ''}
                {input.value ? (<img alt='' src={input.value}/>) : ''}
                <Input
                  {...input}
                  type="hidden"
                />
              </div>
            </div>
          </Dropzone>
          <FormFeedback>{error || imageUploadError}</FormFeedback>
        </Col>
      </FormGroup>
    )
  }
}
