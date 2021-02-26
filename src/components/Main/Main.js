import React from 'react';
import cn from 'classnames';

function Main({ children, blurState, loggedIn }) {
  const blurStyles = {
    filter: `${blurState ? 'blur(10px)' : 'blur(0px)'}`
  }
  const mainClass = cn('main', {'main_type_flights': loggedIn });

  return (
    <main className={mainClass} style={blurStyles}>
      {children}
    </main>
  )
}

export default Main;
