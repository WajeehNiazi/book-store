import Link from "next/link"
import styles from "./Booklist.module.css"
import { useRouter } from "next/router"


export default function Booklist(props) {
    const router = useRouter();
    function handler(id){
        router.push(`/books/${id}`);
    }

    function renderStars(rating) {
        const fullStars = Math.floor(rating);
        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push("★");
        }
        return stars.join(" ");
    }

    return (
        <ul className={styles.list}>
            {props.books.map(book => (
                <li key={book.id} className={styles.listItem}>
                    <span className={styles.title}>{book.title}</span>
                    <span className={styles.rating}>{renderStars(book.rating)}</span>
                    <span className={styles.price}>${book.price}</span>
                    <button 
                        onClick={() => handler(book.id)} 
                        className={styles.detailsButton}
                    >
                        View Details
                    </button>
                </li>
            ))}
        </ul>
    )
}