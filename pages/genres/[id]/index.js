import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import Booklist from "@/components/books/Booklist";

export default function BooksinGenre() {
    const [booksInGenre, setBooksInGenre] = useState([]);
    const [genreName, setGenreName] = useState("");
    const router = useRouter();
    const genreId = router.query.id;

    useEffect(() => {
        const fetchgenreandbooks = async () => {
            try {
                const genreRes = await fetch(`http://localhost:3000/api/genres`);
                const genres = await genreRes.json();
                const genre = genres.find(genre => genre.id === genreId);
                setGenreName(genre.name);

                const booksRes = await fetch(`http://localhost:3000/api/genres/${genreId}/books`);
                const books = await booksRes.json();
                setBooksInGenre(books);

            } catch (error) {
                console.error(error);
            }
        }

        if (genreId) {
            fetchgenreandbooks();
        }

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