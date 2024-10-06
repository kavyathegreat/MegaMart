export function addToCart(item) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('Adding to cart:', JSON.stringify(item)); // Log the item being sent

      const response = await fetch('http://localhost:8080/cart', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: { 'Content-Type': 'application/json' }, // Ensure correct header case
      });

      // Check if the response is OK (status in the range 200-299)
      if (!response.ok) {
        const errorData = await response.json(); // Capture error response
        console.error('Failed to add item to cart:', response.status, errorData); // Log detailed error info
        return reject(`HTTP error! Status: ${response.status} - ${errorData.message}`);
      }

      // Attempt to parse JSON data from the response
      const data = await response.json();
      resolve({ data }); // Resolve with the response data

    } catch (error) {
      // Handle network errors or JSON parsing errors
      console.error('Network error:', error); // Log network error
      reject(`Network error: ${error.message}`);
    }
  });
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/cart?user=${userId}`);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to fetch items:', response.status, errorData);
        return reject(`HTTP error! Status: ${response.status} - ${errorData.message}`);
      }
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      console.error('Network error:', error);
      reject(`Network error: ${error.message}`);
    }
  });
}

export function updateCart(update) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/cart/${update.id}`, {
        method: 'PATCH',
        body: JSON.stringify(update),

        headers: { 'Content-Type': 'application/json' }, // Ensure correct header case
      });
      console.log(JSON.stringify(update));

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error updating cart:', response.status, errorData);
        return reject(`HTTP error! Status: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      console.error('Network error:', error);
      reject(`Network error: ${error.message}`);
    }
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/cart/${itemId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }, // Ensure correct header case
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error deleting item:', response.status, errorData);
        return reject(`HTTP error! Status: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      resolve({ data: { id: itemId } });
    } catch (error) {
      console.error('Network error:', error);
      reject(`Network error: ${error.message}`);
    }
  });
}

export function resetCart(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetchItemsByUserId(userId);
      const items = response.data;

      for (let item of items) {
        await deleteItemFromCart(item.id); // Delete each item in the cart
      }

      resolve({ status: 'success' });
    } catch (error) {
      console.error('Error resetting cart:', error);
      reject(`Error resetting cart: ${error.message}`);
    }
  });
}
