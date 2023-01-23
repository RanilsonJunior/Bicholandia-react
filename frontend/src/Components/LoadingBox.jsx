import Spinner from 'react-bootstrap/Spinner';
// Basicamente é um loading universal, para utilizar em vários lugares.
export default function LoadingBox() {
  return (/* Caso não consiga mostrar o loading irá ser mostrado o texto escrito 'Loading...' . */
    <Spinner animation="border" role="statux">
      <span className="visually-hidden">Carregando...</span>
    </Spinner>
  );
}
