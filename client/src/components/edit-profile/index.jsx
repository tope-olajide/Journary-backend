import React from 'react'
import NavigationBar from '../commons/Navigation'
import Footer from '../commons/Footer'
const EditProfile =()=>{
    return(<><NavigationBar />
<div className="profile-header">
        <div className="edit-profile-form">
                <form className="login-form">
                    <div className="edit-profile-header">
                        <h2>Edit Profile</h2>
                      </div>
                      <div class="entry-image ">
        <img src="images/Placeholder.jpg" alt={""} />
</div>
                    <input type="text" name="firstname" placeholder="First name"/><br />
                    <input type="text" name="lastname"placeholder="Last name"/>
                    <input type="text" name="lastname" placeholder="Username"/>
                    <input type="text" name="lastname" placeholder="Email"/>
                    <textarea className="text-area" placeholder="About me..." rows="4"></textarea>
                    <input type="submit" value="Submit"/>
                  </form>
              </div>
</div><Footer />
    </>)
}
export default EditProfile