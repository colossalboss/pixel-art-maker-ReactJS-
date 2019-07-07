import React from 'react';
import SideBar from './SideBar';
import DesignCanvas from './DesignCanvas';

class Content extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            height: null,
            width: null,
            color: 'black'
        }
    }

    inputValues = (e) => {
        let {height, width, color} = this.state;
        if (e.target.name === 'height') {
            this.setState({
                height: e.target.value,
                width: this.state.width,
                color: this.state.color,
            });
        } else if (e.target.name === 'width') {
            this.setState({
                height: this.state.height,
                width: e.target.value,
                color: this.state.color
            });
        } else {
            this.setState({
                height: this.state.height,
                width: this.state.width,
                color: e.target.value,
            });
        }
    }
    
    createGrid = (e) => {
        e.preventDefault();
        let {height, width, color} = this.state;
        let table = document.getElementById('here');
        // let form = document.getElementById('size-picker');
        table.innerHTML = '';
        
        // this.draw()
    }

    draw = (e) => {
        let {color} = this.state;

            let elem = e.target;
            if (elem.classList.contains('cell')) {
                if (!elem.hasAttribute('style')) {
                    elem.setAttribute('style', 'background-color:' + color + '');
                } else {
                    elem.removeAttribute('style');
                }
            }
    }

    drawGrid = (e) => {
        let {height, width} = this.state;
        let table = document.getElementById('here');
        table.innerHTML = '';

        e.preventDefault();
        for (let i = 0 ; i < height; i++) {
            let tr = document.createElement('tr');
            tr.classList.add('row')
            table.appendChild(tr);
            let rows = document.querySelector('tr:last-child');
            for (let j = 0; j < width; j++) {
                let td = document.createElement('td');
                td.classList.add('cell')
                
                
                rows.appendChild(td);
            }
        }
    }

    componentDidUpdate = () => {
        let targetArea = document.getElementById('here');
        targetArea.addEventListener('click', this.draw);
    }

    componentDidMount = () => {
        let form = document.getElementById('size-picker');

        form.addEventListener('submit', this.drawGrid);
    }

    render() {
        let {height, width, color} = this.state;
        console.log(color);
        return (
            <div className="content">
                <SideBar
                onBlur={this.inputValues}
                onClick={this.createGrid} />
                <DesignCanvas 
                height={height}
                width={width} />
            </div>
        )
    }
}

export default Content;