import React, { useState, useEffect } from "react";
import styles from "./settings.module.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { getUserInfo, updateUser } from "../../services";

const Settings = () => {
  const [updateFormData, setUpdateFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Fetch user info when component mounts
  const fetchUserInfo = async () => {
    try {
      const response = await getUserInfo(userId, token);
      if (response.status === 200) {
        const userData = await response.json();
        setUpdateFormData({
          firstName: userData.result.firstName || "",
          lastName: userData.result.lastName || "",
          email: userData.result.email || "",
          password: "",
          confirmPassword: ""
        });
      } else {
        toast.error("Failed to fetch user info");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      toast.error("An error occurred while fetching user info");
    }
  };
  
  // Call fetchUserInfo on component mount
  useEffect(() => {
    fetchUserInfo();
  }, [userId, token]);

  // Form validation logic
  const validateForm = () => {
    const errors = {};
  
    // Validate First Name if modified
    if (updateFormData.firstName !== undefined && !updateFormData.firstName.trim()) {
      errors.firstName = "First name required*";
    }
  
    // Validate Last Name if modified
    if (updateFormData.lastName !== undefined && !updateFormData.lastName.trim()) {
      errors.lastName = "Last name required*";
    }
  
    // Validate Email if modified
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (updateFormData.email !== undefined) {
      if (!updateFormData.email.trim()) {
        errors.email = "Email required*";
      } else if (!emailRegex.test(updateFormData.email)) {
        errors.email = "Invalid Email*";
      }
    }
  
    // Validate Password if modified
    if (updateFormData.password !== undefined) {
      if (!updateFormData.password) {
        errors.password = "Please enter your password*";
      } else if (updateFormData.password.length < 8) {
        errors.password = "The password must be at least 8 characters long*";
      } else {
        // Strong password regex: at least 1 uppercase, 1 lowercase, 1 number, and 1 special character
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        if (!strongPasswordRegex.test(updateFormData.password)) {
          errors.password = "Add 1 uppercase, 1 lowercase, 1 special character (!@#$%^&*)";
        }
      }
    }
  
    // Validate Confirm Password only if both fields are modified
    if (updateFormData.password !== undefined || updateFormData.confirmPassword !== undefined) {
      if (!updateFormData.confirmPassword) {
        errors.confirmPassword = "Please enter your confirm password*";
      } else if (updateFormData.password !== updateFormData.confirmPassword) {
        errors.confirmPassword = "Password did not match*";
      }
    }
  
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };  

  //               Function to handle form submission and register the user
  const handleUpdateUser = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior (like refreshing the page)

    if (!validateForm()) {
      return;
    };

    try {
      const res = await updateUser(updateFormData, userId, token); // Calls the `update` function with the form data
      if (res.status === 200) {
        console.log("User updated successfully!");
        
        // Clear password before fetching user info
        setUpdateFormData((prevData) => ({
          ...prevData,
          password: "",
          confirmPassword: "",
        }));

        getUserInfo(userId, token);
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

  return (
    <div className={styles.settingsPageContainer}>
      <div className={styles.sidebarContainer}>
        <Sidebar />
      </div>
      <div className={styles.navContainer}>
        <Navbar />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.settingsCard}>
          <div className={styles.heading}>
            <p>Edit Profile</p>
            <hr />
          </div>
          <div className={styles.updateContainer}>
            {/* Form for user registration */}
            <form onSubmit={handleUpdateUser} className={styles.updateUserForm}>
              {/*     firstname       */}
              <div className={styles.inputContainer}>
                <label>First name</label>
                <input
                  className={styles.input}
                  type="text"
                  name="firstName"
                  value={updateFormData.firstName}
                  onChange={(e) =>
                    setUpdateFormData({
                      ...updateFormData,
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
              <div
                className={`${styles.inputContainer} ${styles.lastNameContainer}`}
              >
                <label>Last name</label>
                <input
                  className={styles.input}
                  type="text"
                  name="lastName"
                  value={updateFormData.lastName || ""}
                  onChange={(e) =>
                    setUpdateFormData({
                      ...updateFormData,
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
                  value={updateFormData.email}
                  onChange={(e) =>
                    setUpdateFormData({
                      ...updateFormData,
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
                  value={updateFormData.password}
                  onChange={(e) =>
                    setUpdateFormData({
                      ...updateFormData,
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
              <div className={`${styles.inputContainer} `}>
                <label>Confirm Password</label>
                <input
                  className={styles.input}
                  type="password"
                  name="confirmPassword"
                  value={updateFormData.confirmPassword}
                  onChange={(e) =>
                    setUpdateFormData({
                      ...updateFormData,
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
              {/*     update btn     */}
              <div className={styles.fifthInputContainer}>
                <button type="submit" className={styles.saveBtn}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;