import { useState } from 'react';

import axios from '../api/axios';
import { handleChange } from '../utils';
import { useAuthState } from '../context';

import { Alert, Button, InputField } from '../components/general';
import validateForm, { pottingMixSchema } from '../utils/validation';

export default function AddPottingMix() {
  const user = useAuthState();

  const [pottingMixData, setPottingMixData] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '' }]);

  const deleteEmptyInputs = () => {
    const emptyInputs = ingredients.filter((input) => input.name === '');
    const realInputs = ingredients.filter((input) => input.name !== '');

    if (emptyInputs.length > 1) {
      realInputs.push({ name: '' });
      setIngredients(realInputs);
    }

    const ingredientList = realInputs.map((input) => input.name);
    setPottingMixData({
      ...pottingMixData,
      ingredients: [...ingredientList],
    });
  };

  const addIngredientss = ({ target }, index) => {
    const data = [...ingredients];
    data[index][target.name] = target.value;

    const numberOfIngredients = data.length;
    const lastIndex = numberOfIngredients - 1;
    if (data[lastIndex].name !== '') {
      data.push({ name: '' });
    }
    setIngredients(data);
    deleteEmptyInputs();
  };

  async function postPottingMix() {
    const res = await axios.post('/new-potting-mix', pottingMixData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
    return res;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm(
      pottingMixSchema,
      pottingMixData,
      setAlertMessage
    );

    if (isValid) {
      postPottingMix()
        .then((data) => {
          if (data.status === 200) setSuccessMessage('Sikeres felvitel');
        })
        .catch((err) => {
          setAlertMessage(err.message);
        });
      setPottingMixData({});
      setIngredients([{ name: '' }]);
      setAlertMessage('');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container potting-mix-form">
      {alertMessage && <Alert className="alert-danger" value={alertMessage} />}
      {!alertMessage && successMessage && (
        <Alert className="alert-success" value={successMessage} />
      )}
      <form onSubmit={handleSubmit} noValidate>
        <legend className="mb-5">Földkeverék hozzáadása</legend>
        <InputField
          type="text"
          name="name"
          id="name"
          placeholder="név"
          onChange={(e) => handleChange(e, pottingMixData, setPottingMixData)}
          value={pottingMixData.name}
          autoComplete="off"
        />
        <h6 className="text-start mt-4 mb-3">Add meg az összetevőket:</h6>
        {ingredients.map((input, index) => {
          const key = `ingredient${index}`;
          return (
            <InputField
              key={key}
              type="text"
              name="name"
              id={`ing${index}`}
              onChange={(e) => addIngredientss(e, index)}
              value={input.name}
              autoComplete="off"
            />
          );
        })}
        <h6 className="text-start mt-4">Adj meg egy rövid leírást:</h6>
        <InputField
          type="textarea"
          name="description"
          id="description"
          value={pottingMixData.description}
          onChange={(e) => handleChange(e, pottingMixData, setPottingMixData)}
          autoComplete="off"
        />
        <Button type="submit" className="btn-primary" value="Hozzáadás" />
      </form>
    </div>
  );
}
