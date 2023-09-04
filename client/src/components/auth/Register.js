import React, { Component } from "react";
// import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { message } from "antd";
import Input from "../general/Input";
import { register } from "../../actions/authActions";
import { withRouter } from "./withRouter";
// import { decodeUser } from "../../util";
// import { addToCart } from "../../actions/cartActions";

const addToCart = () => {};

const decodeUser = () => {};

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
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
        if (
            nextProps &&
            nextProps.auth.errors &&
            nextProps.auth.errors.length > 0
        ) {
            nextProps.auth.errors.forEach((error) => {
                message.error(error.msg);
            });
        }

        if (nextProps.auth.isAuthenticated) {
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
                message.success("Thank you for signing up");
                setTimeout(() => prevProps.navigate("/"), 3000);
            }
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit() {
        let split = this.props.location.search.split("?role=");
        split = split[split.length - 1].split("&");
        const role = split[0];

        const { name, email, password } = this.state;
        const newUser = {
            name,
            email,
            password,
            role,
        };
        if (password === this.state.password2) {
            this.props.register(newUser);
        } else {
            message.error("Passwords must match");
        }
    }

    render() {
        const { name, password, password2, email } = this.state;
        return (
            <div className="container">
                <h1 className="large text-primary">Register</h1>
                <p className="lead">
                    <i className="fas fa-user"></i>Create Your Account
                </p>
                <div className="form">
                    <Input
                        name="name"
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form">
                    <Input
                        name="email"
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form">
                    <Input
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form">
                    <Input
                        name="password2"
                        type="password"
                        placeholder="Confirm Password"
                        value={password2}
                        onChange={this.onChange}
                    />
                </div>
                <button className="btn btn-primary" onClick={this.onSubmit}>
                    {" "}
                    Register
                </button>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { register, addToCart })(
    withRouter(Register)
);
