import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { axiosInstance } from "../../../App";
import ErrorMsg from "../../../components/ErrorMsg/ErrorMsg";
import { LOGIN } from "../../../store/actions/actions";

// email and password
const generaForm = {
  username: {
    validation: {
      required: true,
    },
    placeholder: "Username",
    errorMsg: "Invalid Username",
  },
  password: {
    validation: {
      required: true,
    },
    placeholder: "Password",
    errorMsg: "Invalid Password",
  },
};
const signUpFields = {
  email: {
    validation: {
      required: true,
      pattern: /\S+@\S+\.\S+/,
    },
    placeholder: "Email",
    errorMsg: "Please enter a valid email",
  },
  firstName: {
    validation: {
      required: true,
    },
    placeholder: "First Name",
    errorMsg: "Please enter a valid email",
  },
  lastName: {
    validation: {
      required: true,
    },
    placeholder: "Last Name",
    errorMsg: "Invalid Password",
  },
  phoneNum: {
    validation: {
      required: true,
      minLength: 10,
    },
    placeholder: "Phone number",
    errorMsg: "Invalid Phone number",
  },
};
function HooksForm(props) {
  const [IsLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, errors } = useForm();
  const [Error, setError] = useState("");
  const handleData = (data) => {
    console.log(data);
    let url = "get-token";
    const formData = new FormData();
    for (let i in data) {
      formData.append(i, data[i]);
    }
    // there can be a possiblily that the user aldready has something in the cart, so while logging in or signing in the user sending the product ids  to the backend add the items in his cart .
    let cartProductIds = props.cart.map((item) => item.id);
    formData.append("cart", cartProductIds);
    if (props.isSignUp) url = "sign-up";
    setIsLoading(true);
    axiosInstance
      .post(url, formData)
      .then((response) => {
        props.loginUser(
          response.data.token,
          response.data.username,
          response.data.email
        );
        if (props.redirect) props.history.push(props.redirect);
        else props.history.push("/orders");
      })
      .catch((err) => {
        let error;
        if (err.response.data.error === "user_exists")
          error = "User already exists. Please create a new username ";
        else error = "Invalid Credentials";
        setIsLoading(false);
        setError(error);
      });
  };

  return (
    <div>
      {!!Error ? <ErrorMsg errMsg={Error} /> : null}
      <form onSubmit={handleSubmit(handleData)}>
        {props.isSignUp &&
          Object.keys(signUpFields).map((item) => {
            console.log(item);
            return (
              <Field
                inputRef={register(signUpFields[item].validation)}
                error={errors[item]}
                errorMsg={signUpFields[item].errorMsg}
                placeholder={signUpFields[item].placeholder}
                name={item}
              />
            );
          })}
        {Object.keys(generaForm).map((item) => (
          <Field
            inputRef={register(generaForm[item].validation)}
            error={errors[item]}
            errorMsg={generaForm[item].errorMsg}
            placeholder={generaForm[item].placeholder}
            name={item}
          />
        ))}
        <button
          className={`button is-fullwidth is-primary ${
            IsLoading ? "is-loading" : ""
          }`}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

const Field = ({
  inputRef,
  errorMsg,
  name,
  error,
  placeholder,
  type = "text",
}) => (
  <div className="field">
    <div className="control">
      <input
        name={name}
        placeholder={placeholder}
        type={type}
        ref={inputRef}
        className="input"
      />
    </div>
    {error && <p className="help is-danger has-text-left">{errorMsg}</p>}
  </div>
);
const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (token, username, email) => {
      dispatch({
        type: LOGIN,
        payload: { token: token, username: username, email: email },
      });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HooksForm));
