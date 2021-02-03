import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { axiosInstance } from "../../../App";
import ErrorMsg from "../../../components/ErrorMsg/ErrorMsg";
import Input from "../../../components/Input/Input";
import * as actionTypes from "../../../store/actions/actions";

// { isSignUp, loginUser, history, location, match }
class InputList extends Component {
  // show only email and password whe
  //  props.issignup == false ...
  // const [IsFormValid, setIsFormValid] = useState(false);
  // const [FormState, setFormState] = useState({});
  // const [Error, setError] = useState("");
  // const [IsBtnLoading, setIsBtnLoading] = useState(false);
  state = {
    isFormValid: false,
    errorMsg: "",
    isBtnLoading: false,
    form: {
      username: {
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
      },
      password: {
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
      },
    },
  };
  componentDidUpdate(prevProps) {
    if (prevProps.isSignUp !== this.props.isSignUp) {
      this.componentDidMount();
    }
  }
  componentDidMount() {
    const form = { ...this.state.form };
    if (this.props.isSignUp) {
      form["email"] = {
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
      form["firstName"] = {
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
      form["lastName"] = {
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
      form["phoneNumber"] = {
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
    this.setState({
      form: form,
      isFormValid: false,
      errorMsg: "",
    });
  }
  // }, [isSignUp]);

  checkValidity = (rules, value) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length < rules.maxLength && isValid;
    }
    return isValid;
  };
  inputChangeHandler = (identifier, event) => {
    const updateForm = { ...this.state.form };
    const updatedFormElement = {
      ...updateForm[identifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      this.state.form[identifier].validation,
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
    this.setState({
      form: updateForm,
      isFormValid: formValidity,
    });
  };
  handleOnSubmit = () => {
    let url = "get-token";
    const formData = new FormData();
    const formClone = this.state.form;
    for (let i in formClone) {
      formData.append(i, formClone[i].value);
    }
    if (this.props.isSignUp) url = "sign-up";
    this.setState({
      IsBtnLoading: true,
    });
    axiosInstance
      .post(url, formData)
      .then((response) => {
        this.props.loginUser(
          response.data.token,
          response.data.username,
          response.data.email
        );
        this.props.history.push("/orders");
      })
      .catch((err) => {
        let error;
        if (err.response.data.error === "user_exists")
          error = "User aldready exixts. Please create a new username ";
        else error = "Invlid Credentials";
        this.setState({
          errorMsg: error,
          IsBtnLoading: false,
        });
      });
  };
  render() {
    const formState = this.state.form;
    return (
      <div>
        {!!this.state.errorMsg ? (
          <ErrorMsg errMsg={this.state.errorMsg} />
        ) : null}
        {Object.keys(formState).map((item, i) => {
          return (
            <Input
              key={i}
              valid={formState[item].valid}
              change={this.inputChangeHandler.bind(this, item)}
              touched={formState[item].touched}
              value={formState[item].value}
              config={formState[item].elementConfig}
              errorMsg={formState[item].errorMsg}
            />
          );
        })}
        <button
          disabled={!this.state.isFormValid}
          onClick={this.handleOnSubmit}
          className={
            "button is-medium is-fullwidth is-primary " +
            (this.state.isBtnLoading ? "is-loading" : "")
          }
        >
          Proceed
        </button>
      </div>
    );
  }
}

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
