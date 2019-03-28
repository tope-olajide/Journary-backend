import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Footer from "../commons/Footer";
import NavigationBar from "../commons/Navigation";
import toastNotification from "./../../utils/toastNotification";
import { addEntry } from "../../actions/entryActions";
import { connect } from "react-redux";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import EntryEditor from "./EntryEditor";
import TitleTextBox from "./TitleTextBox";
import SubmitButton from "./SubmitButton";
const AddEntry = props => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [entryImageUrl, setEntryImageUrl] = useState("");
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitValue, setSubmitValue] = useState("Submit");
  const enableLoading = () => {
    setSubmitValue(
      <b>
        <i class="fas fa-spinner fa-lg fa-spin" />
      </b>
    );
    setIsLoading(true);
    toastNotification(["info"], `loading...`)
  };
  const disableLoading = () => {
    setSubmitValue("Submit");
    setIsLoading(false);
  };
  const saveTitleToState = value => {
    setTitle(value);
    console.log(title);
  };
  const handleSubmit = () => {
    const file = files[files.length - 1];
    if (!file) {
      enableLoading();
      props
        .addEntry({ title, content })
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
          .addEntry({ entryImageUrl, title, content })
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

  const handleContentChange = value => {
    setContent(value);
    console.log(content);
  };
  return (
    <>
      <NavigationBar />
      <div class="entry-container">
        <div class="entry-title">
          <ImageUpload files={files} setFiles={setFiles} />
          <TitleTextBox saveTitleToState={saveTitleToState} />
        </div>
        <EntryEditor
          handleContentChange={handleContentChange}
          content={content}
        />
        <SubmitButton
          handleSubmit={handleSubmit}
          submitValue={submitValue}
          isLoading={isLoading}
        />
      </div>
      <Footer />
    </>
  );
};
export default connect(
  null,
  { addEntry }
)(AddEntry);
