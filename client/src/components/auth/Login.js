import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { message } from "antd";
import Input from "../general/Input";
import { login } from "../../actions/authActions";
import { withRouter } from "./withRouter";
// import { with}
// import { decodeUser } from "../../util";
// import { addToCart } from "../../actions/cartActions";

const addToCart = () => {};

const decodeUser = () => {};

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        let nextProps = this.props;
        const search = prevProps.location.search;
        let split = search.split("redirect=");
        const hasRirect = search.includes("redirect=");
        split = split[split.length - 1];

        if (nextProps && nextProps.errors && nextProps.errors.length > 0) {
            console.log("here1");
            nextProps.errors.forEach((error) => {
                message.error(error.msg);
            });
        }

        if (
            nextProps &&
            nextProps.auth &&
            nextProps.auth.errors &&
            nextProps.auth.errors.length > 0
        ) {
            console.log("here2");
            nextProps.auth.errors.forEach((error) => {
                message.error(error.msg);
            });
        }

        if (nextProps.isAuthenticated) {
            console.log("here3");
            if (split && hasRirect) {
                if (
                    split === "/cart" &&
                    localStorage.getItem("token") &&
                    localStorage.getItem("products")
                ) {
                    const userId = decodeUser().user.id;
                    const cartProducts = JSON.parse(
                        localStorage.getItem("products")
                    );
                    const context = { products: cartProducts, userId };
                    prevProps.addToCart(context);
                    localStorage.removeItem("products");
                }
                prevProps.navigate(split);
            } else {
                setTimeout(() => prevProps.navigate("/"), 3000);
            }
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        const { email, password } = this.state;
        const user = {
            email,
            password,
        };

        this.props.login(user);
    }

    render() {
        console.log('login render----')
        const search = this.props.location.search;
        const split = search.split("redirect=");
        const redirect = split[split.length - 1];
        const hasRirect = redirect.length > 0 && search.includes("redirect");
        return (
            <div className="container">
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead">
                    <i className="fas fa-user"></i>Sign Into Your Account
                </p>
                <div className="form">
                    <Input
                        name="email"
                        type="email"
                        placeholder="Enter Email"
                        value={this.state.email}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form">
                    <Input
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                </div>
                <button className="btn btn-primary" onClick={this.onSubmit}>
                    {" "}
                    Sign In
                </button>
                <p className="my-1">
                    Dont Have an account?
                    <Link
                        to={`/register?role=customer${
                            hasRirect ? "&redirect=" + redirect : ""
                        }`}
                    >
                        {" "}
                        Sign Up
                    </Link>
                </p>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.auth.errors,
});

export default connect(mapStateToProps, { login, addToCart })(
    withRouter(Login)
);
