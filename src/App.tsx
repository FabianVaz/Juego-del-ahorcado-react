// App.tsx
import { useState } from "react";
import Hangman from "./components/Hangman";
import Welcome from "./components/Welcome";

const wordCategories = {
  Frutas: {
    words: ['manzana', 'platano', 'sandia', 'papa', 'cebolla', 'ajo'],
    hints: {
      manzana: 'Somos verdes y amarillas, también somos coloradas, es famosa nuestra tarta, y también puedes comernos sin que estemos cocinadas.',
      platano: 'No soy de plata, plata no soy. Ya te he dicho quién soy.',
      sandia: 'Roja por dentro, verde por fuera. Si te la quieres comer, muchas pepitas tendrás que morder. ¿Qué fruta es?',
      papa: 'Tengo ojos y no veo, me crie bajo la tierra, me puedes comer asada, frita o como quieras. ¿Quién soy?',
      cebolla: 'Me abrigo con paños blancos, luzco blanca cabellera y por causa mía llora hasta la misma cocinera.',
      ajo: 'Tengo cabeza redonda, sin nariz, ojos ni frente, y mi cuerpo se compone tan sólo de blancos dientes.'
    }
  },
  Animales: {
    words: ['rana', 'raton', 'luciernaga', 'murcielago', 'clasica', 'reggae'],
    hints: {
      rana: 'Canto en la orilla, vivo en el agua, no soy pescado ni cigarra. ¿Quién soy?',
      raton: 'El roer es mi trabajo, el queso mi aperitivo y el gato siempre será mi más temido enemigo. ¿Quién soy?',
      lueciernaga: 'Soy un trocito de luz en la noche. De día me escondo en la hierba. Parezco una esmeralda que el viento se lleva. ¿Quién soy?',
      muercielago: 'Vuelo de noche, duermo en el día y nunca veras plumas en ala mía.',
      pollito: 'Madre me labró una casa sin puertas y sin ventanas, y cuando quiero salir rompo antes la muralla.',
      gallina: 'Pico de cuerno, ala de ave, la rodilla para atrás, y anda adelante.'
    }
  },
  Transportes: {
    words: ['carro', 'tren', 'avion', 'bicicleta', 'helicoptero', 'motocicleta'],
    hints: {
      carro: 'Llevo a la familia y a su equipaje. Paso todas las noches en el garaje. ¿Quién soy?',
      tren: 'Por un camino de hierro voy corriendo muy veloz, doy un fuerte silbido cuando llego a la estación. ¿Quién soy?',
      avion: 'Soy pájaro sin nido con las alas de metal, las ruedas tengo de goma y los ojitos de cristal.',
      bicicleta: 'Dos ruedas, un sillín y un manillar. Si subes sobre ella te hará sudar.',
      helicoptero: 'Encima de la cabeza gira mi gran abanico y en la punta de la cola gira otro pequeñito.',
      motocicleta: 'Vehículo soy, hago muchísimo ruido, pero sólo dos viajan conmigo.'
    }
  },
};

function App() {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  const selectRandomCategory = () => {
    const categories = Object.keys(wordCategories);
    const randomIndex = Math.floor(Math.random() * categories.length);
    setCurrentCategory(categories[randomIndex]);
  };

  return (
    <div className="App">
      <Welcome />
      <div className="category-container">
        <button onClick={selectRandomCategory} className="random-button">
          Select Random Category
        </button>
        {currentCategory && (
          <div className="category-animation">
            <h2>{currentCategory}</h2>
            <Hangman
              words={wordCategories[currentCategory].words}
              hints={wordCategories[currentCategory].hints}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;