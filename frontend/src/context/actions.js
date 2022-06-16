export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/login`,
      requestOptions,
    );
    const data = await response.json();

    if (data.token) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.token });
      localStorage.setItem('currentUser', JSON.stringify(data.token));
      return data;
    }

    dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
    return data;
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error });
    return error;
  }
}

export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
}

export async function updateUser(dispatch, updatePayload, userToken) {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(updatePayload),
  };

  try {
    dispatch({ type: 'REQUEST_UPDATE' });
    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/users`,
      requestOptions,
    );
    const data = await response.json();

    if (data.token) {
      dispatch({ type: 'UPDATE_SUCCESS', payload: data.token });
      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', JSON.stringify(data.token));
      return data;
    }

    dispatch({ type: 'UPDATE_ERROR', error: data.errors[0] });
    return data;
  } catch (error) {
    dispatch({ type: 'UPDATE_ERROR', error });
    return error;
  }
}
export async function updateMyCollection(dispatch, updatePayload, userToken, uderId) {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(updatePayload),
  };

  try {
    dispatch({ type: 'REQUEST_UPDATE' });
    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/user/${uderId}`,
      requestOptions
    );
    const data = await response.json();

    if (data.token) {
      dispatch({ type: 'UPDATE_SUCCESS', payload: data.token });
      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', JSON.stringify(data.token));
      return data;
    }

    return data;
  } catch (error) {
    dispatch({ type: 'UPDATE_ERROR', error });
    return error;
  }
}
