import React, { ChangeEvent } from 'react'

interface IProps {
    inputText: string;
    resultSummarization: string;
    handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    handleSummarize: () => void;
}


const InputTextContainer:React.FC<IProps> = ({
    inputText,
    handleInputChange,
    handleSummarize,
    resultSummarization,
}) => {
  return (
    <div className='textContainer relative inputTextContainer' 
          style={{
            width: resultSummarization.length > 0 ? "50%" : "100%"
          }}
        >   
          {/* TEXT AREA INPUT */}
          <textarea 
            value={inputText} onChange={handleInputChange}
            className='resize-none focus: outline-none w-full h-full text-lg'
            placeholder='Input your text here...'
          >
          </textarea>

          {/* SUMMARIZE BUTTON */}
          
            <button
                    className='absolute bottom-5 bg-green-400 text-white right-10 p-3 rounded-md shadow-md hover:scale-110 transition'
                    onClick={handleSummarize}
            >
                    Summarize
            </button>
          
        </div>
  )
}

export default InputTextContainer;