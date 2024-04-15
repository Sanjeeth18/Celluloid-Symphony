import React from 'react';
import './Aboutcontent.css';

function Aboutcontent() {
  const content = `
# CELLULOID SYMPHONY

            _Celluloid Symphony is a web application that delivers a comprehensive 
      movie information experience,enriched by the insightful reviews of two passionate 
      cinephiles – the creators themselves`
    const overview=`
    In this Project , for Frontend reactjs language is used.
        - For sliders Swipers were used.
        - Cards were used for display the searched movies.
        - Icons were imported from the Font Awesome cdn libraries.
        - Fonts were imported from Google fonts.
    `

  return (
    <div className='container-texts'>
        <h2 className='header-font'>Project Overview</h2>
      <pre className='texts'>{overview}</pre>
      <div className='texts'>
           <h2 className='header-font'>Overview for Frontend</h2> 
           <pre className='texts'>{content}</pre>
      </div>
    </div>
  );
}

export default Aboutcontent;
