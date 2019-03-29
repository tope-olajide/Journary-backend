import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import NavigationBar from "../commons/Navigation";
import Footer from "../commons/Footer";
import SubmitButton from "../add-entry/SubmitButton";
import toastNotification from "./../../utils/toastNotification";
import ProfileForm from "./ProfileForm";
import ProfileImageUpload from "./ProfilePictureUpload";
import axios from "axios";
const EditProfile = props => {
  const [files, setFiles] = useState([]);
  const [submitValue, setSubmitValue] = useState("Submit");
  const [isLoading, setIsLoading] = useState(false);
  const [entryImageUrl, setEntryImageUrl] = useState("");
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
  const handleSubmit = () => {
    const file = files[files.length - 1];
    if (!file) {
      enableLoading();
      props
        .updateProfile(updateDetails)
        .then(() => {
          toastNotification(["success"], `saved to database successfully`);
          disableLoading();
        })
        .catch(function(err) {
          toastNotification(["error"], `  ${err.response.data.message}`);
          disableLoading();
        });
    } else {
      enableLoading();
      const formData = new FormData();
      formData.append("upload_preset", "sijxpjkn");
      formData.append("api_key", "139423638121511");
      formData.append("file", file);
      formData.append("timestamp", (Date.now() / 1000) | 0);
      // Make an AJAX upload request using Axios
      axios({
        method: "post",
        url: "https://api.cloudinary.com/v1_1/temitope/image/upload",
        data: formData,
        headers: { "X-Requested-With": "XMLHttpRequest" },
        transformRequest: [
          (data, headers) => {
            delete headers.common.authorization;
            return data;
          }
        ]
      }).then(response => {
        console.log(response);
        const { data } = response;
        console.log(data);
        const { secure_url, public_id } = data;
        const upoadedImage = [];
        upoadedImage.push({ imageUrl: secure_url, imageId: public_id });
        const imgUrlToString = JSON.stringify(upoadedImage);
        setEntryImageUrl(imgUrlToString);
        toastNotification(["info"], `${file} uploaded successfully!`);
        props
          .updateProfile(updateDetails)
          .then(() => {
            toastNotification(["success"], `saved to database successfully`);
            disableLoading();
          })
          .catch(function(err) {
            toastNotification(["error"], `  ${err.response.data.message}`);
            disableLoading();
          });
      });
    }
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
            <SubmitButton submitValue={submitValue} handleSubmit={handleSubmit} isLoading={isLoading} />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default EditProfile;
