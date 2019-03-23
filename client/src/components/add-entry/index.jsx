import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Footer from '../commons/Footer';
import NavigationBar from '../commons/Navigation'
import Dropzone from "react-dropzone";

class MyComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = { text:  "" } // You can also pass a Quill Delta here
      this.handleChange = this.handleChange.bind(this)
    }
  
    handleChange(value) {
      this.setState({ text: value })
    }
    modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      };
    
      formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ];
    render() {
      return ( 
          <><NavigationBar />
         <div class="entry-container">
         

        <div class='entry-title'><div class="entry-image ">
        <img src="images/Placeholder.jpg" alt={""} />
</div>
        <input type="text" placeholder="Title" />
        </div>
        <div class="text-container">
        
        <ReactQuill value={this.state.text}
                    onChange={this.handleChange}
                    modules={this.modules}
                    formats={this.formats}
                    />
                    </div>
                    <div className="submit-entry_btn"><input type="submit" value="Submit" /></div>
                    </div>
                    <Footer />
         </>
      )
     
    }
  }
  export default MyComponent