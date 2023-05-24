import React, { useEffect, useReducer, useState } from 'react';
import db from '../firebase';
import { query, collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import PieChart from '../Components/PieChart';
import BarChart from '../Components/BarChart';
import LineChart from '../Components/LineChart';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Stat, StatLabel, StatNumber, } from '@chakra-ui/react'
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import Row from 'react-bootstrap/Row';
import SvgIcon from '../Components/SvgIcon'
import './Style.css';

const ExpenseList = () => {

    const c = collection(db, "expenses")
    const q = query(c)
    const [expenses, setExpenses] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [sortDirection, setSortDirection] = useState("desc");

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


    const renderCard = (val, index) => {
        return (
            <div className="card" key={index}>
                <div className="card-img" style={{ backgroundColor: val.color }} ></div>
                <div className="card-info">
                    <p className="text-title">{val.date} </p>
                    <p className="text-body">{val.title}</p>
                </div>
                <div className="card-footer">
                    <span className="text-title">{"$ " + val.amount}</span>
                    <div className="card-button">
                        <SvgIcon onClick={() => deleteExpense(val)} />
                    </div>
                </div>
            </div>
        )
    }

    const calculateTotalExpense = () => {
        let total = 0;
        expenses.forEach((expense) => {
            total += parseFloat(expense.amount);
        });
        return total.toFixed(2);
    };

    useEffect(() => {
        const total = calculateTotalExpense();
        setTotalExpense(total);
    }, [expenses]);

    const sortExpensesByAmount = () => {
        expenses.sort((a, b) => b.amount - a.amount);
    };
    const toggleSort = () => {
        setSortDirection((prevSortDirection) =>
            prevSortDirection === "asc" ? "desc" : "asc"
        );
    };

    useEffect(() => {
        sortExpensesByAmount();
        if (sortDirection === "asc") {
            expenses.reverse();
        }
    }, [sortDirection, expenses]);


    return (
        <div >
            <div>
                {/* <div className='wid'>
                    <Row>
                        {expenses.map(rednderCard)}

                        {expenses.map(filteredExpenses)}
                    </Row>
                </div> */}
                <div className='total'>
                    <Stat>
                        <StatLabel>Total Expense</StatLabel>
                        <StatNumber>$ {totalExpense}</StatNumber>
                    </Stat>
                </div>

                <div className='lft'>
                    <Menu>
                        <MenuButton as={Button}>
                            Sort By
                        </MenuButton>

                        <MenuList>
                            <MenuItem onClick={toggleSort}>High to Low</MenuItem>
                            <MenuItem onClick={toggleSort}>Low to High</MenuItem>
                        </MenuList>
                    </Menu>
                </div>

                <div class="flex-container">

                    <div class="flex-child ">
                        <Row> {expenses.map(renderCard)}</Row>
                    </div>

                    <div class="flex-child-one" >
                        {/* <Chart chartData={cData} />
                        <BarChart chartData={cData}></BarChart> */}

                        <Tabs>
                            <TabList>
                                <Tab>Pie</Tab>
                                <Tab>Bar</Tab>
                                <Tab>Line</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <PieChart chartData={cData} />
                                </TabPanel>
                                <TabPanel>
                                    <BarChart chartData={cData} />
                                </TabPanel>
                                <TabPanel>
                                    <LineChart chartData={cData} />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </div>
                </div>

            </div >

        </div >
    )
};


export default ExpenseList