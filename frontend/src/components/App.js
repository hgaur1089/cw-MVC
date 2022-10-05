import ProductList from './ProductList';
import Filters from './Filters';

function App(props) {
  const products = props.store.getState();
  console.log(products);
  return (
    <div>
      <Filters  products={products} store={props.store}/>
      <ProductList products={products} store={props.store}/>
    </div>
  );
}

export default App;
