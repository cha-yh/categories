import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import styled from 'styled-components';

function App() {
  const [openFirst, setOpenFirst] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);

  const [secondCts, setSecondCts] = useState<any[]>([]);
  const over = () => {
    setOpenFirst(true)
  }
  const leave = () => {
    setOpenFirst(false);
    setOpenSecond(false);
  }

  const [cts, setCts] = useState<any[]>([]);
  const getCateg = async () => {
    const _cts = await axios.get('https://api.kurly.com/v2/categories?ver=1');

    setCts(_cts.data.data.categories);
  }
  useEffect(() => {
    getCateg();
  }, [])

  const firstSectionOver = (no: string) => {
    getSecondCts(no)
    setOpenSecond(true);
  }

  const getSecondCts = (no: string) => {
    const index = cts.findIndex(item => item.no === no);
    setSecondCts(cts[index].categories);
  }
  return (

    <AppBlock className="App">
      <div onMouseOver={over} onMouseLeave={leave} >
        <button>전체 카테고리</button>
        <div className="flex">
          {openFirst && <div>{cts.map(item => <p onMouseOver={() => firstSectionOver(item.no)}>{item.name}</p>)}</div>}
          {openSecond  && <div>{secondCts.map(item => <p>{item.name}</p>)}</div>}
        </div>

      </div>
    </AppBlock>
  );
}

const AppBlock = styled.div`
  display: inline-block;
  >button {
    width: 8rem;
  }

  .flex {
    display: flex;

  }
`;
export default App;
