import { useRouter } from "next/router"
import data from "../../../data/Data.json"
import { useEffect, useState } from "react";
import Booklist from "@/components/books/Booklist";

export default function BooksinGenre() {
    const [booksInGenre, setBooksInGenre] = useState([]);
    const [genreName, setGenreName] = useState("");
    const router = useRouter();
    const genreId = router.query.id;

    useEffect(() => {
        const genre = data.genres.find(genre => genre.id.toString() === genreId);
            
            
        if (genre) {
            setGenreName(genre.name);
        }

        const books = data.books.filter(book => book.genreId === genreId);
        setBooksInGenre(books);
    }, [genreId]);

    if(!genreId){
        return <h1>Loading...</h1>
    }


    return (
        <div>
            <h1>Books in Genre: {genreName}</h1>
            {booksInGenre.length > 0 ? (
                <Booklist books={booksInGenre}/>
            ) : (
                <p>No books found for this genre.</p>
            )}
        </div>
    )
}