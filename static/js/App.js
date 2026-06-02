import './App.css';
import foto from './foto3x4.png'; // Tell webpack this JS file uses this image
// import qrcodeimg from './frame.png'; // Tell webpack this JS file uses this image
import check from './check_new.png'; // Tell webpack this JS file uses this image
import certified from './certified_new.png'; // Tell webpack this JS file uses this image
import loader from './loader.gif'; // Tell webpack this JS file uses this image
import dne from './dne_new.png'; // Tell webpack this JS file uses this image

import une from './une.png'; // Tell webpack this JS file uses this image
import menu from './menu.png'; // Tell webpack this JS file uses this image
import { useEffect, useState } from 'react';
import qrcode from 'qrcode';

function App() {
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [keychars, setKeychars] = useState("C0ETD1")

  const makeId = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  useEffect(() => {
    let canvas = document.getElementById('canvas')
    let code = makeId()

    setKeychars(code)

    qrcode.toCanvas(
      canvas, 
      'https://meia-entrada-com-br-732dbb7c-0654-483e-aeee-4ba0d322064e.vercel.app/?code='+code,
      {
        margin: '5',
        scale: '5'
      },
      function (error) {
        if (error) console.error(error)
      }
    )
  }, [])

  const getViewState = (x, y) => {
    return x & y
  }

  const checkDNE = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setChecked(true)
    }, 1000)
  }

  const openCertificate = () => {
    window.location.href = 'https://meia-entrada-com-br-732dbb7c-0654-483e-aeee-4ba0d322064e.vercel.app'
  }

  return (
    <div className="App">
      <div className='header'>
        <div className='item'>
          <img width="90px" src={dne} alt='teste' />
        </div>

        <div className='menu-container'>
          <img width="50px" src={une} alt='teste' />
          <img height={32} src={menu} alt='teste' />
        </div>
      </div>

      <div className='container'>
        <div style={{flexDirection: 'row',display: 'flex',justifyContent: 'center'}}>
          <div className='card'><img className='foto' src={foto} alt='teste' /></div>
          <div style={{width: '3%'}}></div>
          <div className='card qrcode-container'>
            {/* <img className='qrcode' src={qrcodeimg} /> */}
            <div className='canvas-block'>
              <canvas id="canvas" className='qrcode-canvas'></canvas>
            </div>
            <span style={{textAlign: 'center'}}>{keychars}</span>
            </div>
        </div>

        <div className='info'>
          <span className='title'>BEATRIZ TEIXEIRA</span>
          <p><span>Ins. Ensino:</span>UNIP</p>
          <p><span>Curso:</span> Administração</p>
          <p><span>Nível de Ensino:</span> SUPERIOR</p>
          <p><span>RG:</span> 395039526</p>
          <p><span>Data de Nasc:</span> 29/06/1994</p>
          <p><span>Validade:</span> 22/03/2027</p>
        </div>
      </div>

      { loading && (
        <div className='loader'>
          <img width="35" src={loader} alt='teste' />
        </div>
      )}

      { !!getViewState(!checked, !loading) && (
        <div onClick={checkDNE} className='certified'>
          <img width="20" src={check} alt='teste' />
          <p className="text">Validar</p>
        </div>
      )}

      { !!getViewState(checked, !loading) && (
        <div onClick={openCertificate} className='certified-checked'>
          <img width="20" src={certified} alt='teste' />
          <p className="text">Certificado</p>
        </div>  
      )}
    </div>
  );
}

export default App;
