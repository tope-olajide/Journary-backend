import React, { useState } from "react";
const Entry = ()=>{
    return (
    <>
        <div class="tile">
            <img src="./images/diary2.jpg" alt=""/>
            <div class="tile-overlay">
                <h1>Sed do eiusmod tempor incididunt ut Lorem ipsum dolor sit amet Lorem ipsum. </h1>
                <div class="author_view">
                    <div>
                        <p class="author">Jane Doe</p>
                    </div>
                    <div class="view-icon"> <i class="fas fa-eye"> 30</i></div>
                </div>
            </div>
        </div>
    </>
        )
}
export default Entry