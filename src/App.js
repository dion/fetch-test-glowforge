import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [places, setPlaces] = useState([{
    id: 20
  }]);
  
  const getData = async () => {
    const result = await getPlaces();
    setPlaces(result);
  };
  
  useEffect(() => {
    getData();
  }, []);

  const getPlaces = async () => {
    let placesCollection = [];

    const response = await fetch('https://byteboard.dev/api/data/places');
    const places = await response.json();

    const iteration = places.places.map(async place => {
      const getImages = await fetch(`https://byteboard.dev/api/data/img/${place.id}`);
      const images = await getImages.json();

      placesCollection.push({ ...place, img: images.img });
    })

    await Promise.all(iteration);

    return placesCollection;
  };

  return (
    <div className="App">
      <h2>places: </h2>
      {places.length ? places.map((place, index) => {
        return (
          <div key={place.id}>
            <h3>{place.name}</h3>
            <img src={place.img} alt={place.name} />
          </div>
        )
      }) : <div> nothing </div>
      }
    </div>
  );
}

export default App;
