import React, {Component} from 'react'
import {FormGroup, Form, Input} from "reactstrap";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSortAmountDown, faSortAmountUp} from '@fortawesome/free-solid-svg-icons'
import {
  changeSort,
  orderBySelector,
  orderDirectionSelector, searchBooks,
  searchSelector
} from "../../ducks/books";
import {connect} from 'react-redux'

class Filters extends Component {
  static propTypes = {
    onSearch: PropTypes.func,
    search: PropTypes.string,
    changeSort: PropTypes.func,
    orderDirection: PropTypes.string,
    orderBy: PropTypes.string,
  }

  render() {
    const {search, orderBy, orderDirection} = this.props
    return (
      <div>
        <Form>
          <FormGroup>
            <Input type="text"
                   name="search"
                   defaultValue={search}
                   onChange={this.handleSearch}
                   placeholder="Search"/>
          </FormGroup>
          <div>
            <a href="" onClick={this.handleSortTitle}>
              Title
              {'title' === orderBy ?
                <FontAwesomeIcon icon={orderDirection === 'desc' ? faSortAmountDown : faSortAmountUp}/> : ''}
            </a>
            {' '}
            <a href="" onClick={this.handleSortAuthor}>
              Author
              {'author' === orderBy ?
                <FontAwesomeIcon icon={orderDirection === 'desc' ? faSortAmountDown : faSortAmountUp}/> : ''}
            </a>
          </div>
        </Form>
      </div>
    )
  }


  handleSortTitle = (e) => {
    e.preventDefault()
    const {orderDirection, changeSort} = this.props
    changeSort('title', orderDirection === 'desc' ? 'asc' : 'desc')
  }

  handleSortAuthor = (e) => {
    e.preventDefault()
    const {orderDirection, changeSort} = this.props
    changeSort('author', orderDirection === 'desc' ? 'asc' : 'desc')
  }

  handleSearch = (e) => {
    const {searchBooks} = this.props

    searchBooks && searchBooks(e.target.value)
  }
}

export default connect(
  (state) => ({
    search: searchSelector(state),
    orderDirection: orderDirectionSelector(state),
    orderBy: orderBySelector(state),
  }),
  {searchBooks, changeSort}
)(Filters)
