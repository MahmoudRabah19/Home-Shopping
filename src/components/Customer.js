import React, { Component}  from 'react';


export default class CustomerAdmin extends Component {

  state = {
    isEditMode: false,
    updatedcustomername: this.props.name
  }

  handleCustomerEdit = event => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  }

  handleEditSave = event => {
    event.preventDefault();
    this.setState({ isEditMode: false });
    this.props.handleUpdateCustomer(this.props.id, this.state.updatedcustomername);
  }

  onAddCustomerNameChange = event => this.setState({ "updatedcustomername": event.target.value });

  render() {
    return (
      <div className="tile is-child box notification is-success">
        {
          this.state.isEditMode 
          ? <div>
              <p>Edit Customer name</p>
              <input 
                className="input is-medium"
                type="text" 
                placeholder="Enter name"
                value={this.state.updatedcustomername}
                onChange={this.onAddCustomerNameChange}
              />
              <p className="product-id">id: { this.props.id }</p>
              <button type="submit" 
                className="button is-info is-small"
                onClick={ this.handleEditSave }
              >save</button>
            </div>
          : <div>
              <p className="product-title">{ this.props.name }</p>
              <p className="product-id">Type Id: { this.props.id }</p>
              <p className="product-id">Email: { this.props.email}</p>
              <p className="product-id">Password: { this.props.password}</p>
              <p className="product-id">Username: { this.props.username}</p>
            </div>
        }
      </div>
    )
  }
}
