import { useRouter } from "next/router";
import data from "../../../data/Data.json";
import Booklist from "@/components/books/Booklist";
import { useEffect, useState } from "react";

export default function FilteredBooksPage() {
    const router = useRouter();
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const filterData = router.query.slug;

    useEffect(() => {
        if (!filterData) {
            console.log("No filterData available yet.");
            return;
        }

        console.log("filterData:", filterData);

        let genre = filterData[1];
        console.log("Initial genre from filterData:", genre);

        if (genre === "fiction") {
            genre = "1";
        } else if (genre === "dystopian") {
            genre = "2";
        } else if (genre === "romance") {
            genre = "3";
        } else if (genre === "adventure") {
            genre = "4";
        }

        console.log("Converted genre ID:", genre);
        // Filter books by genre ID
        const getBookByGenre = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/genres/${genre}/books`);
                const books = await res.json();
                setFilteredBooks(books);
            } catch (error) {
                console.error(error);
            }
        };

        getBookByGenre();
        setIsLoading(false);
    }, [filterData]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Books in Genre: {filterData ? filterData[1] : "Unknown"}</h1>
            {filteredBooks.length > 0 ? (
                <Booklist books={filteredBooks} />
            ) : (
                <p>No books found for this genre.</p>
            )}
        </div>
    );
}
