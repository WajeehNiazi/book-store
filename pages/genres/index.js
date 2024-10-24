import Link from "next/link";

export default function Genres(props) {
    return (
        <>
            <h1>Book Genres</h1>
            <ol>
                {props.genres.map(genre => (
                    <li key={genre.id}>
                        <Link href={'/genres/'+genre.id}>{genre.name}</Link>
                    </li>
                ))}
            </ol>
        </>
    )
}

export async function getServerSideProps(context){
    const res = await fetch("http://localhost:3000/api/genres");
    const genres = await res.json();

    return {
        props: {
            genres: genres
        }
    }
}