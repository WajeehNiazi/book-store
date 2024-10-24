import Link from "next/link";

export default function InfoPage(){
    return (
        <div>
            <h1>Welcome to the information Page</h1>
            <nav>
                <ul>
                    <li>
                        <Link href="/info/faqs">FAQs</Link>
                    </li>
                    <li>
                        <Link href="/info/support">Support</Link>
                    </li>
                    <Link href={`/`}>
                        <button className="blueButton">Home Page</button>
                    </Link>
                </ul>
            </nav>
            <style jsx>{`
                nav ul {
                    list-style-type: none;
                    padding: 0;
                }
                nav li {
                    display: inline;
                    margin-right: 15px;
                }
                nav li a {
                    text-decoration: none;
                    color: blue;
                }
            `}</style>
        </div>
    )
}