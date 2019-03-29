import React from 'react'
const OptionButton =({isPrivate, setPrivate})=>{
    return (
        <>
        <h3>Set as Private</h3>
    <ul>
      <li>
        <label>
          <input
            type="radio"
            value= 'true'
            checked={isPrivate === 'true'}
            onChange={setPrivate}
          />
          True
        </label>
      </li>
      <li>
        <label>
          <input
            type="radio"
            value='false'
            checked={isPrivate==='false'}
            onChange={setPrivate}
          />
          False
        </label>
      </li>
      </ul>
        </>
    )
}
export default OptionButton