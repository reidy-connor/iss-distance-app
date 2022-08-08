import './Output.css';

const Output = (props) => {
    return (
        <div>
            { props.distance && <p className="output"> {props.cityName} is currently {props.distance} miles from the International Space Station! </p>}
        </div>
    );
}
 
export default Output;