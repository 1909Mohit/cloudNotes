import AddNote from './AddNote';

const Notes = (props) => {
    return (
        <div>
            <AddNote showAlert={props.showAlert} />
        </div>
    )
}

export default Notes