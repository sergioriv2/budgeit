import styled from "styled-components";
import {useState, useEffect} from 'react'
import axios from "axios"

const Layout = styled.section``;

export const Dashboard = () => {

    const [personalBudget, setPersonalBudget] = useState([])

    useEffect(() =>{

const fetchData = () =>{
  
    axios.get(`http://localhost:3001/api/users/user/:id/budget`)
    }

    }, [])

  return (
    <Layout>
      <button>Empezar!</button>
    </Layout>
  );
};
