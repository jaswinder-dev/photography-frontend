/** will be used for showing content loading for any query. ******************************************/

import React from 'react';

const Spinner = () => {
    return (
        <div className="spinner w-100 py-5 d-flex justify-content-center align-items-center">
            <div className="spinner-border spinner-border-lg text-primary"></div>
        </div>
    );
}

export default Spinner;