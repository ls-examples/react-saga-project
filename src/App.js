import React, {Component} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import {Route, Switch, NavLink} from "react-router-dom"
import BookList from "./components/books/book-list";
import BookCardPage from "./pages/book-card-page";
import {Row, Col, Button} from "reactstrap";
import NotFound from "./components/common/not-found";
import BookEditPage from "./pages/book-edit-page";
import BookAddPage from "./pages/book-add-page";

class App extends Component {
  render() {
    return (
      <div className="m-5">
        <Row>
          <Col sm={12} className="mb-3 mt-2">
            <div className="float-left">
              <NavLink to="/">
                Books
              </NavLink>
            </div>
            <div className="float-right">
              <NavLink to="/book/create" activeStyle={{color: 'red'}}>
                <Button outline size="sm" color="secondary">Add book</Button>
              </NavLink>
            </div>
          </Col>
        </Row>
        <Switch>
          <Route exact path='/' component={BookList}/>
          <Route exact path='/book/create' component={BookAddPage}/>
          <Route path='/book/edit/:id' render={(props) => {
              return <BookEditPage {...props} id={parseInt(props.match.params.id)}/>
          }}/>
          <Route path='/book/:id' render={(props) => {
              return <BookCardPage {...props} id={parseInt(props.match.params.id)}/>
          }}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    )
  }
}

export default App;
