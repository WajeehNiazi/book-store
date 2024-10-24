import { useRef } from "react";
import { useRouter } from "next/router";
import styles from "./Booksearch.module.css";


export default function Booksearch(props){
    const g = useRef();
    const router = useRouter();
    function submit(event){
        event.preventDefault();
        const selectedGenre = g.current.value;
        if(selectedGenre === "all"){
            return router.push("/books");
        }
        else{
            return router.push('/books/filtered/'+selectedGenre);
        }
    }
    return(
        <form className={styles.form}>
            <div className={styles.controls}>
                <div className={styles.controls}>
                    <lable>Genre</lable>
                    <select id='genre' ref={g}>
                        <option value="all">All Genres</option>
                        <option value="fiction">Fiction</option>
                        <option value="dystopian">Dystopian</option>
                        <option value="romance">Romance</option>
                        <option value="adventure">Adventure</option>
                    </select>
                </div>
            </div>
            <button onClick={submit}>Find books</button>
        </form>
    )
}