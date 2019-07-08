import React from 'react';

const DesignCanvas = ({height, width}) => {
    return (
        <div className="design">
            <div>
                <h2 className="center-text">Design Canvas</h2>
            </div>
            <div>
                <table id="pixelCanvas">
                    <thead></thead>
                    <tbody id="here">

                    </tbody>
                </table>
            </div>
            <div className="btn-area">
                <div>
                    <button id="save">Save</button>
                </div>
                <div>
                    <button id="delete">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DesignCanvas;