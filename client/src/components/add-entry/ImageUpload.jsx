import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    margin: "auto",
    marginTop: 130,
    width: "50%"
  };
  
  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 280,
    height: 160,
    padding: 4,
    boxSizing: "border-box",
    position: "absolute",
    top: 0,
    left: "16%"
  };
  const drop = {
    borderWidth: 2,
    borderColor: "#eaeaea",
    borderStyle: "dashed",
    borderRadius: 0
  };
  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden"
  };
  
  const img = {
    display: "block",
    width: "100%",
    height: "100%"
  };
const imageUpload=({files, setFiles})=>{
   
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: acceptedFiles => {
          setFiles(
            acceptedFiles.map(file =>
              Object.assign(file, {
                preview: URL.createObjectURL(file)
              })
            )
          );
        }
      });
      const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
          <div style={thumbInner}>
            <img src={file.preview} style={img} alt={""} />
          </div>
        </div>
      ));
      useEffect(
        () => () => {
          // Make sure to revoke the data uris to avoid memory leaks
          files.forEach(file => URL.revokeObjectURL(file.preview));
        },
        [files]
      );
      return(<>
     <section>
              <aside style={thumbsContainer}>
        {thumbs}
      </aside>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p style={drop}>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
         
      </>)
}
export default imageUpload