import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./BookAuthor.module.css";
import ProtectedRoute from "@/components/auth/PortectedRoute";

export default function BookAuthor() {
    const router = useRouter();
    const { id: bookId } = router.query;

    const [book, setBook] = useState(null);
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch book details
        const fetchBookAndAuthor = async () => {
            try {
                setLoading(true);
                const bookResponse = await fetch(`http://localhost:3000/api/books/${bookId}`);
                if (!bookResponse.ok) throw new Error("Failed to fetch book details");
                const bookData = await bookResponse.json();
                setBook(bookData);

                // Fetch author details
                const authorResponse = await fetch(`http://localhost:3000/api/authors/${bookData.authorId}`);
                if (!authorResponse.ok) throw new Error("Failed to fetch author details");
                const authorData = await authorResponse.json();
                setAuthor(authorData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (bookId) {
            fetchBookAndAuthor();
        }
    }, [bookId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!book || !author) {
        return <p>Book or author not found.</p>;
    }

    return (
        <ProtectedRoute>
            <div className={styles.container}>
                <h1 className={styles.title}>{author.name}</h1>
                <p className={styles.bio}>{author.biography}</p>
            </div>
        </ProtectedRoute>
    );
}
