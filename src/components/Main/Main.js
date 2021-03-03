import React from 'react';

function Main({ children, blurState, mainClass }) {
  const blurStyles = {
    filter: `${blurState ? 'blur(10px)' : 'blur(0px)'}`
  }

  return (
    <main className={`main ${mainClass}`} style={blurStyles}>
      {children}
    </main>
  )
}

export default Main;
