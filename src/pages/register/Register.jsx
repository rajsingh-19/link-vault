import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import { register } from "../../services/index";
import banner from "../../assets/banner.png";
import branding from "../../assets/branding.svg";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [registerFormData, setRegisterFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [errors, setErrors] = useState({});

  // Form validation logic
  const validateForm = () => {
    const errors = {};

    if (!registerFormData.firstName.trim()) {
      errors.firstName = "First name required*";
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!registerFormData.email.trim()) {
      errors.email = "Email required*";
    } else if (!emailRegex.test(registerFormData.email)) {
      errors.email = "Invalid Email*";
    }

    if (!registerFormData.password) {
      errors.password = "Please enter your password*";
    } else if (registerFormData.password.length < 8) {
      errors.password = "The password must be at least 8 characters long*";
    } else {
      // Regex for strong password (at least one uppercase, one lowercase, one number, one special character)
      const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
      if (!strongPasswordRegex.test(registerFormData.password)) {
        errors.password =
          "Add 1 uppercase, 1 lowercase, 1 special character (!@#$%^&*)"
          // "Password must include at least one uppercase, one lowercase, one number, and one special character (!@#$%^&*)";
      }
    };

    if (!registerFormData.confirmPassword) {
      errors.confirmPassword = "Please enter your confirm password*";
    } else if (registerFormData.password !== registerFormData.confirmPassword) {
      errors.confirmPassword = "Password did not match*";
    };

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  //               Function to handle form submission and register the user
  const handleRegisterUser = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior (like refreshing the page)

    if (!checkboxChecked) {
      toast.error("You must agree to the Terms of Use and Privacy Policy");
      return;
    };
  
    if (!validateForm()) {
      return;
    };

    try {
      const res = await register(registerFormData); // Calls the `register` function with the form data
      if (res.status === 201) {
        // Checks if the response status indicates success
        setRegisterFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: ""
        });
        toast.success("Resistered Successfully");
        setCheckboxChecked(false); // Reset checkbox
        navigate("/login");
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
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className={styles.registerPageContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.brandingLogoContainer}>
          <img src={branding} alt="branding logo" />
        </div>
        <div className={styles.registerContainer}>
          <p className={styles.heading}>Sign up to your Spark</p>
          <div className={styles.formContainer}>
            <div className={styles.subHeading}>
              <p>Create an account</p>
              <button onClick={handleLogin}><span>Sign in instead</span></button>
            </div>
            {/* Form for user registration */}
            <form onSubmit={handleRegisterUser} className={styles.registerForm}>
              {/*     firstname       */}
              <div className={styles.inputContainer}>
                <label>First name</label>
                <input
                  className={styles.input}
                  type="text"
                  name="firstName"
                  value={registerFormData.firstName}
                  onChange={(e) =>
                    setRegisterFormData({
                      ...registerFormData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.errorContainer}>
                {errors.firstName ? (
                  <p className={styles.errorMessage}>{errors.firstName}</p>
                ) : (
                  <p className={styles.errorMessage}>&nbsp;</p>
                )}
              </div>
              {/*     lastname        */}
              <div className={`${styles.inputContainer} ${styles.lastNameContainer}`}>
              <label>Last name</label>
                <input
                  className={styles.input}
                  type="text"
                  name="lastName"
                  value={registerFormData.lastName || ""}
                  onChange={(e) =>
                    setRegisterFormData({
                      ...registerFormData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              {/*     email      */}
              <div className={styles.inputContainer}>
              <label>Email</label>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  value={registerFormData.email}
                  onChange={(e) =>
                    setRegisterFormData({
                      ...registerFormData,
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
              <div className={styles.inputContainer}>
              <label>Password</label>
                <input
                  className={styles.input}
                  type="password"
                  name="password"
                  value={registerFormData.password}
                  onChange={(e) =>
                    setRegisterFormData({
                      ...registerFormData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.errorContainer}>
                {errors.password ? (
                  <p className={styles.errorMessage}>{errors.password}</p>
                ) : (
                  <p className={styles.errorMessage}>&nbsp;</p>
                )}
              </div>
              {/*     confirm password */}
              <div className={styles.inputContainer}>
                <label>Confirm Password</label>
                <input
                  className={styles.input}
                  type="password"
                  name="confirmPassword"
                  value={registerFormData.confirmPassword}
                  onChange={(e) =>
                    setRegisterFormData({
                      ...registerFormData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.errorContainer}>
                {errors.confirmPassword ? (
                  <p className={styles.errorMessage}>
                    {errors.confirmPassword}
                  </p>
                ) : (
                  <p className={styles.errorMessage}>&nbsp;</p>
                )}
              </div>
              <div className={styles.checkboxContainer}>
                <input className={styles.checkbox} type="checkbox" checked={checkboxChecked} onChange={(e) => setCheckboxChecked(e.target.checked)} />
                <div className={styles.checkboxContent}><p>By creating an account, I agree to our <span>Terms of use</span></p>
                and <span> Privacy Policy</span></div>
              </div>
              {/*     register btn     */}
              <div>
                <button type="submit" className={styles.registerBtn}>
                  Create an account
                </button>
              </div>
            </form>
          </div>
          <div className={styles.info}>
            This site is protected by reCAPTCHA and the <span>Google Privacy Policy</span> and <span>Terms of Service</span> apply.
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <img src={banner} alt="banner img" />
      </div>
    </div>
  );
};

export default Register;
