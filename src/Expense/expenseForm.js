import { addDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import db from '../firebase';
import { getFirestore, collection, query } from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';


import './Style.css';

const ExpenseForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        date: '',
        color: '',

    });

    const [show, setShow] = useState(false);

    const handleChange = (event) => {

        setFormData({
            ...formData, [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const c = collection(db, "expenses")

        const expensesRef = addDoc(c, formData);

        expensesRef.then(() => {
            console.log('Expense added successfully!');
        }).catch((error) => {
            console.error('Error adding expense: ', error);
        });

        setFormData({
            title: '',
            amount: '',
            date: '',
            color: '',
        });
    };



    const handleClose = () => {
        setShow(false)
        window.location.reload(false);
    };
    const handleShow = () => setShow(true)



    return (
        <div className='ap'>

            <Button variant="primary" className="rounded-pill" onClick={handleShow} style={{ margin: 10 }} >
                Add Expense
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form className='fm' onSubmit={handleSubmit}>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label >Title:</Form.Label>
                                <Form.Control type='text' name="title" required value={formData.title} onChange={handleChange}></Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label >Amount:</Form.Label>
                                <Form.Control type='number' name="amount" required value={formData.amount} onChange={handleChange}></Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label >Date:</Form.Label>
                                {/* <Form.Control type='date' name="date" value={formData.date} onChange={handleChange}></Form.Control> */}
                                <Form.Select aria-label="Default select example" name="date" value={formData.date} onChange={handleChange}>
                                    <option>Month</option>
                                    <option >January</option>
                                    <option >February</option>
                                    <option >March</option>
                                    <option >April</option>
                                    <option >May</option>
                                    <option >June</option>
                                    <option >July</option>
                                    <option >August</option>
                                    <option >September</option>
                                    <option >October</option>
                                    <option >November</option>
                                    <option >December</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="exampleColorInput">Color Picker</Form.Label>
                                <Form.Control value={formData.color} onChange={handleChange}
                                    type="color"
                                    name="color"

                                    title="Choose your color"
                                />
                            </Form.Group>


                        </Row>
                        <Button variant="secondary" onClick={handleClose} style={{ margin: 5 }} >
                            Close
                        </Button>
                        <Button variant="primary" type='submit' onClick={handleClose}>
                            Save
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default ExpenseForm;