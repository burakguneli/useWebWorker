import { useRef, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import ActionButtons from './ActionButtons';

function App() {
  const animatedIconRef = useRef(null);

  function chargebattery() {
    const wrapper = animatedIconRef.current
    wrapper.innerHTML = "&#xf244;";

    setTimeout(function () {
      wrapper.innerHTML = "&#xf243;";
    }, 100);
    setTimeout(function () {
      wrapper.innerHTML = "&#xf242;";
    }, 200);
    setTimeout(function () {
      wrapper.innerHTML = "&#xf241;";
    }, 300);
    setTimeout(function () {
      wrapper.innerHTML = "&#xf240;";
    }, 400);
  }

  useEffect(() => {
    chargebattery();
    setInterval(chargebattery, 500);
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div className='App-header-logos'>
          <div>
            <p>GPU Animated Icon</p>
            <img src={logo} className="App-logo" alt="logo" />
          </div>

          <div>
            <p>JS Animated Icon</p>
            <div className="fa" ref={animatedIconRef}></div>
          </div>
        </div>

        <ActionButtons />
      </header>
    </div>
  );
}

export default App;
