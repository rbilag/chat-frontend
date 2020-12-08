import { Avatar } from '@material-ui/core';
import React from 'react';
import './style.css';

const SidebarMember = () => {
    return (
        <div className="sidebarMember">
            <Avatar src="https://i.pravatar.cc/300" />
            <div className="sidebarMember__details">
                <h2>Member Name</h2>
                <p>Member details</p>
            </div>
        </div>
    );
};

export default SidebarMember;
