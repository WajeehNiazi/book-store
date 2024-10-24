
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";
import Link from "next/link";
import Booklist from "@/components/books/Booklist";
import styles from "../components/books/Booklist.module.css";
import UserInfo from "@/components/auth/UserInfo";


export async function getStaticProps(){
  const filePath = path.join(process.cwd(), "data", "Data.json");
  const jsonData = fs.readFileSync(filePath, "utf-8"); 
  const data = JSON.parse(jsonData);

  const featuredBooks = data.books.filter(book => book.isFeatured === true);

  return {
    props: {
      books: featuredBooks
    }
  }
}

export default function Home(props) {
  const router = useRouter();

  const handler = () => {
    router.push("/genres");
  }
  return (
    <>
      <h1>Featured Books</h1>
      <Booklist books={props.books} />
      <button onClick={handler} className={styles.detailsButton}>View Genres</button>
      <UserInfo />
    </>
  );
}
