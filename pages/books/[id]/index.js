import Link from "next/link";
import styles from "./DetailedBookPage.module.css";
import ProtectedRoute from "@/components/auth/PortectedRoute";


export default function DetailedBookPage(props){

    return(
        <ProtectedRoute>
            <div className={styles.container}>
                <h1 className={styles.title}>{props.loadedbook.title}</h1>
                <p className={styles.description}>Description: {props.loadedbook.description}</p>
                Author:
                <Link href={'/books/'+props.loadedbook.id+'/author'} className={styles.author}>{props.loadedauthor.name}</Link>
                <p className={styles.price}>Price: ${props.loadedbook.price}</p>
                <p className={styles.rating}>Rating: {props.loadedbook.rating} / 5</p>
                <Link href={'/'} className={styles.backLink}>Back to Home</Link>
                </div>
        </ProtectedRoute>
        
    )
}

export async function getStaticPaths(){
    const res = await fetch("http://localhost:3000/api/books/getAllBooks");
    const books = await res.json();

    const ids = books.map(book => book.id);
    const pathss = ids.map(id => ({params: {id: id}}));
    return {
        paths:pathss,
        fallback: false
    }
}

export async function getStaticProps(context){
    const bookres = await fetch(`http://localhost:3000/api/books/${context.params.id}`);
    if (!bookres.ok) {
        throw new Error("Failed to fetch book details");
    }
    const book = await bookres.json();

    const authorRes = await fetch(`http://localhost:3000/api/authors/${book.authorId}`);
    const author = await authorRes.json();

    if(!book || !author){
        return {
            notFound: true
        }
    }

    return{
        props: {
            loadedbook: book,
            loadedauthor: author
        }
    }
}