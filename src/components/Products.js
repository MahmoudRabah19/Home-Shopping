import React, { Component, Fragment } from 'react';
import Product from './Product';
import axios from "axios";
const config = require('../config.json');

export default class Products extends Component {

  state = {
    newproduct: null,
    products: []
  }

  fetchProducts = async () => {
    // add call to AWS API Gateway to fetch products here
    // then set them in state
    try {
      console.log("fethcing products");

      const res = await axios.get(`${config.api.invokeUrl}/products`);
      const products = res.data;
      console.log(products);
      this.setState({ products: products });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  componentDidMount = () => {
    this.fetchProducts();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>All Products</h1>
            {/* <p className="subtitle is-5">Invest in a clean future with our efficient and cost-effective green energy products:</p> */}
            <br />
            <div className="columns">
              <div className="column">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    { 
                      this.state.products && this.state.products.length > 0
                      ? this.state.products.map(product => <Product name={product.Product_name} id={product.Type_id} price={product.Product_price} units={product.Product_units_in_stock} description={product.Product_description} category={product.Product_Category} key={product.Ecommerce_type && product.Type_id} />)
                      : <div className="tile notification is-warning">No products available</div>
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
