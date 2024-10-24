import styles from "./Authors.module.css";
import { useEffect, useState } from "react";

export default function BookAuthor() {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/authors/getAllAuthors");
                if (!response.ok) throw new Error("Failed to fetch authors");
                const data = await response.json();
                setAuthors(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAuthors();
    }, []);

    if (authors.length === 0) {
        return <p>Loading...</p>;
    }
    
    return (
        <div>
            <h1>Authors</h1>
            <ul>
                {authors.map((author) => (
                    <li key={author.id}>{author.name}</li>
                ))}
            </ul>
        </div>
    );
}
