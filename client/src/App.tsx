import { ChangeEvent, useCallback, useState } from 'react';
import './App.css'
import axios from "axios";

function App() {

  const [inputText, setInputText] = useState("");
  console.log(inputText)
  // HANDLE CLICK ON SUMMARIZE
  const handleClickSummarize = useCallback( async () => {

    const result = await axios.post("http://localhost:5000/summarize", {"text": inputText});

    console.log("Result: ", result);

  }, []);

  // HANDLE CHANGE
  const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value)
  }, []);

  return (
    <div>

      <h1>Input your text to summarize</h1>

      <textarea onChange={handleChange} value={inputText}></textarea>

      <button onClick={handleClickSummarize}>Summarize</button>
    </div>
  )
}

export default App
