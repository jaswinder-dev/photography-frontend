/** will be shown upon content loading ******************************************/

import React from 'react';

const Loader = () => {
    return (
        <div className="loader d-flex justify-content-center align-items-center">
            <div className="spinner-border spinner-border-lg text-primary"></div>
        </div>
    );
}

export default Loader;