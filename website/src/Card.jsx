const Card = (props) => {
    return <>
        <div class="text-4xl font-black mb-2 title">{props.user.name}</div>
        <div class="grid grid-rows-4">
            <div>Height: {props.user.height}</div>
            <div>Mass: {props.user.mass}</div>
            <div>Eye Color: {props.user.eye_color}</div>
            <div>Birth Year: {props.user.birth_year}</div>
        </div>
        <a href={props.user.url} target="_blank"
           class="text-blue-600 text-xs font-bold font-mono">source</a>
    </>
}

export default Card;
