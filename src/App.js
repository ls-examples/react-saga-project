import React, {Component} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import {Route, Switch, NavLink} from "react-router-dom"
import BookList from "./components/books/book-list";
import BookCard from "./components/books/book-card";
import BookForm from "./components/books/book-form";
import {Row, Col, Button} from "reactstrap";

class App extends Component {
  render() {
    return (
      <div className="m-5">
        <Row>
          <Col sm={12} className="mb-3 mt-2">
            <div className="float-left">
              <NavLink to="/">
                Каталог книг
              </NavLink>
            </div>
            <div className="float-right">
              <NavLink to="/book/create" activeStyle={{color: 'red'}}>
                <Button outline size="sm" color="secondary">Добавить</Button>
              </NavLink>
            </div>
          </Col>
        </Row>
        <Switch>
          <Route exact path='/' component={BookList}/>
          <Route exact path='/book/create' component={BookForm}/>
          <Route path='/book/edit/:id' component={BookForm}/>
          <Route path='/book/:id' component={BookCard}/>
        </Switch>
      </div>
    )
  }
}

export default App;
