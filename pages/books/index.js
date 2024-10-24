import Booklist from "@/components/books/Booklist";
import fs from "fs";
import path from "path";
import Booksearch from "@/components/books/Booksearch";


export default function Allbooks(props){
    return (
        <>
            <h1>All Books</h1>
            <Booksearch />
            <Booklist books={props.books}/>
        </>
    )
}

export async function getStaticProps(){
    const filePath = path.join(process.cwd(), "data", "Data.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(jsonData);
    const res = await fetch("http://localhost:3000/api/books/getAllBooks");
    const books = await res.json();

    return {
        props: {
            books: books
        },
        revalidate: 60
    }
}