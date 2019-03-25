import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Footer from "../commons/Footer";
import NavigationBar from "../commons/Navigation";
import Dropzone from "react-dropzone";
const dropZoneStyle= {
    width:200,
    height:200,
    marginLeft: 'auto',
    marginRight:'auto',
    borderWidth: 2,
    borderColor: '#666',
    borderStyle: 'dashed',
    borderRadius: 5
  }
  const thumbsContainer = {
      display: "flex",
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      margin: 'auto',
      marginTop: 16,
      width: '50%'
    };
    
    const thumb = {
      display: "inline-flex",
      borderRadius: 7,
      width: 195,
      height: 195,
      padding: 0,
      position: "absolute",
      top: 0
    };
    
    const thumbInner = {
      display: "column",
      minWidth: 195,
      overflow: "hidden"
    };
    
    const img = {
      display: "block",
      width: "100%",
      height: "100%"
    };
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value });
  }
  modules = {
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

  formats = [
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
  render() {
    const {files} = this.props.files;

    const thumbs = files.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
          />
        </div>
      </div>));
    return (
      <>
        <NavigationBar />
        <div class="entry-container">
          <div class="entry-title">
            <div class="entry-image ">
            <section>
            <div className="dropzone">
              <Dropzone accept="image/*"style={dropZoneStyle} onDrop={this.props.onDrop}>
                <h4>
                  Try dropping your profile picture here, or click to select the picture
                  you want to upload.
                </h4>
                <aside style={thumbsContainer}>{thumbs}</aside>
              </Dropzone>
            </div>
            <div className="text-center">
            </div>
          </section>
            </div>
            <input type="text" placeholder="Title" />
          </div>
          <div class="text-container">
            <ReactQuill
              value={this.state.text}
              onChange={this.handleChange}
              modules={this.modules}
              formats={this.formats}
            />
          </div>
          <div className="submit-entry_btn">
            <input type="submit" value="Submit" />
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
export default MyComponent;
