import './styles.scss'

type cardProps = {
    name?: string;
}


export function SelectedCards(props: cardProps) {
    return (
        <div className="card">
            <p>{props.name}</p>
            <button><i className="fa-solid fa-xmark"> </i> </button>
        </div>
    )
}