import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataFetchingAPI = ({id}) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://192.168.10.76:8080/web/emp/${id}`);
          setData(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, [id]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        {data.map((item) => (
            <div key={item.EmpID}>
                <h1>Detail</h1>
                <p>EmployeeID : {item.EmpID}</p>
                <p>Name : {item.Name}</p>
                <p>Position : {item.Position}</p>
                <p>ComID : {item.ComID}</p>
                <p>Email : {item.Email}</p>
                <p>Status : {item.Status}</p>
            </div> 
        ))}
      </div>
    );
  };
  
  export default DataFetchingAPI;