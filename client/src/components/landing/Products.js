import React, { Component } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productAction";
import Product from "../general/Product";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.props.getProducts();
  }

  componentDidUpdate() {
    let nextProps = this.props;
    if (nextProps && nextProps.products.products && nextProps.products.products !== this.state.products) {
      const products = nextProps.products.products;
      this.setState({ products });
    }
  }

  productDetails = (product) => {
    return (
      <ul>
        <li>${product.price}</li>
        <li>quantity:{product.quantity}</li>
      </ul>
    );
  };
  
  render() {
    const { products } = this.state;
    // console.log(products);
    return (
      <div className="container-flex">
        <div className="row">
          {products.map((product, index) => (
            <Product
              key={index}
              link={`products/${product._id}`}
              product={product}
              description={this.productDetails(product)}
              thumbnail={product.thumbnail}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, { getProducts })(Products);
