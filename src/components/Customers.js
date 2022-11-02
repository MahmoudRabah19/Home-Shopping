import React, { Component, Fragment } from 'react';
import Customer from './Customer';
import axios from "axios";
const config = require('../config.json');

export default class Customers extends Component {

  state = {
    newcustomer: null,
    customers: []
  }

  fetchCustomers = async () => {
    // add call to AWS API Gateway to fetch customers here
    // then set them in state
    try {
      console.log("fethcing customers");
       const res = await axios.get(`${config.api.invokeUrl}/customers`);
      const customers = res.data;
      console.log(customers);
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
            <h1>All Customers</h1>
            {/* <p className="subtitle is-5">Invest in a clean future with our efficient and cost-effective green energy customers:</p> */}
            <br />
            <div className="columns">
              <div className="column">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    { 
                      this.state.customers && this.state.customers.length > 0
                      ? this.state.customers.map(customer => <Customer  name={customer.name} id={customer.Type_id} email={customer.email}  password={customer.password} username={customer.username} key={customer.Ecommerce_type && customer.Type_id} />)
                      : <div className="tile notification is-warning">No Customers available</div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
