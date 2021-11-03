import { browserHistory } from "react-router";

export default function User(props) {
    const onNavigateHome = () => {
        browserHistory.push('/home');
    }

    return (
        <div>
            <h3>User Page</h3>
            <p>User ID: {props.params.id}</p>
            <button onClick={onNavigateHome} className="btn btn-primary" >Go home</button>
        </div>
    );
}
