import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Define a functional component named Edit
export default function Edit(props) {

    // The useParams hook returns an object of key/value pairs of
    // the dynamic params from the current URL that were matched by
    // the <Route path>.
    let { id } = useParams();

    // Update state variables using the React useState()
    // and initialize them with empty strings
    const [title, setTitle] = useState("");
    const [cover, setCover] = useState("");
    const [author, setAuthor] = useState("");

    // useNavigate returns a function that we can use to navigate
    const navigate = useNavigate();

    // useEffect Hook is similar to componentDidMount
    useEffect(() => {
        // axios is a promised-based web client
        // make an HTTP Request with GET method and pass the book ID as part of the URL
        axios.get('http://localhost:4000/api/book/' + id)
            .then((response) => {
                // Assign Response data to the state variables using useState.
                setTitle(response.data.title);
                setCover(response.data.cover);
                setAuthor(response.data.author);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []); // The empty dependency array ensures that this effect runs once after the initial render

    // Define a function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Create a new book object with the updated information
        const newBook = {
            id: id,
            title: title,
            cover: cover,
            author: author
        };

        // Make an HTTP PUT request to update the book with the new information
        axios.put('http://localhost:4000/api/book/' + id, newBook)
            .then((res) => {
                console.log(res.data);
                // Navigate to the '/read' route after successful book edit
                navigate('/read');
            });
    }

    // Render the form for editing book information
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Edit Book Title: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Edit Release Year: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={cover}
                        onChange={(e) => setCover(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Edit Poster Url: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Edit Book" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}