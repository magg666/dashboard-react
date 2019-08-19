import React from 'react';

/**
 * ComponentHOC - panel to wrap all widget
 * @param WrappedComponent
 * @returns {function(*): *}
 * @constructor
 */
const PanelHoc = (WrappedComponent) => (props) => (
    <div className="container-fluid"><WrappedComponent {...props}/></div>
);

export default PanelHoc
