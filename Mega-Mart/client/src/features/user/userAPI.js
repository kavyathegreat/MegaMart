export async function fetchLoggedInUserOrders(userId) {
  // Check if userId is valid before making the API call
  if (!userId) {
    console.error('User ID is undegtgfined');
    return { error: 'User ID is required' };
  }

  try {
    console.log('Fetching orders for User ID:', userId);
    
    const response = await fetch(`http://localhost:8080/orders/user/`+userId);

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('Fetch error:', error);
    return { error: 'Failed to fetch user orders' };
  }
}

export async function fetchLoggedInUser (userId) {
  try {
    const response = await fetch(`http://localhost:8080/users/`+userId);
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to fetch user' };
  }
}

export function updateUser(update) {
  return new Promise(async (resolve, reject) => {
    try {
      // Log the update payload for debugging
      console.log('Update payload:', update);

      // Perform the PATCH request to update the entire user object
      const response = await fetch(`http://localhost:8080/users/${update.id}`, {
        method: 'PATCH',
        body: JSON.stringify(update), // Send the full user object
        headers: { 'Content-Type': 'application/json' },
      });

      // Handle server response
      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const data = await response.json();
      // TODO: on the server, ensure only non-sensitive user info is returned (exclude passwords, etc.)
      resolve({ data });
    } catch (error) {
      console.error('Error updating user:', error);
      reject(error); // Optionally handle the error in the calling function
    }
  });
}



