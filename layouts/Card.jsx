export default function Card({ name, mass, skin }) {
    return (
        <div className="card">
            <h2>{name}</h2>
            <p>Mass: {mass}</p>
            <p>Skin color: {skin}</p>
        </div>
    )
}