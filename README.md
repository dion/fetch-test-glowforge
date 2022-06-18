this is the line of code to solve the async issue:
```
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
```
In the project directory, you can run:
### `npm install`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


