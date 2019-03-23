import React, { useState } from "react";
import NavigationBar from '../commons/Navigation'
import Footer from '../commons/Footer'
import Entry from './entry'
const Dairies = ()=>{
    return (
    <>
    <NavigationBar />
       <div class="entries-container">
       <Entry />
    </div>
    <Footer />
    </>
    )
}
export default Dairies