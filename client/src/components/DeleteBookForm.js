import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Segment, Header, Button } from "semantic-ui-react";

function DeleteBookForm({ book, setOpenDelete }){
    const history = useHistory()
    const [error, setError] = useState(null)

    function handleDeleteClick(){
        fetch(`/books/${book.id}`, {
            method: "DELETE",
        }).then((r) => {
            if (r.ok) {
                history.push('/discover')
                alert("Book successfully deleted!")
                setOpenDelete(false)
            } else {
                r.json().then((err) => setError(err.error))
            }
        })
    }

    return(
        <Segment textAlign='center'>
            <Header>Are you sure you want to delete this book from the database?</Header>
            <Button onClick={handleDeleteClick}>Yes</Button>
            <Button onClick={() => setOpenDelete(false)}>No</Button>
            {error ? 
            <div style={{ color: '#cc0000', marginTop: '10px'}}>{error}</div>
            : null}
        </Segment>
    )
}

export default DeleteBookForm