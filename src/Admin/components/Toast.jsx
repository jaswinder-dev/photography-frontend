/**will be used for showing alert messages via pop up *************************************** */

import React from 'react';

const Toast = (prop) => {
    return (
        <div className={`p-3 rounded ${prop.cls} text-center mb-3 mt-3`}>
            <p className="text-light m-0 p-0">{prop.message}</p>
        </div>
    );
}

export default Toast;