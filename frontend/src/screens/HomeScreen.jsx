import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../Components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import Carousel from 'react-bootstrap/Carousel';
import { SlideLogo } from './SlideLogoScreen';

/* O primeiro parametro é o estado atual e a segunda é a ação que muda o estado e cria um novo estado */
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      /* O loading é true, que serve para mostrar uma caixa de carregamento na interface do usuário. */
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      /* O fetch sendo success irá fazer o loading ser falso, porque não tem que mostrar a caixa de carregamento, e em products será colocado os produtos do backend. */
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      /* Caso falhe o request o loading ira ser falso, e ira mostrar o erro e mostre a mensagem de erro em action.payload */
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  /* O primeiro parâmetro é o objeto que contem loading, error e products, no segundo parâmetro é o dispatch serve para chamar uma ação. O useReducer aceita dois parâmetros, o primeiro é o reducer e o segundo é o estado padrão. */
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    /* Está chamando uma api e obtendo products do backend. */
    const fetchData = async () => {
      /* Quando o site é renderizado ele ativa esse dispatch o FETCH_REQUEST */
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        /* Caso de certo o fetch ele ira pegar e disparar o dispatch FETCH_SUCCESS e colocar o products que está dentro de result para o payload que no reducer chama de products. */
        const result = await axios.get('/api/products');
        /* pegou products e jogou dentro de result. */
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        /* Caso não funcione o fetch vai disparar o dispatch FETCH_FAIL jogando a mensagem dentro do payload que no reducer chama de error. */
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Bicholandia</title>
      </Helmet>
      <section>
        <div className="main-slide my-5">
          <Carousel variant="dark">
            <Carousel.Item interval={3000}>
              <img
                className="carouselImg d-block w-10 rounded"
                src="https://res.cloudinary.com/dcf2nu601/image/upload/v1674648274/slide01_y8hk7g.gif"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <img
                className="carouselImg d-block w-100 rounded"
                src="https://res.cloudinary.com/dcf2nu601/image/upload/v1674648273/slide02_ytscuo.gif"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <img
                className="carouselImg d-block w-100 rounded"
                src="https://res.cloudinary.com/dcf2nu601/image/upload/v1674648273/slide03_ltkhch.png"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <img
                className="carouselImg d-block w-100 rounded"
                src="https://res.cloudinary.com/dcf2nu601/image/upload/v1674648273/slide04_srnmkz.png"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <img
                className="carouselImg d-block w-100 rounded"
                src="https://res.cloudinary.com/dcf2nu601/image/upload/v1674648275/slide05_bzw0sm.gif"
                alt="First slide"
                style={{ width: 1340 }}
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </section>
      <h1>Produtos em Destaque</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {/* Está pegando os products do backend e fazendo um map dele.  */}
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
      <SlideLogo />
    </div>
  );
}
export default HomeScreen;
