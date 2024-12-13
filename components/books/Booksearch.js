import { useRef } from "react";
import { useRouter } from "next/router";
import styles from "./Booksearch.module.css";

export default function Booksearch({ onSearchChange, searchTerm, user }) {
    const g = useRef();
    const router = useRouter();
    const debounceTimer = useRef(null);

    const logSearchHistory = async (query) => {
        if (!query || !user) return; // Ensure query and user are available
        try {
            const response = await fetch("/api/user/history", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: user.id, // Use user ID from props
                    query: query,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to log search history.");
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleSearchInput = (event) => {
        const value = event.target.value;
        onSearchChange(event);
         // Notify parent about search change
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        debounceTimer.current = setTimeout(() => {
            logSearchHistory(value); // Log only after user stops typing
        }, 1000); // 500ms debounce delay; // Log search query
    };

    function submit(event) {
        event.preventDefault();
        const selectedGenre = g.current.value;
        if (selectedGenre === "all") {
            return router.push("/books");
        } else {
            return router.push("/books/filtered/" + selectedGenre);
        }
    }

    return (
        <form className={styles.form}>
            <div className={styles.controls}>
                <div className={styles.controls}>
                    <label>Genre</label>
                    <select id="genre" ref={g}>
                        <option value="all">All Genres</option>
                        <option value="fiction">Fiction</option>
                        <option value="dystopian">Dystopian</option>
                        <option value="romance">Romance</option>
                        <option value="adventure">Adventure</option>
                    </select>
                </div>
            </div>
            <button onClick={submit}>Find books</button>
            <div className={styles.searchfiltercontainer}>
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchTerm}
                    onChange={handleSearchInput} // Updated handler
                    className={styles.searchbar}
                />
            </div>
        </form>
    );
}
