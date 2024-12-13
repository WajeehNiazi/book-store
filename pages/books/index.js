import Booklist from "@/components/books/Booklist";
import Booksearch from "@/components/books/Booksearch";
import { useState, useContext } from "react";
import AuthContext from "@/store/auth-context";

export default function Allbooks(props) {
    const [filteredBooks, setFilteredBooks] = useState(props.books); // State for filtered books
    const [searchTerm, setSearchTerm] = useState(""); // State for search term
    const authCtx = useContext(AuthContext);

    const filterBooks = (searchValue) => {
        const lowerCaseSearch = searchValue.toLowerCase();
        const newFilteredBooks = props.books.filter((book) =>
            book.title.toLowerCase().includes(lowerCaseSearch)
        );
        setFilteredBooks(newFilteredBooks);
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        filterBooks(value);
    };

    return (
        <>
            <h1>All Books</h1>
            <Booksearch
                onSearchChange={handleSearchChange}
                searchTerm={searchTerm}
                user={authCtx.user} // Pass user to Booksearch
            />
            <Booklist books={filteredBooks} />
        </>
    );
}

export async function getStaticProps() {
    const res = await fetch("http://localhost:3000/api/books/getAllBooks");
    const books = await res.json();

    return {
        props: {
            books: books,
        },
        revalidate: 60,
    };
}
