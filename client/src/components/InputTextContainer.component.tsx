import React, { ChangeEvent } from 'react'
import { ClipLoader } from 'react-spinners';

interface IProps {
    inputText: string;
    resultSummarization: string;
    handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    handleSummarize: (inputText: string) => Promise<void>;
    loading: boolean;
}


const InputTextContainer:React.FC<IProps> = ({
    inputText,
    handleInputChange,
    handleSummarize,
    resultSummarization,
    loading,
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
            className='resize-none focus:outline-none w-full h-[90%] text-lg focus:bg-gray-100 p-2 transition rounded-md'
            placeholder='Input your text here...'
          >
          </textarea>

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