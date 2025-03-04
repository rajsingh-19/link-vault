import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { login } from "../../services/index";
import banner from "../../assets/banner.png";
import branding from "../../assets/branding.svg";
import hideIcon from "../../assets/hideIcon.svg";

const Login = () => {
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Form validation logic
  const validateForm = () => {
    const errors = {};

    if (!loginFormData.email) {
      errors.email = "Enter Email*";
    };

    if (!loginFormData.password) {
      errors.password = "Please password*";
    };

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  //               Function to handle form login the user
  const handleLoginUser = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior (like refreshing the page)

    if (!validateForm()) {
      return;
    };

    try {
      const res = await login(loginFormData); // Calls the `register` function with the form data
      if (res.status === 200) {
        // Checks if the response status indicates success
        const data = await res.json();
        localStorage.setItem("userId", data.result.userId);
        localStorage.setItem("email", data.result.email);
        localStorage.setItem("token", data.result.token);
        const firstName = data.result.firstName;
        const lastName = data.result.lastName;

        const fullName = `${firstName} ${lastName}`;
        localStorage.setItem("fullName", `${fullName}!`);

        setLoginFormData({
          email: "",
          password: "",
        });

        // Check if username is non-empty after trimming
        if (data.result.userName && data.result.userName.trim() !== "") {
          localStorage.setItem("userName", data.result.userName);
          navigate("/links"); // Username is set, go to links page
        } else {
          navigate("/category"); // First-time login, username not set, go to category page
        }
      } else {
        // Handles any errors by logging the response and showing an alert
        const errorData = await res.json();
        const errorMessage = errorData.message || "An error occurred";
        toast.error(errorMessage); // Show the error message from the backend
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred:", error);
    }
  };

  //              function for handle the login
  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.brandingLogoContainer}>
          <img src={branding} alt="branding logo" />
        </div>
        <div className={styles.loginContainer}>
          <p className={styles.heading}>Sign in to your Spark</p>
          <div className={styles.formContainer}>
            {/* Form for user registration */}
            <form onSubmit={handleLoginUser} className={styles.loginForm}>
              {/*     email      */}
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={loginFormData.email}
                  onChange={(e) =>
                    setLoginFormData({
                      ...loginFormData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.errorContainer}>
                {errors.email ? (
                  <p className={styles.errorMessage}>{errors.email}</p>
                ) : (
                  <p className={styles.errorMessage}>&nbsp;</p>
                )}
              </div>
              {/*     password   */}
              <div className={`${styles.inputContainer}  ${styles.passwordContainer}`}>
                <input
                  className={styles.input}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={loginFormData.password}
                  onChange={(e) =>
                    setLoginFormData({
                      ...loginFormData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <button type="button" onClick={handleTogglePassword}>
                  <img src={hideIcon} alt="hide icon" />
                </button>
              </div>
              <div className={styles.errorContainer}>
                {errors.password ? (
                  <p className={styles.errorMessage}>{errors.password}</p>
                ) : (
                  <p className={styles.errorMessage}>&nbsp;</p>
                )}
              </div>
              {/*     login btn     */}
              <div className={styles.loginBtnContainer}>
                <button type="submit" className={styles.loginBtn}>
                  Log in
                </button>
              </div>
            </form>
          </div>
          <div className={styles.signUpContainer}>
            <p>Don't have an account?</p>
            <button onClick={handleSignUp}>Sign up</button>
          </div>
          <div className={styles.info}>
            This site is protected by reCAPTCHA and the{" "}
            <span>Google Privacy Policy</span> and <span>Terms of Service</span>{" "}
            apply.
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <img src={banner} alt="banner img" />
      </div>
    </div>
  );
};

export default Login;
