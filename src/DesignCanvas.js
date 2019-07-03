import React from 'react';

const DesignCanvas = ({height, width}) => {
    return (
        <div className="design">
            <div>
                <h2 className="center-text">Design Canvas</h2>
            </div>
            <div>
                <table>
                    <tbody id="here">

                    </tbody>
                </table>
            </div>
            <div className="btn-area">
                <div>
                    <button>Save</button>
                </div>
                <div>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DesignCanvas;