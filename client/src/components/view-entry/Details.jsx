import React from 'react'
const viewEntry = ({title, content, date, entryImage}) => {
return (
    <>
    <div class="container">
    <h1>{title} </h1>
    <p class="time">Published {date}</p>
    <img src={entryImage} alt={entryImage}/>
{content}
</div>
</>
)
}
export default viewEntry