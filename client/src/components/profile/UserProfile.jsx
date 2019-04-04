import React, { useState } from 'react';
import NavigationBar from '../commons/Navigation'
import Footer from '../commons/Footer'
const UserProfile =({toggleSideBar, isDisplaySideNav,fullname,privateCount,publicCount,userImageUrl,about,totalCount})=>{
    return(
     <>
       <div class="profile-header"><span class="sidenav-icon" onClick={toggleSideBar}>&#9776; My Entries</span>
      <div id="profileSidenav" class={isDisplaySideNav?"show-sidenav":"hide-sidenav"}>
        <a href="javascript:void(0)" class="closebtn" onClick={toggleSideBar}>&times;</a>
        <a href="private.html"><i class="fas fa-lock"></i> Private</a>
        <a href="public.html"><i class="fas fa-lock-open"></i> Public</a>
        <a href="settings.html"><i class="fas fa-gear"></i> Settings</a>
      </div>
      <br /><br /><div class="profile-picture">
     <div class="profile-overlay"> </div><img class="profile-picture-img" src={userImageUrl} alt="" />
  </div>
  <div class="profile-info">
    <h2 class="about">{fullname}</h2>
    <p>{about}</p>
    <h3>Entries</h3>
    <table>
        <tr>
          <th>Private</th>
          <th>Public</th>
          <th>Total</th>
        </tr>
        <tr>
          <td>{privateCount}</td>
          <td>{publicCount}</td>
          <td>{totalCount}</td>
        </tr>
    </table>
      <button class="edit-profile__button">Edit Profile</button>
  </div>
</div>
</>
    )
}
export default UserProfile