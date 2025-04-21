import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const[amount,setAmount]=useState(1);
  const[fromcurrency,setFromcurrency]=useState("USD");
  const[tocurrency,setTocurrency]=useState("INR");
  const[convertedamount,setConvertedamount]=useState(null); 
  const[exchangerate,setExchangerate]=useState(null);
  useEffect(()=>{
   const getExchange= async( )=>{
try{
  let url=`https://api.exchangerate-api.com/v4/latest/${fromcurrency}`;
  let res=await fetch(url);
    let data=await res.json();
    console.log(data);
    setExchangerate(data.rates[tocurrency]); 


}catch(error){
  console.error("Error fetching exchange rate:",error);
}
    }
    getExchange();
  },[fromcurrency,tocurrency]);
  useEffect(()=>{
    if(exchangerate!==null){
      setConvertedamount((amount*exchangerate).toFixed(2));
    }
  },[amount,exchangerate])
  const handleAmount=(e)=>{
    const amountvalue=(e.target.value);
    if(amountvalue===" "||isNaN(amountvalue)){
      setAmount(" ");
    }
    else{
      setAmount(parseFloat(amountvalue));
    }
  }
 const  handlefromcurrency=(e)=>{
    setFromcurrency(e.target.value);
  }
 const  handletocurrency=(e)=>{
    setTocurrency(e.target.value);
  }
  return (
    <>
<div className="currency-converter">
  <div className="box"></div>
  <div className="data">
    <h1>CURRENCY CONVERTER</h1>
    <div className="input">
      <label htmlFor="amount">Amount:</label> 
     <input type="text" value={amount} onChange={handleAmount} />
    </div>
    <div className="input">
      <label htmlFor="fromcurrency">From Currency</label>
     <select value={fromcurrency} id="from-currency" onChange={handlefromcurrency}>
      <option value="USD">USD-United States Doller</option>
      <option value="EUR">EUR-Euro</option>
      <option value="GBP">GBP-British Pound Sterling</option>
      <option value="JPY">JPY-Japanese Yen</option>
      <option value="AUD">AUD-Australlian Doller</option>
      <option value="CAD">CAD-Cannadian Doller</option>
      <option value="INR">INR-Indian Rupees</option>
     </select>
    </div>
    <div className="input">
      <label htmlFor="tocurrency">TO Currency</label>
     <select  value={tocurrency} onChange={handletocurrency} id="to-currency">
      <option value="USD">USD-United States Doller</option>
      <option value="EUR">EUR-Euro</option>
      <option value="GBP">GBP-British Pound Sterling</option>
      <option value="JPY">JPY-Japanese Yen</option>
      <option value="AUD">AUD-Australlian Doller</option>
      <option value="CAD">CAD-Cannadian Doller</option>
      <option value="INR">INR-Indian Rupees</option>
     </select>
    </div>
  
    <div className="result">
  <p>{amount} {fromcurrency} is equal to {convertedamount} {tocurrency}</p>
    </div>
  </div>
</div>
    </>
  )
}

export default App
