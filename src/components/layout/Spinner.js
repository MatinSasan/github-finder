import React, {Fragment} from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <Fragment>
      <img  src={spinner} alt="loading..." style={loadingStyle} />
    </Fragment>
  )
}

const loadingStyle = {
   width: '280px', 
   margin: 'auto',
   display: 'block'
 }
 
export default Spinner
