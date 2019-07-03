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

    createGrid = (e) => {
        e.preventDefault();
        let {height, width, color} = this.state;
        let table = document.getElementById('here');
        
        for (let i = 1; i < height; i++) {
            let tr = document.createElement('tr');
            tr.classList.add('row')
            let td = document.createElement('td');
            table.appendChild(tr);
            for (let j = 1; j < width; j++) {
                // document.getElementsByClassName('row').appendChild(td);
                let rows = document.getElementsByClassName('row');
                [].forEach.call(rows, (row) => {
                    row.appendChild(td);
                })
            }
        }
    }

    render() {
        let {height, width, color} = this.state;
        console.log(color);
        return (
            <div className="content">
                <SideBar
                onChange={this.inputValues}
                onClick={this.createGrid} />
                <DesignCanvas 
                height={height}
                width={width} />
            </div>
        )
    }
}

export default Content;