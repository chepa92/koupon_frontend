import React, { Component } from 'react';
import api from '../../api/api';

export default class AddCoupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      capitals: '',
      area: '',
      description: '',
      message: null,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleClick(e) {
    e.preventDefault();
    console.log(this.state.name, this.state.description);
    let data = {
      name: this.state.name,
      capitals: this.state.capitals,
      area: this.state.area,
      description: this.state.description,
    };
    api
      .addCoupon(data)
      .then(result => {
        console.log('SUCCESS!');
        this.setState({
          name: '',
          capitals: '',
          area: '',
          description: '',
          message: `Your coupon '${this.state.name}' has been created`,
        });
        setTimeout(() => {
          this.setState({
            message: null,
          });
        }, 2000);
      })
      .catch(err => this.setState({ message: err.toString() }));
  }
  render() {
    return (
      <div className="AddCoupon">
        <h2>Add Coupon</h2>
        <form>
          Name:{' '}
          <input
            type="text"
            value={this.state.name}
            name="name"
            onChange={this.handleInputChange}
          />{' '}
          <br />
          Descb:{' '}
          <input
            type="text"
            value={this.state.capitals}
            name="capitals"
            onChange={this.handleInputChange}
          />{' '}
          <br />
          Link:{' '}
          <input
            type="number"
            value={this.state.area}
            name="area"
            onChange={this.handleInputChange}
          />{' '}
          <br />
          More:{' '}
          <textarea
            value={this.state.description}
            name="description"
            cols="30"
            rows="10"
            onChange={this.handleInputChange}
          />{' '}
          <br />
          <button onClick={e => this.handleClick(e)}>Add coupon</button>
        </form>
        {this.state.message && <div className="info">{this.state.message}</div>}
      </div>
    );
  }
}
