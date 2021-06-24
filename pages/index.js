import { useState } from 'react';
import Container from '../layouts/Container.jsx';
import Card from '../layouts/Card.jsx';

const getAllData = async (url) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json"
    },
  });
  const json = await res.json();
  return json;
}

export default function Home({ data, firstData }) {
  const [currentData, setCurrentData] = useState(data);
  const [active, setActive] = useState(0);

  const filterMass = () => {
    setActive(1);
    let masses = firstData.map(item => +item.mass);
    masses = masses.sort((a, b) => b - a);
    const filteredData = [];

    for (let i = 0; i < firstData.length; i++) {
      const index = firstData.findIndex(item => +item.mass === masses[i]);      
      filteredData.push(firstData[index]);
    }
    
    setCurrentData(filteredData);
  }

  const filterAll = () => {setCurrentData(firstData);setActive(0)};

  const filterSkin = () => {
    setActive(2);
    const filteredData = firstData.filter(item => item.skin_color === 'light');
    setCurrentData(filteredData);
  }

  const btnClasses = (number) => {
    return `filter_btn ${active === number ? 'btn_active' : ''}`;
  }

  return (
    <Container>
      <h1>Hello, Next!</h1>
      <div className="wrap">
        <div className="filters">
          <button className={btnClasses(0)} onClick={filterAll}>All</button>
          <button className={btnClasses(1)} onClick={filterMass}>Mass</button>
          <button className={btnClasses(2)} onClick={filterSkin}>Skin color</button>
        </div>
        <div className="cards">
          {
            currentData.map((item, i) => {
              return (
                <Card key={i} name={item.name} mass={item.mass} skin={item.skin_color} />
              )
            })
          }
        </div>
      </div>
    </Container>
  )
}

export async function getServerSideProps() {
  const data = await getAllData('https://swapi.dev/api/people');
  const {results} = data;
  return {props: {data: results, firstData: results}};
}