import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { LinearProgress } from '@material-ui/core';

function App() {
  const [text, setText] = useState('')
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(false)


  async function getMemes() {
    setLoading(true)
    setMemes([])
    console.log("Get MEMES")
    const key = 'UYX2P3ZLhxeQnCL3ISPqDocfSzeSVpee'
    let url = 'https://api.giphy.com/v1/gifs/search?'
    url += 'api_key='+key
    const searchWord = text.replace(/ +/g, "");
    url += '&q=' +searchWord
    console.log(url)
    const r = await fetch(url)
    const body = await r.json()
    console.log(body)
    setMemes(body.data)
    setText('')
    setLoading(false)
  }

  console.log(memes)

  return (
    <div className="App">
      <header className="App-header">

        <div className='input-wrap'>
          <TextField fullWidth variant="outlined" 
            label="Search for a meme!"
            value={text}
            onChange={e=> setText(e.target.value)}

            onKeyPress={e=> {
              if(e.key==='Enter') {
                getMemes()
              }
            }}
          />

          <Button id='searchButton' variant="contained" color="primary"
            onClick={getMemes}>
            Search
          </Button>
        </div>

        {loading && <LinearProgress />}

        <div className='all_memes'>
          {memes.map((meme, i)=> <Meme key={i} {...meme} />)}
        </div>
        

      </header>
    </div>
  );
}

function Meme({title, images}){
  return <div className='meme'>
    <img src={images.fixed_height.url} alt='this is a meme'/>

    <div className='meme-title'>{title}</div>
  </div>

}




export default App;
