import React from 'react';
import SideBar from './SideBar';
import DesignCanvas from './DesignCanvas';

class Content extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            height:'',
            width: '',
            color: ''
        }
    }

    inputValues = (e) => {
        if (e.target.name === 'height') {
            this.setState({
                height: e.target.value,
            });
        } else if (e.target.name === 'width') {
            this.setState({
                width: e.target.value,
            });
        } else {
            this.setState({
                color: e.target.value,
            });
        }
    }

    render() {
        let {height, width, color} = this.state;
        console.log(color);
        return (
            <div className="content">
                <SideBar onChange={this.inputValues}/>
                <DesignCanvas />
            </div>
        )
    }
}

export default Content;