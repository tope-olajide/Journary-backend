import React, { useState } from "react";
import Image from 'react-graceful-image'
const Entry = ({imageUrl, title,username,viewCount}) => {
  return (
    <>
      <div class="tile">
        <Image src={imageUrl} alt={imageUrl} />
        <div class="tile-overlay">
          <h1>
            {title}
          </h1>
          <div class="author_view">
            <div>
              <p class="author">{username}</p>
            </div>
            <div class="view-icon">
              {" "}
              <i class="fas fa-eye"> {viewCount}</i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Entry;
