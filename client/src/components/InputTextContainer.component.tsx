import React, { ChangeEvent, useCallback } from 'react'
import { ClipLoader } from 'react-spinners';

interface IProps {
  inputText: string;
  resultSummarization: string;
  handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSummarize: (inputText: string) => Promise<void>;
  loading: boolean;
  handlePaste: () => void;
}


const InputTextContainer: React.FC<IProps> = ({
  inputText,
  handleInputChange,
  handleSummarize,
  resultSummarization,
  loading,
  handlePaste,
}) => {

  /////////////////////////////
  // RENDER ///////////////////
  /////////////////////////////

  return (
    <div className='textContainer relative inputTextContainer flex flex-col justify-start items-center'
      style={{
        width: resultSummarization.length > 0 ? "50%" : "100%"
      }}
    >
      {/* TEXT AREA INPUT */}
      <textarea
        value={inputText} onChange={handleInputChange}
        className={`transition resize-none focus:outline-none w-full ${inputText.length === 0 ? "h-[30%]" : "h-[90%]"} text-lg focus:bg-gray-100 p-2 transition rounded-md`}
        placeholder='Input your text here...'
      >
      </textarea>

      {
        inputText.length === 0 ?

          (
            <div onClick={handlePaste} className='fade-in mt-10 flex justify-center items-center flex-col p-5 gap-2 border border-gray-300 rounded-md bg-gray-100 cursor-pointer transition hover:bg-white hover:shadow-lg'>

              <div className='material-icons text-[80px] text-blue-500'>
                content_paste
              </div>

              <p className='font-medium text-md'>Paste from clipboard</p>

            </div>
          )

          : null}

      {/* PASTE BUTTON */}
      {
        inputText.length > 0 ?
          (
            <div
              onClick={handlePaste}
              title="Paste from clipboard"
              className='fade-in absolute bottom-5 left-10 flex justify-center items-center cursor-pointer hover:shadow-lg border border-gray-200 p-2 rounded-md hover:bg-gray-200 bg-gray-100'
            >
              <div className='material-icons text-[30px] text-blue-500'>
                content_paste
              </div>
            </div>
          )
          : null}



      {/* SUMMARIZE BUTTON */}
      <button
        className='absolute bottom-5 min-w-[200px] bg-green-400 text-white right-10 p-3 rounded-md shadow-md hover:scale-110 transition'
        onClick={() => handleSummarize(inputText)}
      >
        <ClipLoader
          size={15} color={"#fff"}
          loading={loading}
        />
        {
          !loading ? "Summarize" : null
        }
      </button>

    </div>
  )
}

export default InputTextContainer;