import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import Navbar from '../components/Navbar';

const Example = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Assuming you have your HTML file named "myHtmlFile.html" in the public folder.
    fetch('../../bootstrap/docs/components.html')
      .then((response) => response.text())
      .then((data) => setHtmlContent(data))
      .catch((error) => console.error('Error fetching HTML file:', error));
  }, []);

  return( 
  <div>
    <h1>bleh</h1>
    <h1>bleh2</h1>
    <button>
            <Link to="/">Home</Link>
    </button>
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    <Navbar/>

  </div>
  );
  
};

export default Example;
