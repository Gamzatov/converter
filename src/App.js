import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('UAH')
  const [toCurrency, setToCurrency] = React.useState('USD')
  const [fromPrice, setFromPrice] = React.useState(0)
  const [toPrice, setToPrice] = React.useState(1)
  const [rates, setRates] = React.useState({});
  const ratesRef = React.useRef({})
  React.useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
    .then((res) => res.json())
    .then((json) => {
      // setRates(json.rates);
      console.log(ratesRef.current = json.rates)
      ratesRef.current = json.rates;
      onChangeToPrice(1);
    }).catch((err) => {
      console.warn(err);
      alert('не удалось получить информацию');
    })
  }, []);
  
  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(2));
    setFromPrice(value);
  }
  const onChangeToPrice = (value) => {
    const result = ratesRef.current[fromCurrency] / ratesRef.current[toCurrency] * value;
    setFromPrice(result.toFixed(2));
    setToPrice(value);
  }

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);
  React.useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

const handleInput = (e) => {
  const text = e.target.value;
  if( text.toLowerCase().includes('eur' || 'usd' || 'uah')){
  }
 
  
}
  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={(cur) => setFromCurrency(cur)}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={(cur) => setToCurrency(cur)}
        onChangeValue={onChangeToPrice} />
    </div>
  );
}

export default App;
