import React from 'react';
import './Aboutcontent.css';

function Aboutcontent() {
  const content = `
# CELLULOID SYMPHONY

_Celluloid Symphony is a Django web application that delivers a comprehensive movie information experience,enriched by the 
insightful reviews of two passionate cinephiles – the creators themselves

## Getting Started

### Prerequisites

- Python 3.12
- pip
- Your sanity (Optional)

### Setup

1. Clone this repository:

   \`\`\`bash
   git clone https://github.com/Prem-Dharshan/celluloid-symphony.git
   \`\`\`

   Follow the below steps or skip to the [Run using Docker](#docker-setup)

2. Create a .env file in the root directory of the project and add the following content

   \`\`\`dotenv
   export APIKEY
   export ACCESSTOKENAUTH
   \`\`\`

3. Run the project starter script:

   \`\`\`bash
   bash backend_setup.sh
   \`\`\`

   This script does the following:

   - Creates a virtual environment named \`venv\`.
   - Activates the virtual environment.
   - Installs dependencies listed in \`requirements.txt\`.
   - Changes directory to \`CSbackend\`.
   - Sources the \`.env\` file.

4. After running the script, you'll be in the virtual environment with all dependencies 

installed and environment variables set up.

## Running the Server

To start the Django development server, run the following command:

\`\`\`bash
python manage.py runserver
\`\`\`

or

Run the server starter script:

\`\`\`bash
bash start_server.sh
\`\`\`

This script does the following:

- Sources the necessary environment variables.
- The system check framework is used to inspect the entire Django project for common problem and all apps will be checked.
- If no issues, the development server is started.

You can now access the Django project at \`http://localhost:8001/\`.

## Run using Docker

1. Your current directory should be the root dir i.e celluloid-symphony

2. Run the following command
   \`\`\`bash
   chmod +x CSbackend/entrypoint.sh
   \`\`\`
3. Start your docker engine & Run the following command to build and up the container
   \`\`\`bash
   docker-compose up --build
   \`\`\`
4. The development server will be successfully setup and started

   You can now access the Django project at \`http://localhost:8001/\` or \`http://127.0.0.1:8001/\`
`;

    const overview=`
    In this Project for Frontend,reactjs language is used.
        - For sliders Swipers were used.
        - Cards were used for display the searched movies.
        - Icons were imported from the Font Awesome cdn libraries.
        - Fonts were imported from Google fonts.
    `

  return (
    <div className='container-texts'>
        <h2>Overview for Backend</h2>
      <pre className='texts'>{overview}</pre>
      <div className='texts'>
           <h2>Overview for Frontend</h2> 
           <pre className='texts'>{content}</pre>
      </div>
    </div>
  );
}

export default Aboutcontent;
