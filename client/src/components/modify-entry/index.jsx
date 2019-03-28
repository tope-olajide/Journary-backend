import React, {useState} from 'react';
import Footer from "../commons/Footer";
import NavigationBar from "../commons/Navigation";
import toastNotification from "./../../utils/toastNotification";
import ImageUpload from "../add-entry/ImageUpload";
import EntryEditor from "../add-entry/EntryEditor";
import TitleTextBox from "../add-entry/TitleTextBox";
import SubmitButton from "../add-entry/SubmitButton";
import OptionButton from "./OptionButton"
import { modifyUserEntry } from "../../actions/entryActions";
import axios from "axios";
const ModifyUserEntry =(props)=> {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [entryImageUrl, setEntryImageUrl] = useState("");
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [submitValue, setSubmitValue] = useState("Submit");
    const [isPrivate, setIsPrivate] = useState('true')
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
            .modifyUserEntry({ isPrivate, title, content })
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
              .modifyUserEntry({ isPrivate, entryImageUrl, title, content })
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
    const setPrivate = event => {
        setIsPrivate(event.target.value);
      };
return (
    <>
      
      <NavigationBar />
      <div class="entry-container">
        <div class="entry-title">
          <ImageUpload files={files} setFiles={setFiles} />
          <TitleTextBox saveTitleToState={saveTitleToState} />
        </div>
        <OptionButton isPrivate ={isPrivate} setPrivate={setPrivate}/>
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
)
}
export default ModifyUserEntry