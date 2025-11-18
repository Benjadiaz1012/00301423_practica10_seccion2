import CustomerList from "./components/CustomerList";
import RegisterSale from "./components/RegisterSale";
import SalesList from "./components/SalesList";
import CustomerSearch from "./components/CustomerSearch";
import SalesReport from "./components/SalesReport";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Mini Proyecto Guía 10</h1>

      <CustomerList />
      <hr />

      <RegisterSale />
      <hr />

      <SalesList />
      <hr />

      <CustomerSearch />
      <hr />

      <SalesReport />
    </div>
  );
}

export default App;
