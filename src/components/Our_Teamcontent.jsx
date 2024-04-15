import React from 'react';
import './Our_Teamcontent.css';

function Our_Teamcontent() {

    const ourteam=`
        - Frontend :
                 SANJEETH (22pw33)
        - Backend  :
                 Prem Dharshan (22pw29)
    `
    const content=`
        - SANJEETH : 
                Mail : sanjeeth653@gmail.com
        
        - Prem Dharshan : 
                Mail : whizz.dpd@gmail.com
    `

    return (
    <div className='container-texts1' >
        <h2>Project Developers</h2>
        <pre className='texts1'>{ourteam}</pre>
        <div className='texts1'>
           <h2>For Contact</h2> 
           <pre className='texts1'>{content}</pre>
      </div>
    </div>
    );
}
    
export default Our_Teamcontent;
    