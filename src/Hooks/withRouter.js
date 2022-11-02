import React from 'react';
import { useParams } from 'react-router-dom';
 
/**
 * ALLOWS US TO USE URL PARAMS IN CLASS COMPONENTS
 * @param {*} WrappedComponent 
 * @returns wrapper component with props and params
 */
const withRouter = WrappedComponent => props => {
  const params = useParams();
 
  return (
    <WrappedComponent
      {...props}
      params={params}
    />
  );
};
 
export default withRouter;