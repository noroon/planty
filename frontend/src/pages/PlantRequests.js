import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useAuthState } from '../context';

export default function PlantRequests() {
  const user = useAuthState();

  const [requests, setRequests] = useState([]);

  const getRequests = async () => {
    try {
      const res = await axios.get('/plant-request', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return res.data.requests;
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    getRequests().then((requestList) => {
      setRequests(requestList);
    });
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="card mt-4 w-75 p-3 pt-4">
        <h2 className="text-center mb-5">Kérések</h2>
        <ul>
          {/* eslint-disable */}
          {requests.length > 0 &&
            requests.map((request) => {
              const { name } = request;
              const id = request._id;
              return (
                <li key={id}>
                  <p id={id}>{name}</p>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
