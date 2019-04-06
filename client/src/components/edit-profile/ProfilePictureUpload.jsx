import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const thumb = {
    display: "flex",
    marginLeft: "58px",
    width: 280,
    height: 170,
    boxSizing: "border-box",
    position: "absolute",
    borderWidth: 2,
    borderColor: "blueviolet",
    borderStyle: "dashed",
  };
  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  
  };
  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden"
  };
  
  const img = {
    display: "block",
    width: "auto",
    height: "100%"
  };
  const instruction = {
    display: "flex",
    borderWidth: 2,
    borderColor: "blueviolet",
    borderStyle: "dashed",
    marginLeft: "58px",
    width: 280,
    height: 170,
    boxSizing: "border-box",
    position: "absolute",
    color:'blueviolet',
    
  };
  const section ={
      marginBottom: '190px'
  }
const ProfileImageUpload=({files, setFiles})=>{
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
            <section style={section}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div style={instruction}><h4>Drag 'n' drop your profile piture here, or click to select</h4></div><aside style={thumbsContainer}>{thumbs}</aside>
              </div>
            </section>
         
      </>)
}
export default ProfileImageUpload