import React, { Component, Fragment } from 'react';
import Customer from './Customer';
import axios from "axios";
const config = require('../config.json');

export default class CustomerAdmin extends Component {

  state = {
    newcustomer: {
      "Ecommerce_type": "Ecommerce_Customer",
      "Type_id": "",
      "name": "",
      "email": "",
      "password": "",
      "username": ""
    },
    customers: []
  }

 
  fetchCustomers = async () => {
    // add call to AWS API Gateway to fetch customers here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/customers`);
      const customers = res.data;
      this.setState({ customers: customers });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  componentDidMount = () => {
    this.fetchCustomers();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Customer Admin</h1>
                    {
                      this.state.customers.map((customer, index) =>
                        <Customer
                          isAdmin={true}
                          name={customer.name}
                          id={customer.Type_id}
                          email={customer.email}
                          password={customer.password}
                          username={customer.username}
                          key={customer.Ecommerce_type && customer.Type_id}
                          />)
                    }
                  </div>
        </section>
      </Fragment>
    )
  }
}
