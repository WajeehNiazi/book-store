import { useRouter } from "next/router";
import Link from "next/link";

export default function InfoPage(){
    const router = useRouter();
    const { slug } = router.query;

    const renderContent = () => {
        if (!slug) {
            return <p className="center">Loading...</p>
        }
        if (slug[0] === "faqs") {
            return <h1>Frequently Asked Questions</h1>;
        }
        if (slug[0] === "support") {
            return <h1>Support Section</h1>;
        }
        if (slug.length > 1) {
            return <h1>{slug.join(" / ")}</h1>;
        }
        return <h1>Information Page: {slug.join(" / ")}</h1>;
    };

    return (
        <div>
            {renderContent()}

            <nav>
                <ul>
                    <li>
                        <Link href="/info">Info Home</Link>
                    </li>
                    <li>
                        <Link href="/info/faqs">FAQs</Link>
                    </li>
                    <li>
                        <Link href="/info/support">Support</Link>
                    </li>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
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
    );
}