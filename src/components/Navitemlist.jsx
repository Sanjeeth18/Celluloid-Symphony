import React from 'react'
import './Navitemlist.css'

function Navitemlist({nav}) {
  return (
        <li>
            <a href={nav.link}>{nav.name}</a>
        </li>
    )
}

export default Navitemlist