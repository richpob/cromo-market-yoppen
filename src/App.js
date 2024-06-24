import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import CromoMarket from './contracts/CromoMarket.json';
import IERC20 from './contracts/IERC20.json';

const marketAddress = '0x265d37eB5f8D9998cBA2E83Ba0C0Da6E9C5431f8';
const tokenAddress = '0x38bC18AE393a7e560F8C26c1490f06D0EE069B73';

function App() {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [marketContract, setMarketContract] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [cromos, setCromos] = useState([]);
  const [selectedCromo, setSelectedCromo] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);

        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);

        const marketContract = new web3.eth.Contract(CromoMarket.abi, marketAddress);
        setMarketContract(marketContract);

        const tokenContract = new web3.eth.Contract(IERC20.abi, tokenAddress);
        setTokenContract(tokenContract);

        const cromoCount = await marketContract.methods.nextCromoId().call();
        const cromoList = [];
        for (let i = 0; i < cromoCount; i++) {
          const cromo = await marketContract.methods.getCromo(i).call();
          cromoList.push(cromo);
        }
        setCromos(cromoList);
      } else {
        alert('Please install MetaMask!');
      }
    };

    init();
  }, []);

  const handleBuyCromo = async (cromoId) => {
    const cromo = await marketContract.methods.getCromo(cromoId).call();
    const balance = await tokenContract.methods.balanceOf(account).call();

    if (parseInt(balance) >= parseInt(cromo.price)) {
      await tokenContract.methods.approve(marketAddress, cromo.price).send({ from: account });
      const tx = await marketContract.methods.buyCromo(cromoId).send({ from: account });
      alert('Cromo purchased successfully');
    } else {
      alert('Insufficient balance');
    }
  };

  return (
    <div className="App">
      <h1>Cromo Marketplace</h1>
      <div>
        {cromos.map((cromo) => (
          <div key={cromo.id}>
            <h3>{cromo.name}</h3>
            <p>Price: {web3.utils.fromWei(cromo.price, 'ether')} Yoppen</p>
            {cromo.owner === '0x0000000000000000000000000000000000000000' ? (
              <button onClick={() => handleBuyCromo(cromo.id)}>Buy</button>
            ) : (
              <p>Owned by: {cromo.owner}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

