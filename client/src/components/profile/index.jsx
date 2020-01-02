import React, { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import NavigationBar from "../commons/Navigation";
import Footer from "../commons/Footer";
import { fetchProfileDetails } from "../../actions/userActions";
import { connect } from "react-redux";
const Profile = ({
  dispatch,
  userDetails,
  privateEntriesCount,
  publicEntriesCount,
  totalEntriesCount
}) => {
  const [isDisplaySideNav, setIsDisplaySideNav] = useState(false);
  const toggleSideBar = () => {
    setIsDisplaySideNav(!isDisplaySideNav);
  };
  const [isLoading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    fetchUserProfile();
  }, []);
  const fetchUserProfile = () => {
    dispatch(fetchProfileDetails())
      .then(() => {
        console.log("success");
        setIsloading(false);
      })
      .catch(error => {
        console.log("fail");
        setIsloading(false);
        setIsError(true);
      });
  };
  if (isLoading) {
    return <h1>Loading</h1>;
  } else if (isError) {
    return <h1>Error!</h1>;
  } else {
    return (
      <>
        <NavigationBar />
        <UserProfile
          toggleSideBar={toggleSideBar}
          isDisplaySideNav={isDisplaySideNav}
          fullname={userDetails.fullname}
          userImageUrl={userDetails.user_image_url}
          about={userDetails.about}
          privateCount={privateEntriesCount}
          publicCount={publicEntriesCount}
          totalCount={totalEntriesCount}
        />
        <Footer />
      </>
    );
  }
};
const mapStateToProps = state => {
  console.log(state);
  return {
    userDetails: state.users.userData[0],
    privateEntriesCount: state.users.privateEntriesCount,
    publicEntriesCount: state.users.publicEntriesCount,
    totalEntriesCount: state.users.totalEntriesCount
  };
};
export default connect(mapStateToProps)(Profile);
