import './index.css';
import Header from './components/Header';

const cities = ["Ankara","İstanbul","Aydın","İzmir","çok hojdir","ama benana"]

function App() {
  return (
    <>
      <Header text={'Header'} cities={cities}/>
    </>
  );
}

export default App;
