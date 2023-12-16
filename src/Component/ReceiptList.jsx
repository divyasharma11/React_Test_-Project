import React from "react";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import "./ReceiptList.css";

const ReceiptList = () => {
  const navigate = useNavigate();

  // Load records from local storage or API
  const records = JSON.parse(localStorage.getItem("receiptRecords")) || [];

  // Handle Add button click
  const handleAddClick = () => {
    // Navigate to the ReceiptCRUD or open a modal for adding a new receipt
    navigate("/receipt-crud");
  };

  // Handle Refresh button click
  const handleRefreshClick = () => {
    // Reload records from local storage or API
    const updatedRecords = JSON.parse(localStorage.getItem("receiptRecords")) || [];
    // setRecords(updatedRecords);
  };

  // Handle Print button click
  const handlePrintClick = () => {
    // Add logic to export records to PDF or Excel
    exportToPDF(records);
  };

  // Handle Exit button click
  const handleExitClick = () => {
    // Navigate to the home page or perform other exit actions
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
                  <td className='btn_grp'>
                    <button className='btn'>Edit</button>
                    <button className='btn'>Delete</button>
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
