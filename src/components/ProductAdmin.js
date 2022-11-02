import React, { Component, Fragment } from 'react';
import Product from './Product';
import axios from "axios";
const config = require('../config.json');

export default class ProductAdmin extends Component {

  state = {
    newproduct: {
      "Ecommerce_type": "Ecommerce_Product",
      "Product_name": "",
      "Type_id": "",
      "Product_price": "",
      "Product_units_in_stock": "",
      "Product_description": "",
      "Product_Category": ""
    },
    products: []
  }

  handleAddProduct = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway add product endpoint here
    try {
      const params = {
        "Ecommerce_type": this.state.newproduct.Ecommerce_type,
        "Type_id": id,
        "Product_name": this.state.newproduct.Product_name,
        "Product_price": this.state.newproduct.Product_price,
        "Product_units_in_stock": this.state.newproduct.Product_units_in_stock,
        "Product_description": this.state.newproduct.Product_description,
        "Product_Category": this.state.newproduct.Product_Category
      }
      await axios.put(`${config.api.invokeUrl}/products/${id}`, params);
      this.setState({ products: [...this.state.products, this.state.newproduct] });
      this.setState({
        newproduct: {
          "Product_name": "",
          "Type_id": "",
          "Product_price": "",
          "Product_description": "",
          "Product_units_in_stock": "",
          "Product_Category": ""
        }
      });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  handleUpdateProduct = async (id, name) => {
    // add call to AWS API Gateway update product endpoint here
    try {
      const params = {
        "Type_id": id,
        "Product_name": name
      };
      await axios.patch(`${config.api.invokeUrl}/products/${id}`, params);
      const productToUpdate = [...this.state.products].find(product => product.Type_id === id);
      const updatedProducts = [...this.state.products].filter(product => product.Type_id !== id);
      productToUpdate.Product_name = name;
      updatedProducts.push(productToUpdate);
      this.setState({ products: updatedProducts });
    } catch (err) {
      console.log(`Error updating product: ${err}`);
    }
  }

  handleDeleteProduct = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway delete product endpoint here
    try {
      await axios.delete(`${config.api.invokeUrl}/products/${id}`);
      const updatedProducts = [...this.state.products].filter(product => product.Type_id !== id);
      this.setState({ products: updatedProducts });
    } catch (err) {
      console.log(`Unable to delete product: ${err}`);
    }
  }

  fetchProducts = async () => {
    // add call to AWS API Gateway to fetch products here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/products`);
      const products = res.data;
      this.setState({ products: products });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  onAddProductNameChange = event => this.setState({ newproduct: { ...this.state.newproduct, "Product_name": event.target.value } });
  onAddProductIdChange = event => this.setState({ newproduct: { ...this.state.newproduct, "Type_id": event.target.value } });
  onAddProductPriceChange = event => this.setState({ newproduct: { ...this.state.newproduct, "Product_price": event.target.value } });
  onAddProductUnitsChange = event => this.setState({ newproduct: { ...this.state.newproduct, "Product_units_in_stock": event.target.value } });
  onAddProductDesChange = event => this.setState({ newproduct: { ...this.state.newproduct, "Product_description": event.target.value } });
  onAddProductCatChange = event => this.setState({ newproduct: { ...this.state.newproduct, "Product_Category": event.target.value } });
  componentDidMount = () => {
    this.fetchProducts();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Product Admin</h1>
            <p className="subtitle is-5">Add and remove products using the form below:</p>
            <br />
            <div className="columns">
              <div className="column is-one-third">
                <form onSubmit={event => this.handleAddProduct(this.state.newproduct.Type_id, event)}>
                  <div>
                    <div className="control">
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Product Name .."
                        value={this.state.newproduct.Product_name}
                        onChange={this.onAddProductNameChange}
                      />
                    </div>
                    <div className="control">
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Product Type Id .."
                        value={this.state.newproduct.Type_id}
                        onChange={this.onAddProductIdChange}
                      />
                    </div>
                    <div className="control">
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Product Price .."
                        value={this.state.newproduct.Product_price}
                        onChange={this.onAddProductPriceChange}
                      />
                    </div>
                    <div className="control">
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Product Description .."
                        value={this.state.newproduct.Product_description}
                        onChange={this.onAddProductDesChange}
                      />
                    </div>
                    <div className="control">
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Product Units in Stock .."
                        value={this.state.newproduct.Product_units_in_stock}
                        onChange={this.onAddProductUnitsChange}
                      />
                    </div>

                    <div className="control">
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Product Category .."
                        value={this.state.newproduct.Product_Category}
                        onChange={this.onAddProductCatChange}
                      />
                    </div>

                    <div className="control">
                      <button type="submit" className="button is-primary is-medium">
                        Add product
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="column is-two-thirds">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    {
                      this.state.products.map((product, index) =>
                        <Product
                          isAdmin={true}
                          handleUpdateProduct={this.handleUpdateProduct}
                          handleDeleteProduct={this.handleDeleteProduct}
                          name={product.Product_name}
                          id={product.Type_id}
                          price={product.Product_price}
                          units={product.Product_units_in_stock}
                          description={product.Product_description}
                          category={product.Product_Category}
                          key={product.Ecommerce_type && product.Type_id}

                        />)
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
