import React from 'react';

const SideBar = ({onChange}) => {
    return (
        <div className="side">
            <div className="header">
                <h1>Lab: Pixel Art Maker</h1>
                <h2>Choose Grid Size</h2>
            </div>
            <div>
                <form>
                    <div className="size-selector">
                        <div className="input-field">
                            Height:
                            <input onChange={onChange} id="height" name="height" type="number" value=""/>
                        </div>
                        <div className="input-field">
                            Width:
                            <input onChange={onChange} id="width" name="width" type="number" value=""/>
                        </div>
                    </div>
                    <div className="center-text">
                        <input type="submit" id="submit" />
                    </div>
                </form>
                <div className="center-text">
                    <h2>Pick A Color</h2>
                <input type="color" name="color" onChange={onChange} />
                    </div>
                <div className="bottom">
                    <div className="gallery">
                        <h2>Saved Files</h2>
                    </div>
                    <div className="list">
                        <ul>
                            <li>Item</li>
                            <li>Item</li>
                            <li>Item</li>
                            <li>Item</li>
                            <li>Item</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;