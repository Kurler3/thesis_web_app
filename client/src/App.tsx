import React, { ChangeEvent, useCallback, useState } from 'react';
import './App.css'
import axios from "axios";
import InputTextContainer from './components/InputTextContainer.component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ClipLoader from "react-spinners/ClipLoader";

interface IState {
  loading: boolean;
  inputText: string;
  resultSummarization: string;
}

function App() {

  const [state, setState] = useState<IState>({
    loading: false,
    inputText: "",
    resultSummarization: "",
  });


  /////////////////////////
  // FUNCTIONS ////////////
  /////////////////////////

  // HANDLE CLICK ON SUMMARIZE
  const handleClickSummarize = useCallback(async () => {

    try {

      if (state.inputText.length > 50) {


        setState((prevState) => ({ ...prevState, loading: true }))

        const result = await axios.post("http://localhost:5000/summarize", { "text": state.inputText });

        console.log("Result...", result);

        setState((prevState) => ({
          ...prevState,
          resultSummarization: result.data.summary,
        }))

      } else {
        //  SHOW TOAST
        console.log("Input length too small...", state.inputText.length)



        toast.info("Input length too small! Need at least 50 characters");
      }

    } catch (error) {
      console.error("Error while summarizing...", error);

      toast.error("Error while summarizing! Please try again");

    } finally {
      setState((prevState) => ({ ...prevState, loading: false }))
    }
  }, []);

  // HANDLE CHANGE
  const handleInputChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {

    console.log("Event: ", event.target.value)

    setState((prevState) => {
      return {
        ...prevState,
        inputText: event.target.value,
      };
    });
  }, []);

  // HANDLE REMOVE SUMMARY
  const handleRemoveSummary = useCallback(() => {
    setState((prevState) => {

      return {
        ...prevState,
        resultSummarization: "",
      }

    })
  }, []);


  //////////////////////////
  // RENDER ////////////////
  //////////////////////////

  return (
    <div className='flex flex-col items-center bg-red-200 w-screen background h-screen relative'>

      {/* NAV */}
      <nav className='bg-white w-full flex items-center justify-center p-5 shadow-xl'>
        <h1 className='text-[22px] font-medium textColor'>
          Sentence BERT Summarizer
        </h1>
      </nav>

      {/* MAIN */}
      <main className='relative flex flex-row gap-10 items-center flex-1 w-screen justify-start px-40 py-20'>

        {/* INPUT TEXT CONTAINER */}
        <InputTextContainer
          inputText={state.inputText}
          handleInputChange={handleInputChange}
          handleSummarize={handleClickSummarize}
          resultSummarization={state.resultSummarization}
        />

        {/* RESULT SUMMARIZED TEXT CONTAINER */}
        <div
          className={`${state.resultSummarization.length > 0 ? "textContainer" : "hiddenContainer"}`}
          style={{
            width: state.resultSummarization.length > 0 ? "50%" : "0px",
            padding: "0px"
          }}
        >
          {
            state.resultSummarization.length > 0 ?

              (
                <React.Fragment>

                  <div className='text-lg font-bold w-full text-center border-b py-4 relative'>
                    Summary

                    <div onClick={handleRemoveSummary} title='Remove summary' className='material-icons absolute top-3 right-2 bg-red-400 text-white cursor-pointer rounded-md transition hover:scale-110'>
                      close
                    </div>
                  </div>

                  <div className='p-5'>
                    {
                      state.resultSummarization
                    }
                  </div>

                </React.Fragment>
              )

              : null}


        </div>

      </main>


      <ToastContainer
        position='bottom-left'
        autoClose={3000}
        pauseOnFocusLoss
        theme='dark'
      />
    </div>
  )
}

export default App
