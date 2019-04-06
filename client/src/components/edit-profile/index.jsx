import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import NavigationBar from "../commons/Navigation";
import Footer from "../commons/Footer";
import SubmitButton from "../add-entry/SubmitButton";
import toastNotification from "./../../utils/toastNotification";
import ProfileForm from "./ProfileForm";
import ProfileImageUpload from "./ProfilePictureUpload";
import { fetchProfileDetails, updateProfile } from "../../actions/userActions";
import { connect } from "react-redux";
import axios from "axios";
const EditProfile = ({ dispatch, userDetails }) => {
  const [files, setFiles] = useState([]);
  const [submitValue, setSubmitValue] = useState("Submit");
  const [entryImageUrl, setEntryImageUrl] = useState("");
  const [updateDetails, setUpdateDetails] = useState({
    fullname: "",
    email: "",
    about: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
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
  useEffect(() => {
    fetchUserProfile();
  }, []);
  const saveToState = (key, value) => {
    setUpdateDetails({ ...updateDetails, [key]: value });
    console.log(updateDetails);
  };

  const fetchUserProfile = () => {
    dispatch(fetchProfileDetails())
      .then(() => {
        console.log("success");
        setIsLoading(false);
      })
      .catch(error => {
        console.log("fail");
        setIsLoading(false);
        setIsError(true);
      });
  };
  const handleSubmit = () => {
    const file = files[files.length - 1];
    if (!file) {
      enableLoading();
      dispatch(updateProfile(updateDetails))
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
      })
        .then(response => {
          console.log(response);
          const { data } = response;
          console.log(data);
          const { secure_url, public_id } = data;
          const upoadedImage = [];
          upoadedImage.push({ imageUrl: secure_url, imageId: public_id });
          const imgUrlToString = JSON.stringify(upoadedImage);
          setEntryImageUrl(imgUrlToString);
          toastNotification(["info"], `${file} uploaded successfully!`);
          dispatch(updateProfile(updateDetails))
            .then(() => {
              toastNotification(["success"], `saved to database successfully`);
              disableLoading();
            })
            .catch(function(err) {
              toastNotification(["error"], `  ${err.response.data.message}`);
              disableLoading();
            });
        })
        .catch(function(err) {
          toastNotification(["error"], `  ${err.response.data.message}`);
          disableLoading();
        });
    }
  };
  if (isLoading) {
    return <h1>Loading</h1>;
  } else if (isError) {
    return <h1>Error!</h1>;
  } else {
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
              <ProfileForm saveToState={saveToState} fullname={userDetails.fullname} email={userDetails.email} about={userDetails.about} />
              <SubmitButton
                submitValue={submitValue}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </form>
          </div>
        </div>
        <Footer />
      </>
    );
  }
};

const mapStateToProps = state => {
  console.log(state.users.userData[0])
  return {
    userDetails: state.users.userData[0]
  };
};
export default connect(mapStateToProps)(EditProfile);