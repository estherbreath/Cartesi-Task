import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useContractReads, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import myTokenAbi from "../utils/abi.json";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [formData, setFormData] = useState({
    address: '',
    amount: ''
  })

  const inputChange = (e) => {
    setFormData((prevState) => ({
        ...prevState, [e.target.name]: e.target.value
    }))
  }

  const { data } = useContractReads({
    contracts: [
      {
        address: '0x279BD4f42D00490C6cB39b034668492cB6C88474',
        abi: myTokenAbi,
        functionName: 'symbol',
      },
      {
        address: '0x279BD4f42D00490C6cB39b034668492cB6C88474',
        abi: myTokenAbi,
        functionName: 'name',
      },
      {
        address: '0x279BD4f42D00490C6cB39b034668492cB6C88474',
        abi: myTokenAbi,
        functionName: 'totalSupply',
      },
    ],
  })

  const { config } = usePrepareContractWrite({
    address: '0x279BD4f42D00490C6cB39b034668492cB6C88474',
    abi: myTokenAbi,
    functionName: 'transfer',
    args: [formData.address, formData.amount]
  })

  const { data: writeData, isLoading: writeLoading, isSuccess, write } = useContractWrite(config)

  // const { data: waitData, isError: waitError, isLoading: waitLoading, isSuccess: waitSuccess } = useWaitForTransaction({
  //   hash: writeData?.hash,
  //   onSuccess(data){
  //     console.log(data)
  //     toast.success('Transfer successful')
  //   },

  //   onError(error){
  //     console.log(error)
  //     toast.error(error.message)
  //   }
  // })

  const handleSubmit = async (e) => {
    e.preventDefault()

  }

  return (
    <div className='flex flex-col h-screen w-full bg-gradient-to-br from-slate-400 to-slate-500'>
      <ConnectButton />
      <div className='m-auto flex flex-col w-6/12 m-auto gap-y-8'>
        <div className='text-auto p-5 bg-white rounded-md items-center gap-x-8'>
            <div className='flex text-center items-center gap-x-8'>
              <h4 className='text-slate-400'>Token name:</h4>
              <h4>{String(data?.[1].result)  || 'nil'}</h4>
            </div>
            <div className='flex text-center items-center gap-x-8'>
              <h4 className='text-slate-400'>Token symbol:</h4>
              <h4>{String(data?.[0].result)  || 'nil'}</h4>
            </div>
            <div className='flex text-center items-center gap-x-8'>
              <h4 className='text-slate-400'>Total supply:</h4>
              <h4>{String(data?.[2].result)  || 'nil'}</h4>
            </div>
        </div>

        <div className='p-5 rounded-lg bg-slate-400'>
          <h4 className='text-2xl text-center'>Transfer token</h4>
          <form className='flex gap-x-4'>
              <input 
              className='w-full placeholder-text-300'
                type="text"
                name='address'
                placeholder='enter address'
                value={formData.address}
                // onChange={inputChange}
              />

              <input 
                className='w-full placeholder-text-300'
                type="text"
                name='amount1'
                placeholder='enter amount. eg 3.0'
                value={formData.amount}
                // onChange={inputChange}
              />   

              <button onClick={handleSubmit} className='p-2 bg-green-500 rounded-md'>Send</button> 
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default App
