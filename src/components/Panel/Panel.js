import React from 'react';

const PanelHoc = (WrappedComponent) => (props) => (
    <div className="container-fluid"><WrappedComponent {...props}/></div>
);


export default PanelHoc
