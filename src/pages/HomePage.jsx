import homeImg from '../assets/images/home.png'

export function HomePage() {
    return (
        <section className="home-page">
            <h1>This is our HOME</h1>
            <img src={homeImg} alt="Home image" />
        </section >
    )
}