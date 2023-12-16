import React from "react";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import "./ReceiptList.css";

const ReceiptList = () => {
  const navigate = useNavigate();
  const records = JSON.parse(localStorage.getItem("receiptRecords")) || [];

  const handleAddClick = () => {
    navigate("/receipt-crud");
  };

  const handleRefreshClick = () => {
    window.location.reload();
   
  };

  const handlePrintClick = () => {
    exportToPDF(records);
  };

  const handleExitClick = () => {
    navigate("/");
  };

 // Export records to PDF
 const exportToPDF = (records) => {
  const doc = new jsPDF();
  const tableColumn = ["Sr No.", "Receipt No", "Receipt Date", "Person Name", "Total Qty", "Net Amount", "Item"];
  const tableRows = records.map((record, index) => [
    index + 1,
    record.receiptNo,
    record.date,
    record.name,
    record.qty,
    record.amount,
    record.description,
  ]);

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  doc.save("receipts.pdf");
};
const handleDeleteItem = (index) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this item?");
  if (confirmDelete) {
    const updatedRecords = [...records];
    updatedRecords.splice(index, 1);
    localStorage.setItem("receiptRecords", JSON.stringify(updatedRecords));
    
    window.location.reload();
  }
};
  return (
    <div className="table_container">
      <div>
        <div className="top">
          <div>
            <h3>Receipt List </h3>
          </div>
          <div>
            <Button variant="outlined" onClick={handleAddClick}>Add</Button>
            <Button variant="outlined" onClick={handleRefreshClick}>Refresh</Button>
            <Button variant="outlined" onClick={handlePrintClick}>Print</Button>
            <Button variant="outlined" onClick={handleExitClick}>Exit</Button>
          </div>
        </div>
        <div >
          <table>
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Receipt No</th>
                <th>Receipt Date</th>
                <th>Person Name</th>
                <th>Total Qty</th>
                <th>Net Amount</th>
                <th>Item</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{record.receiptNo}</td>
                  <td>{record.date}</td>
                  <td>{record.name}</td>
                  <td>{record.qty}</td>
                  <td>{record.amount}</td>
                  <td>{record.description}</td>
                  <td >
                    {/* <button className='btn'>Edit</button> */}
                    <button className='btn' onClick={() => handleDeleteItem(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>Record Count: {records.length}</div>
      </div>
    </div>
  );
};

export default ReceiptList;
