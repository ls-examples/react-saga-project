import React, {Component} from 'react'
import { FormGroup, Form, Input } from "reactstrap";
import PropTypes from "prop-types";

class Filters extends Component {
  static propTypes = {
    onSearch: PropTypes.func
  }

  render() {
    return (
      <div>
        <Form>
          <FormGroup>
            <Input type="text"
                   name="search"
                   onChange={this.handleSearch}
                   placeholder="Поиск" />
          </FormGroup>
        </Form>
      </div>
    )
  }

  handleSearch = (e) => {
    const { onSearch } = this.props

    onSearch && onSearch(e.target.value)
  }
}

export default Filters
