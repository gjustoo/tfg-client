import React from 'react';
import './styles/addButtonStyle.css';
function AddButton() {


    return (
        <div >

            <div className="addPage">
                <a href="/add" className="addButton_button">
                    <i className="fa fa-plus my-float"></i>
                </a>
            </div>
        </div>

    )
}


export default AddButton;