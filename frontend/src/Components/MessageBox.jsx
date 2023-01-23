import Alert from 'react-bootstrap/Alert';
// Será mostrado um alerta de erro usando o bootstrap,
export default function MessageBox(props) {
  return <Alert variant={props.variant || 'info'}>{props.children}</Alert>;
}
