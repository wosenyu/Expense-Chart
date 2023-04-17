import React, { useEffect, useReducer, useState } from 'react';
import db from '../firebase';
import { query, collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import Chart from '../Components/Chart';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import SvgIcon from '../Components/SvgIcon'
import './Style.css';

const ExpenseList = () => {

    const c = collection(db, "expenses")
    const q = query(c)
    const [expenses, setExpenses] = useState([]);

    const userData = async () => {

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
            // doc.data() is never undefined for query doc snapshots
            ...doc.data(),
            id: doc.id
        }));
        setExpenses(data);
    };

    useEffect(() => {
        userData();

    }, []);

    const deleteExpense = async (val) => {
        await deleteDoc(doc(db, "expenses", val.id));
        const newData = userData()
        setExpenses(oldData => [...oldData, newData])
    };



    const cData = {
        labels: expenses.map((val) => (val.date)),
        datasets: [{
            label: '$',
            data: expenses.map((val) => (val.amount)),
            backgroundColor: expenses.map((val) => (val.color)),
        }]
    }

    const rednderCard = (val, index) => {
        return (
            <div class="card" key={index}>
                <div class="card-img" style={{ backgroundColor: val.color }} ></div>
                <div class="card-info">
                    <p class="text-title">{val.date} </p>
                    <p class="text-body">{val.title}</p>
                </div>
                <div class="card-footer">
                    <span class="text-title">{"$ " + val.amount}</span>
                    <div class="card-button">
                        <SvgIcon onClick={() => deleteExpense(val)} />
                    </div>
                </div>
            </div>
        )
    }




    return (
        <div >
            <div className="border-2 border-black p-2">
                <p className="text-xl border-black border-b-2 p-1 text-center">Expense</p>
                <div >
                    <Row>
                        {expenses.map(rednderCard)}
                    </Row>
                </div>

                <div className='chart'>
                    <Chart chartData={cData} />
                </div>

            </div>

        </div>

    )

    // return (

    //     <div >
    //         <div className="border-2 border-black p-2">
    //             <p className="text-xl border-black border-b-2 p-1 text-center">Expense</p>
    //             <div >

    //                 {expenses.map((val, title, amount, date, id) => {
    //                     return (
    //                         <div>
    //                             <DropdownButton id="dropdown-basic-button" title={val.title + " $" + val.amount + " " + val.date}>
    //                                 <Dropdown.Item><Button variant="danger" onClick={() => deleteExpense(val)}>Delete</Button></Dropdown.Item>
    //                             </DropdownButton>

    //                             <Dropdown as={ButtonGroup}>
    //                                 <Button variant="success">{val.title + " $" + val.amount + " " + val.date}</Button>
    //                                 <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
    //                                 <Dropdown.Menu>
    //                                     <Dropdown.Item > <Dropdown.Item><Button variant="danger" onClick={() => deleteExpense(val)}>Delete</Button></Dropdown.Item></Dropdown.Item>
    //                                 </Dropdown.Menu>
    //                             </Dropdown>


    //                             <div class="card">
    //                                 <div class="card-img"></div>
    //                                 <div class="card-info">
    //                                     <p class="text-title">{val.date} </p>
    //                                     <p class="text-body">{val.title}</p>
    //                                 </div>
    //                                 <div class="card-footer">
    //                                     <span class="text-title">{"$ " + val.amount}</span>
    //                                     <div class="card-button">
    //                                         <SvgIcon onClick={() => deleteExpense(val)} />
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     );

    //                 })}
    //             </div>
    //             <div className='chart'>
    //                 <Chart chartData={cData} />
    //             </div>

    //         </div>
    //     </div>

    // )
};


export default ExpenseList