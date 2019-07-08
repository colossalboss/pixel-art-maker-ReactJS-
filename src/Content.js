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
        let saveBtn = document.getElementById('save');
        let deleteBtn = document.getElementById('delete');
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
        saveBtn.style.display = 'block';
        deleteBtn.style.display = 'block';
    }

    save = (name) => {
        let tableCanvas = document.getElementById('pixelCanvas');
        let numOfRows = tableCanvas.rows.length;
        let numOfCols = tableCanvas.rows[0].cells.length;

        let pixelArt = {name: '', data: {}};

        // create Array to hold data
        const myData = (numOfRows, numOfCols) => {
            for(let i = 0; i < numOfRows; i++) {
                pixelArt.data[i] = Array(numOfCols);
            }
            return true;
        }
        myData(Number(numOfRows), Number(numOfCols));

        // get file name from promt
        let fileName = prompt('File Name');

        // If file is empty don't save else save
        if (!fileName) {
            alert('Cancelled');
            return false;
        }
        pixelArt.name = fileName;

        // get background-color of designed grid and store in an object
        for (let x = 0; x < numOfRows; x++) {
            for (let y = 0; y < numOfCols; y++) {
                pixelArt.data[x][y] = tableCanvas.rows[x].cells[y].style.backgroundColor;
            }
        }

        
        // save to localStorage
        // Gallery does not exist in localStorage
        if (localStorage.getItem('Gallery') === null) {
            let Gallery = [];
            Gallery.push(pixelArt);
            
            localStorage.setItem('Gallery', JSON.stringify(Gallery));
        } else {
            // Gallery exist in localStorage
            let Gallery = JSON.parse(localStorage.getItem('Gallery'));
            Gallery.push(pixelArt);
            localStorage.setItem('Gallery', JSON.stringify(Gallery));
        }

        this.list(name);
    }
    
    addToList = (name, file) => {
        let displayArt = this.displayFile;
        // select list
        let l = document.getElementById('fileList');

        // create list list item
        let newFile = document.createElement('li');

        // use value from prompt as file name
        newFile.innerHTML = file.name;

        // add eventListener to file
        newFile.addEventListener('click', function(e) {
            let name = e.target.innerHTML;
            displayArt(name, file.data);
        });
        l.appendChild(newFile);
    }

    list = (name) => {
        let makeList = this.addToList
        //get Gallery from localStorage
        let Gallery = JSON.parse(localStorage.getItem('Gallery'));

        // field to display list
        let l = document.getElementById('fileList');
        l.innerHTML = '';
        console.log(Gallery);
        

        //pass each file addToList()
        Gallery.forEach(function(file) {
		    makeList(name, file);
	    });

    }

    displayFile = (name, file) => {
        let deleteFile = this.deleteFile;
        let table = document.getElementById('here');
        // get size of file to be displayed
        let width = file[0].length;
        let size = Object.keys(file);
        let height = size.length;
        
        table.innerHTML = '';

        for (let i = 0 ; i < height; i++) {
            let tr = document.createElement('tr');
            tr.classList.add('row')
            tr.setAttribute('id', i);
            table.appendChild(tr);
            let rows = document.querySelector('tr:last-child');
            for (let j = 0; j < width; j++) {
                let td = document.createElement('td');
                // td.classList.add('cell')
                rows.appendChild(td);
            }
        }

        // add the background colors
        for (let m = 0; m <= height - 1; m++) {
            for (let n = 0; n <= width - 2; n++) {
                    table.rows[m].cells[n].style.backgroundColor = file[m][n];
            }
        }

        // Remove save button
        let saveBtn = document.getElementById('save');
        saveBtn.style.display = 'none';

        // Get delete button
        let deleteBtn = document.getElementById('delete');

        let fileName = name;

        // add eventListener to delete button and call delete function
        deleteBtn.addEventListener('click', function() {
            deleteFile(name, file, fileName);
        });
        deleteBtn.style.display = 'inline';
    }

    deleteFile = (name, file, fileName) => {        
        let table = document.getElementById('here');
        let deleteBtn = document.getElementById('delete');
        let fileList = document.getElementById('fileList');
        // get Gallery from localStorage
        let Gallery = JSON.parse(localStorage.getItem('Gallery'));
    
        // reduce Gallery to an array of just file names 
        let existingFiles = Gallery.map((f) => f.name);
        
        
        // get index of file name
        let idx = existingFiles.indexOf(fileName);
        
    
        // remove file using index
        if (idx >= 0) {
            Gallery.splice(idx, 1);
        }
    
        // resetting to localStorage
        localStorage.setItem('Gallery', JSON.stringify(Gallery));

        
        fileList.innerHTML = '';
        // call list() again to refresh list on page
        this.list(name);
    
        // clear grid and delete button
        table.innerHTML = '';
        deleteBtn.style.display = 'none';
    }

    componentDidUpdate = () => {
        let targetArea = document.getElementById('here');
        let saveBtn = document.getElementById('save');
        targetArea.addEventListener('click', this.draw);
        saveBtn.addEventListener('click', this.save);
    }

    componentDidMount = () => {
        let form = document.getElementById('size-picker');

        form.addEventListener('submit', this.drawGrid);
        this.list();
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