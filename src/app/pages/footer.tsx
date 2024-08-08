import React from 'react';

const Footers: React.FC = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <p style={textStyle}>© {new Date().getFullYear()} Xottle. All rights reserved.</p>
      </div>
    </footer>
  );
};

const footerStyle: React.CSSProperties = {
  backgroundColor: '#F5CC00',
  color: '#003566',
  padding: '1rem 0',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  textAlign: 'center',
};

const containerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 1rem',
};

const textStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '1rem',
};

export default Footers;