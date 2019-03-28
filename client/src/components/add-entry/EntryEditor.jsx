import React from 'react';
import ReactQuill from "react-quill";
const EntryEditor=({handleContentChange, content})=>{
   const modules = { toolbar: [
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
return(<>
            <div class="text-container">
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            modules={modules}
            formats={formats}
          />
        </div>

</>
  )
  
}
export default EntryEditor