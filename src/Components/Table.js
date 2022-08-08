import './Table.css';

const Table = (props) => {

    console.log(props.tableData);

    return (
        <div className="container">
            <table>
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Distance (miles)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        
                    </tr>
                </tbody>
            </table>
        </div>
        
    );
}
 
export default Table;

//cellSpacing={0} style={{width: 10, height: 10, padding: '5px 10px'}}