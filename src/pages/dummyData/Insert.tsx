import React, { useState } from 'react';
import axios from 'axios';

function InsertDummyData() {
  // Define a state for the response message
  const [responseMessage, setResponseMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file input change
  const handleFileChange = (event: any) => {
    const image: any = event.target.files[0]
    setSelectedFile(image);
  };

  // Define a function to create a product
  const createProduct = async () => {
    try {
      const formData = new FormData();

      // Add the token if required
      formData.append('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODU1ODkwZTZhNmRjYzJjNzcwMDI0YSIsImlhdCI6MTY5NDg0NzgxNn0.XoTtH65IMny1Z9C4XjioNChrQ3jItApTtTDjjrMgZdw'); // Replace 'your_token_here' with the actual token

      // Add the product object as JSON string
      const product = {
        name: 'Example Product',
        tax: ['GST', 'VAT'],
        description: 'This is a sample product description.',
        code: 'ABC123',
        rate: 29.99,
        unit: 'grams',
        category: 'Finished Goods',
        limit: 5,
        stock: 1000,
        specifications: [
          { name: 'Size', value: 'Medium' },
          { name: 'Color', value: 'Blue' },
          { name: 'Material', value: 'Cotton' },
        ],
        weight: 1.5,
      };

      formData.append('product', JSON.stringify(product));

      // Add the selected file (if available)
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      // Make the API request using Axios
      const response = await axios.post('http://localhost:5000/api/create/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });

      // Set the response message in the state
      setResponseMessage(JSON.stringify(response.data));
    } catch (error) {
      // Handle any errors
      console.error(error);
      setResponseMessage('An error occurred while creating the product.');
    }
  };

  return (
    <div>
      <div>
        <label htmlFor='image' >img</label>
        <input id='image' type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      <button onClick={createProduct}>Create Product</button>
      <div>
        <h3>Response Message:</h3>
        <p>{responseMessage}</p>
      </div>
    </div>
  );
}

export default InsertDummyData;
