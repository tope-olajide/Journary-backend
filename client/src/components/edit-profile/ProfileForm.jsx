import React from "react";
const ProfileForm = ({
  saveToState,
  fullname,
  email,
  about,
}) => {
    return (
<>
          <input
            type="text"
            name="fullname"
            placeholder="Fullname"
            defaultValue={fullname}
            onChange={event => {
              saveToState("fullname", event.target.value);
            }}
          />
          <br />
          <input
            type="text"
            placeholder="Email"
            defaultValue={email}
            onChange={event => {
              saveToState("email", event.target.value);
            }}
          />
            <textarea
              className="text-area"
              placeholder="About me..."
              rows="4"
              defaultValue={about}
              onChange={event => {
                saveToState("about", event.target.value);
              }}
            />
</>
    );
 
};
export default ProfileForm;
