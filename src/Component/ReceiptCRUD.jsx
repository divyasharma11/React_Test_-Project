import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import "./ReceiptCRUD.css";
import { useNavigate } from 'react-router-dom';
const ReceiptCRUD = () => {
  const [records, setRecords] = useState([]);
  const [receiptNumber, setReceiptNumber] = useState(Math.floor(Math.random() * 100));
  const[name,setName]=useState("");
  const[remark,setRemark]=useState("");
  const navigate=useNavigate();

  const generateReceiptNumber = () => {
    // setReceiptNumber( Math.floor(Math.random() * 100));
    setReceiptNumber(prev=>prev+1);
    return receiptNumber;
  };
  
  
  // Add a new blank row to the records
  const addRow = () => {
    setRecords([...records, { receiptNo:generateReceiptNumber(), description: '', unit: '',name:name,remark:remark, rate: 0, qty: 0, discount: 0, amount: 0 ,date:new Date().toLocaleDateString()}]);
  };

  // Handle changes in the grid
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

  // Calculate Total Qty, Total Amount, Discount, and Net Amount
  const calculateTotals = () => {
    const totalQty = records.reduce((total, record) => total + (record.qty || 0), 0);
    const totalAmount = records.reduce((total, record) => total + (record.amount || 0), 0);
    const discount = records.reduce((total, record) => total + (record.discount || 0), 0);
    const netAmount = totalAmount - discount;

    return { totalQty, totalAmount, discount, netAmount };
  };

  // Save the records to local storage or perform other actions
  const saveRecords = () => {
    // Add logic to save records to local storage
    localStorage.setItem("receiptRecords", JSON.stringify(records));
    navigate("/receipt-list");
  };

  const { totalQty, totalAmount, discount, netAmount } = calculateTotals();

  return (
    <div className="crud_container">
      <div>
      <div className="top">
        <div>
          <h3>ReceiptCRUD </h3>
        </div>
        <div>
        <Button variant="outlined" onClick={saveRecords}>Save</Button>
        <Button variant="outlined">Cancel</Button>
        <Button variant="outlined">Delete</Button>
        <Button variant="outlined">Print</Button>   
        </div>
      </div>
      <div className='crud_container1'>
        <div className='crud_top'>
          <div className='personal_details'>
            <div className='no'>Receipt No: {receiptNumber}</div>
            <div className='date'>Receipt Date: {new Date().toLocaleDateString()}</div>
          </div>
          <div className='personal_details'>
            <input type='text' className='name' placeholder='Person Name' value={name} onChange={(e)=>setName(e.target.value)}/>
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
                    <input
                      className='input'
                      value={record.description}
                      onChange={(e) => handleGridChange(index, 'description', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className='input'
                      value={record.unit}
                      onChange={(e) => handleGridChange(index, 'unit', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className='input'
                      type="number"
                      value={record.rate}
                      onChange={(e) => handleGridChange(index, 'rate', parseFloat(e.target.value))}
                    />
                  </td>
                  <td>
                    <input
                      className='input'
                      type="number"
                      value={record.qty}
                      onChange={(e) => handleGridChange(index, 'qty', parseFloat(e.target.value))}
                    />
                  </td>
                  <td>
                    <input
                      className='input'
                      type="number"
                      value={record.discount}
                      onChange={(e) => handleGridChange(index, 'discount', parseFloat(e.target.value))}
                    />
                  </td>
                  <td>{record.amount}</td>
                  <td className='btn_grp'>
                    <button className='btn'>Edit</button>
                    <button className='btn'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='bottom'>
          <textarea type='text' className='remark' placeholder='Remark'  value={remark} onChange={(e)=>setRemark(e.target.value)}/>
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
  );
};

export default ReceiptCRUD;
