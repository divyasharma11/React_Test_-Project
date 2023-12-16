import React from "react";
import {Routes,Route,BrowserRouter} from "react-router-dom";
import Login from "./Component/Login";
import ReceiptList from "./Component/ReceiptList";
import ReceiptCRUD from "./Component/ReceiptCRUD";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/receipt-list" element={<ReceiptList />} />
        <Route path="/receipt-crud" element={<ReceiptCRUD />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
