import React, {useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Footer from "../commons/Footer";
import NavigationBar from "../commons/Navigation";
import {useDropzone} from 'react-dropzone';
import toastNotification from "./../../utils/toastNotification";
import { addEntry } from "../../actions/entryActions";
import { connect } from 'react-redux';
import axios from "axios";
  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    margin: 'auto',
    marginTop: 130,
    width: '50%'
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 280,
    height: 160,
    padding: 4,
    boxSizing: 'border-box',
    position: "absolute",
    top:0,
    left:'16%'
  };
const drop= {
  borderWidth: 2,
  borderColor: '#eaeaea',
  borderStyle: 'dashed',
  borderRadius: 0
}  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'block',
    width: '100%',
    height: '100%'
  };
const AddEntry = (props) => {

  const [files, setFiles] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [entryImageUrl, setEntryImageUrl] = useState("");
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);
  const saveToState = (value) => {
    setTitle( value );
    console.log(title);
  };
const handleSubmit =()=>{
 const file = files[files.length-1]
 if (!file){
  props.addEntry({title,content}).then(()=>{
    toastNotification(["success"], `saved to database successfully`);
  }).catch(function(err) {
    toastNotification(["error"], `  ${err.response.data.message}`);
    
  })
 }
 const formData = new FormData();
 formData.append("upload_preset", "sijxpjkn");
 formData.append("api_key", "139423638121511");
 formData.append("file", file);
 formData.append("timestamp", (Date.now() / 1000) | 0);
 
 
 // Make an AJAX upload request using Axios
  axios({
   method:'post',
   url: "https://api.cloudinary.com/v1_1/temitope/image/upload",
   data:formData,
   headers: {'X-Requested-With': 'XMLHttpRequest'},
   transformRequest: [(data, headers) => {
     delete headers.common.authorization
     return data
 }]
 }).then(response => {
  console.log(response)
  const { data } = response;
  console.log(data);
  const { secure_url, public_id } = data;
  const upoadedImage =[];
  upoadedImage.push({imageUrl: secure_url, imageId: public_id})
  const imgUrlToString = JSON.stringify(upoadedImage)
  setEntryImageUrl(imgUrlToString)
  alert(["info"], `${file} uploaded successfully!`);
})
}

  const handleContentChange = value => {
    setContent(value);
  };
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image"],
      ["clean"]
    ]
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image"
  ];

  return (
    <>
      <NavigationBar />
      <div class="entry-container">

        <div class="entry-title">
      <section>
              <aside style={thumbsContainer}>
        {thumbs}
      </aside>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p style={drop}>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
    <input type="text" placeholder="Title" onChange={event => {
              saveToState(event.target.value);
            }} />
        </div>
        <div class="text-container">
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            modules={modules}
            formats={formats}
          />
        </div>
        <div className="submit-entry_btn">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default connect(null, {addEntry})(AddEntry);
