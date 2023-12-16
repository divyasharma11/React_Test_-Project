import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import "./ReceiptCRUD.css";
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ReceiptCRUD = () => {
  const [records, setRecords] = useState( []);
  const [receiptNumber, setReceiptNumber] = useState(Math.floor(Math.random() * 100));
  const [name, setName] = useState("");
  const [remark, setRemark] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  const generateReceiptNumber = () => {
    setReceiptNumber(prev => prev + 1);
    return receiptNumber;
  };
  useEffect(() => {
    setRecords([
      {
        receiptNo: generateReceiptNumber(),
        description: '',
        unit: '',
        name: name,
        remark: '',
        rate: 0,
        qty: 0,
        discount: 0,
        amount: 0,
        date: new Date().toLocaleDateString(),
      },
    ]);
  }, [name]); 

  const addRow = () => {
    const newRecord = { receiptNo: generateReceiptNumber(), description: '', unit: '', name: name, remark: remark, rate: 0, qty: 0, discount: 0, amount: 0, date: new Date().toLocaleDateString() };
    setRecords([...records, newRecord]);
    // Set the editIndex to the index of the newly added row
    setEditIndex(records.length);
  };
  
  const handleGridChange = (index, field, value) => {
    const updatedRecords = [...records];
    updatedRecords[index][field] = value;

    // Auto-calculate amount based on rate and qty
    if (field === 'rate' || field === 'qty') {
      const rate = updatedRecords[index].rate || 0;
      const qty = updatedRecords[index].qty || 0;
      updatedRecords[index].amount = rate * qty;
    }

    setRecords(updatedRecords);
  };

  const calculateTotals = () => {
    const totalQty = records.reduce((total, record) => total + (record.qty || 0), 0);
    const totalAmount = records.reduce((total, record) => total + (record.amount || 0), 0);
    const discount = records.reduce((total, record) => total + (record.discount || 0), 0);
    const netAmount = totalAmount - discount;

    return { totalQty, totalAmount, discount, netAmount };
  };

  const saveRecords = () => {
    localStorage.setItem("receiptRecords", JSON.stringify(records));
    navigate("/receipt-list");
  };

  const { totalQty, totalAmount, discount, netAmount } = calculateTotals();

  const handleEditItem = (index) => {
    setEditIndex(index);
  };

  const handleUpdateItem = () => {
    setEditIndex(null);
  };

  const handleDeleteItem = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      const updatedRecords = [...records];
      updatedRecords.splice(index, 1);
      setRecords(updatedRecords);
    }
  };
 const handleCancle=()=>{
  navigate("/receipt-list");
 }
 const handleDeleteCrudList=()=>{
  navigate("/receipt-list");
 }
const handlePrintClick=()=>{
  exportToPDF(records);
}
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

const handleBackBtn=()=>{
      navigate("/receipt-list");
}
  return (
    <>
      <button className='backbtn' onClick={handleBackBtn}>Back</button>
    <div className="crud_container">
       <div>
      <div className="top">
        <div>
          <h3>ReceiptCRUD </h3>
        </div>
        <div>
          <Button variant="outlined" onClick={saveRecords}>Save</Button>
          <Button variant="outlined" onClick={handleCancle}>Cancel</Button>
          <Button variant="outlined" onClick={handleDeleteCrudList}>Delete</Button>
          <Button variant="outlined" onClick={handlePrintClick}>Print</Button>
        </div>
      </div>
      <div className='crud_container1'>
        <div className='crud_top'>
          <div className='personal_details'>
            <div className='no'>Receipt No: {receiptNumber}</div>
            <div className='date'>Receipt Date: { new Date().toLocaleDateString()}</div>
          </div>
          <div className='personal_details'>
            <input type='text' className='name' placeholder='Person Name' value={name} onChange={(e) => setName(e.target.value)} />
            <Button variant="outlined" onClick={addRow}>Add Row</Button>
          </div>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Description</th>
                <th>Unit.</th>
                <th>Rate.</th>
                <th>Qty.</th>
                <th>Discount</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {editIndex === index ? (
                      <input
                        className='input'
                        value={record.description}
                        onChange={(e) => handleGridChange(index, 'description', e.target.value)}
                      />
                    ) : (
                      <span>{record.description}</span>
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <input
                        className='input'
                        value={record.unit}
                        onChange={(e) => handleGridChange(index, 'unit', e.target.value)}
                      />
                    ) : (
                      <span>{record.unit}</span>
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <input
                        className='input'
                        type="number"
                        value={record.rate}
                        onChange={(e) => handleGridChange(index, 'rate', parseFloat(e.target.value))}
                      />
                    ) : (
                      <span>{record.rate}</span>
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <input
                        className='input'
                        type="number"
                        value={record.qty}
                        onChange={(e) => handleGridChange(index, 'qty', parseFloat(e.target.value))}
                      />
                    ) : (
                      <span>{record.qty}</span>
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <input
                        className='input'
                        type="number"
                        value={record.discount}
                        onChange={(e) => handleGridChange(index, 'discount', parseFloat(e.target.value))}
                      />
                    ) : (
                      <span>{record.discount}</span>
                    )}
                  </td>
                  <td>{record.amount}</td>
                  <td className='btn_grp'>
                    {editIndex === index ? (
                      //  <Button variant="outlined" onClick={() => handleUpdateItem(index)}>Update</Button>
                      <button className='btn' onClick={() => handleUpdateItem(index)}>Update</button>
                    ) : (
                      <button className='btn' onClick={() => handleEditItem(index)}>Edit</button>
                      // <Button variant="outlined" onClick={() =>handleEditItem(index)}>Edit</Button>
                    )}
                    <button className='btn' onClick={() => handleDeleteItem(index)}>Delete</button>
                    {/* <Button variant="outlined" onClick={() => handleDeleteItem(index)}>Delete</Button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='bottom'>
          <textarea type='text' className='remark' placeholder='Remark' value={remark} onChange={(e) => setRemark(e.target.value)} />
          <div>
            <Button variant="outlined">Total Qty: {totalQty}</Button>
          </div>
          <div className='crud_btn'>
            <Button variant="outlined">Total Amt: {totalAmount}</Button>
            <Button variant="outlined">Discount: {discount}</Button>
            <Button variant="outlined">Net Amount: {netAmount}</Button>
          </div>
        </div>
      </div>
      </div>
    </div>
    </>
  );
};

export default ReceiptCRUD;

