import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExpanseForm from './Expense/expenseForm'
import ExpenseList from './Expense/expenseList';

function App() {
  return (
    <div className="App">
      <ExpanseForm />
      <ExpenseList />
    </div>
  );
}

export default App;
