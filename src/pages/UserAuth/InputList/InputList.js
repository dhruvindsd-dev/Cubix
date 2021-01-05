import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { axiosInstance } from "../../../App";
import ErrorMsg from "../../../components/ErrorMsg/ErrorMsg";
import Input from "../../../components/Input/Input";
import * as actionTypes from "../../../store/actions/actions";
const InputList = ({ isSignUp, loginUser, history, location, match }) => {
  // show only email and password when props.issignup == false ...
  const [IsFormValid, setIsFormValid] = useState(false);
  const [FormState, setFormState] = useState({});
  const [Error, setError] = useState("");
  const [IsBtnLoading, setIsBtnLoading] = useState(false);

  useEffect(() => {
    const form = {};
    form.username = {
      elementType: "input",
      value: "",
      touched: false,
      valid: false,
      validation: {
        required: true,
      },
      elementConfig: {
        type: "text",
        placeholder: "Enter Your Username *",
      },
      errorMsg: "Enter a valid username ",
    };
    form.password = {
      elementType: "input",
      value: "",
      touched: false,
      valid: false,
      validation: {
        required: true,
      },
      elementConfig: {
        type: "password",
        placeholder: "Enter Your Password *",
      },
      errorMsg: "Enter a valid password",
    };
    if (isSignUp) {
      form.email = {
        elementType: "input",
        value: "",
        touched: false,
        valid: false,
        validation: {
          required: true,
        },
        elementConfig: {
          type: "email",
          placeholder: "Enter Your Email Address *",
        },
        errorMsg: "Enter valid Email",
      };
      form.firstName = {
        elementType: "input",
        value: "",
        touched: false,
        valid: false,
        validation: {
          required: true,
        },
        elementConfig: {
          type: "text",
          placeholder: "FirstName *",
        },
        errorMsg: "Enter your first name ",
      };
      form.lastName = {
        elementType: "input",
        value: "",
        touched: false,
        valid: false,
        validation: {
          required: true,
        },
        elementConfig: {
          type: "text",
          placeholder: "Last Name *",
        },
        errorMsg: "Enter your last name ",
      };
      form.phoneNumber = {
        elementType: "input",
        value: "",
        touched: false,
        valid: false,
        validation: {
          required: true,
          maxLength: 10,
        },
        elementConfig: {
          type: "tel",
          placeholder: "Enter Your Phone Number *",
        },
        errorMsg: "Enter a valid phone number ",
      };
    }
    // resetting the form when changing routes, aka when the component gets reset
    // for (let item in FormState) {
    //   form[item].value = "";
    // }
    setFormState(form);
    setIsFormValid(false);
    setError("");
  }, [isSignUp]);

  const checkValidity = (rules, value) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length < rules.maxLength && isValid;
    }
    return isValid;
  };
  const inputChangeHandler = (identifier, event) => {
    const updateForm = { ...FormState };
    const updatedFormElement = {
      ...updateForm[identifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      FormState[identifier].validation,
      event.target.value
    );
    updatedFormElement.touched = true;
    updateForm[identifier] = updatedFormElement;

    let formValidity = true;
    for (let item in updateForm) {
      if (!updateForm[item].valid) {
        formValidity = false;
        break;
      }
    }
    setIsFormValid(formValidity);
    setFormState(updateForm);
  };
  const handleOnSubmit = () => {
    let url = "get-token";
    const formData = new FormData();
    for (let i in FormState) {
      formData.append(i, FormState[i].value);
    }
    if (isSignUp) url = "sign-up";
    setIsBtnLoading(true);
    axiosInstance
      .post(url, formData)
      .then((response) => {
        loginUser(
          response.data.token,
          response.data.username,
          response.data.email
        );
        history.push("/orders");
      })
      .catch((error) => {
        if (error.response.data.error == "user_exists")
          setError("User Aldready Exixts. Create A New Username");
        else setError("Invalid Credentials");
        setIsBtnLoading(false);
      });
  };
  return (
    <div>
      {!!Error ? <ErrorMsg errMsg={Error} /> : null}
      {Object.keys(FormState).map((item, i) => {
        return (
          <Input
            key={i}
            valid={FormState[item].valid}
            change={inputChangeHandler.bind(this, item)}
            touched={FormState[item].touched}
            value={FormState[item].value}
            config={FormState[item].elementConfig}
            errorMsg={FormState[item].errorMsg}
          />
        );
      })}
      <button
        disabled={!IsFormValid}
        onClick={handleOnSubmit}
        className={
          "button is-medium is-fullwidth is-primary " +
          (IsBtnLoading ? "is-loading" : "")
        }
      >
        Proceed
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (token, username, email) => {
      dispatch({
        type: actionTypes.LOGIN,
        payload: { token: token, username: username, email: email },
      });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InputList));
