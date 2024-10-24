import MainHeader from "./main-header";

export default function Layout(props) {
    return (
        <>
            <MainHeader />
            <main>
                {props.children}
            </main>
            <footer>
                <p>© 2021 Book Store</p>
            </footer>
        </>
    )
}