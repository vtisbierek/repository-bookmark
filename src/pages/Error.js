import React from "react";
import {Message} from "../styles/stylesError";
import {FaHome} from "react-icons/fa";
import {Link} from "react-router-dom";

export default function Error(){
    return (
        <Message>
            <h1>This page does not exist.</h1>
            <Link to="/" >
                <FaHome color="#fff" size={50} />
            </Link>
        </Message>
    );
}