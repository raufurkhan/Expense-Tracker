import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import ExpenseDisplay from "./ExpenseDisplay";

const ExpenseForm = () => {
   

    const [expenseItems, setExpenseItems] = useState([]);
    // Declare formData state
    

  
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [moneySpent, setMoneySpent] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseCategory, setExpenseCategory] = useState('');

    // Define your Firebase URL or configuration
    const firebaseURL = 'https://expensetracker-eb8fa-default-rtdb.firebaseio.com/';

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Update formData state with the values from refs
        const newExpense = {
            price: moneySpent,
            description: expenseDescription,
            category: expenseCategory,
        };

        try {
            if (isEditing) {
                await axios.put(
                    `${firebaseURL}/expenses/${selectedExpense.key}.json`,
                    newExpense
                );
                setIsEditing(false);
            } else {
                const res = await axios.post(`${firebaseURL}/expenses.json`, newExpense);
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Something went wrong');
                }
            }
            setMoneySpent('');
            setExpenseDescription('');
            setExpenseCategory('');
            setShowForm(false);
            fetchExpense();
        } catch (err) {
            
            alert('Error submitting the form: ' + err.message);
        }
    };
// Fetch expenses on component mount
    const fetchExpense = async () => {
        try {
            const res = await axios.get(`${firebaseURL}/expenses.json`);
            const expenseData = res.data;
            if (expenseData) {
                       // Convert the object of objects into an array with keys
                       const expenseArray = Object.keys(expenseData).map(key => ({
                        key, // Store the unique key of the expense object
                        ...expenseData[key], // Include the expense object itself
                    }));
                setExpenseItems(expenseArray);
            } else {
                console.log('No expense data found.');
            }
        } catch (err) {
            console.error('Error fetching expenses: ' + err.message);
        }
    };
    // Handle toggle form visibility
    const handleAddExpenseClick = () => {
        if (isEditing) {
            setIsEditing(false);
            setSelectedExpense(null);

            setMoneySpent('');
            setExpenseDescription('');
            setExpenseCategory('');
        }
        setShowForm(!showForm);
    };
   
    
    
    const editExpense = (key) => {
        const expenseToEdit = expenseItems.find((item) => item.key === key);

        if (expenseToEdit) {
            setIsEditing(true);
            setSelectedExpense(expenseToEdit);

            setMoneySpent(expenseToEdit.price);
            setExpenseDescription(expenseToEdit.description);
            setExpenseCategory(expenseToEdit.category);

            setShowForm(true);
        }
    };
        const deleteExpense = async (key) => {
            console.log('i was click');
            try {
                const response = await axios.delete(`${firebaseURL}/expenses/${key}.json`);
                if (response.status === 200) {
                    console.log('Expense deleted successfully:', response.data);
                    const newExpense = expenseItems.filter((item) => item.key !== key);
                    setExpenseItems(newExpense);
                    // You can trigger a re-fetch or update your state as needed here.
                } else {
                    throw new Error('Something went wrong while deleting the expense.');
                }
            } catch (error) {
                console.error('Error deleting expense:', error.message);
                // Handle the error or display an alert as needed.
            }
        };
       useEffect(() => {
        fetchExpense();
    }, []);
 
    useEffect(() => {
        if (!showForm) {
            setSelectedExpense(null);
        }
    }, [showForm]);

    // Handle toggle form visibility



    return (
        <Container className="my-4 mx-sm-4 mx-md-5 p-4 rounded">
            <Container className="bg-white p-4 rounded shadow-lg my-4 mx-4">

                {showForm && (
                    <Form onSubmit={handleSubmit}>
                        <h2>{isEditing ? 'Edit Expense' : 'Add an Expense'}</h2>
                        <Row>
                            <Col xs={12} sm={6} md={4}>
                                <Form.Group controlId="moneySpent">
                                    <Form.Label>Money Spent</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter amount"
                                        value={moneySpent}
                                        onChange={(e) => setMoneySpent(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6} md={4}>
                                <Form.Group controlId="expenseDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Describe the expense"
                                        value={expenseDescription}
                                        onChange={(e) => setExpenseDescription(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6} md={4}>
                                <Form.Group controlId="expenseCategory">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={expenseCategory}
                                        onChange={(e) => setExpenseCategory(e.target.value)}
                                    >
                                        <option value="food">Food</option>
                                        <option value="petrol">Petrol</option>
                                        <option value="salary">Salary</option>
                                        <option value="travel">Travel</option>
                                        <option value="shopping">Shopping</option>
                                        <option value="others">Others</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100 my-2 rounded"
                        >
                            {isEditing ? 'Update Expense' : 'Add Expense'}
                        </Button>

                    </Form>
                )}
                <div className="text-center">
                    <Button
                        variant="secondary"
                        onClick={handleAddExpenseClick}
                        className="rounded"
                    >
                        {showForm ? "Cancel" : "Add New Expense"}
                    </Button>
                </div>

            </Container>
            <Container className="bg-white p-4 rounded shadow-lg my-4 mx-4">
            <ExpenseDisplay expenses={expenseItems} onDelete={deleteExpense} onEdit={editExpense} />
            </Container>
        </Container>
    );
};

export default ExpenseForm;