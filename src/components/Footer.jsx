import React from 'react'
import {useNavigate} from 'react-router-dom'
import './Footer.css'

function Footer() {
    const navigate=useNavigate();

  return (
    <footer>
        <div className='title'> 
            <a href='/'>Celluloid Symphony</a>
        </div>
        <div className='container'>
            <div className='icons'>
                <a href="https://www.instagram.com/_.sanjeeth._7255/"><i className='fa-brands fa-instagram'></i></a>
                <a href='https://github.com/Sanjeeth18'><i className='fa-brands fa-github'></i></a>
            </div>
            <div className="nav">
                <ul>
                    <li>
                        <a href='/'> Home</a>
                    </li>
                    <li>
                        <a onClick={()=>navigate('/about')}>About</a>
                    </li>

                </ul>
            </div>
            <div className="bottom">
                <p>Copyright &copy;2024</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer