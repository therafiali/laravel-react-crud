import  { useState } from "react";
import axios from "axios";

const InvoiceForm = () => {
  const [invoice, setInvoice] = useState({
    customerName: "",
    notes: "",
    items: [{ name: "", price: "" }],
    total: 0,
    invoiceUrl: ""
  });

  const handleChange = (e, index, field) => {
    if (field === "item") {
      const newItems = [...invoice.items];
      newItems[index][e.target.name] = e.target.value;
      setInvoice({ ...invoice, items: newItems });
      calculateTotal(newItems);
    } else {
      setInvoice({ ...invoice, [e.target.name]: e.target.value });
    }
  };

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + Number(item.price || 0), 0);
    setInvoice({ ...invoice, total });
  };

  const addItem = () => {
    setInvoice({ ...invoice, items: [...invoice.items, { name: "", price: "" }] });
  };

  const generateInvoice = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/invoice/generate",
        invoice
      );
      setInvoice({ ...invoice, invoiceUrl: response.data.invoiceUrl });
      alert("Invoice generated! You can download or scan QR code.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Invoice</h2>
      <input
        type="text"
        name="customerName"
        placeholder="Customer Name"
        value={invoice.customerName}
        onChange={handleChange}
      />
      <textarea
        name="notes"
        placeholder="Notes"
        value={invoice.notes}
        onChange={handleChange}
      ></textarea>

      <h3>Items</h3>
      {invoice.items.map((item, index) => (
        <div key={index}>
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={item.name}
            onChange={(e) => handleChange(e, index, "item")}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleChange(e, index, "item")}
          />
        </div>
      ))}
      <button onClick={addItem}>Add Item</button>

      <h3>Total: ${invoice.total}</h3>
      <button onClick={generateInvoice}>Generate Invoice</button>

      {invoice.invoiceUrl && (
        <div style={{ marginTop: 20 }}>
          <p>Invoice ready: <a href={invoice.invoiceUrl} target="_blank">Download PDF</a></p>
        </div>
      )}
    </div>
  );
};

export default InvoiceForm;
