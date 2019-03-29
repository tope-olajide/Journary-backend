import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import NavigationBar from "../commons/Navigation";
import Footer from "../commons/Footer";
import SubmitButton from "../add-entry/SubmitButton";
import { addEntry } from "../../actions/userActions";
import toastNotification from "./../../utils/toastNotification";
import ProfileForm from "./ProfileForm";
import ProfileImageUpload from "./ProfilePictureUpload";

const EditProfile = props => {
  const [files, setFiles] = useState([]);
  const [submitValue, setSubmitValue] = useState("Submit");
  const [isLoading, setIsLoading] = useState(false);
  const [updateDetails, setUpdateDetails] = useState({
    fullname: "",
    email: "",
    about: ""
  });
  const saveToState = (key, value) => {
    setUpdateDetails({ ...updateDetails, [key]: value });
    console.log(updateDetails);
  };
  const enableLoading = () => {
    setSubmitValue(
      <b>
        <i class="fas fa-spinner fa-lg fa-spin" />
      </b>
    );
    setIsLoading(true);
    toastNotification(["info"], `loading...`);
  };
  const disableLoading = () => {
    setSubmitValue("Submit");
    setIsLoading(false);
  };

  return (
    <>
      <NavigationBar />
      <div className="profile-header">
        <div className="edit-profile-form">
          <form className="login-form">
            <div className="edit-profile-header">
              <h2>Edit Profile</h2>
            </div>
            <ProfileImageUpload files={files} setFiles={setFiles} />
            <ProfileForm saveToState={saveToState} />
            <SubmitButton submitValue={submitValue} isLoading={isLoading} />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default EditProfile;
