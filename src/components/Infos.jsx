import React from 'react'
import { FaClock } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { GiConfirmed } from "react-icons/gi";
import { MdDeliveryDining } from "react-icons/md";
import { HiShoppingBag } from "react-icons/hi";


const hora = new Date().getHours()

const Infos = ({setInfos}) => {
  const [isOpen,setIsOpen]=React.useState("")

  function verificaHora(){
  
    if(hora < 16){
      setIsOpen(false)
    } else{
      setIsOpen(true)
    }
  }
  
  React.useEffect(()=>{
    verificaHora()
  },[hora])

function close(e){
  if(e.target.id==="infos"){
    setInfos((infos)=>!infos)
  }
}

  return (
    <div className='flex inset-0 items-center fixed bg-black  bg-opacity-35 justify-center backdrop-blur-sm z-50 ' id='infos' onClick={close}>
      <div className='bg-white lg:max-w-md w-full h-[99%] lg:max-h-[78%] rounded-md overflow-hidden mt-2 overflow-y-scroll animaDiv'>

        <div className='px-4 flex justify-between bg-gray-100 py-2'>
            <h1 className='font-bold'>Informação</h1>
            <button className='font-bold text-red-600' onClick={()=>setInfos(infos=>!infos)}>X</button>
        </div>

        <div className='px-4 mt-6'>
            <p className='flex gap-2 text-[18px] px-2 items-center border max-w-[140px] rounded-full  justify-center'><span className='w-3 h-3 rounded-full bg-green-600'></span><span>Aberto</span> <FaClock className='text-gray-500'/> </p>
        </div>
        <div className='flex items-center justify-between px-4 mt-2'>
            <h1 className='font-bold text-2xl'>Pytter Burguer</h1>
            <img src="/images/logopng.png" alt="" className='max-w-[40px] border rounded-lg bg-black'/>
        </div>
        <div className='px-4 mt-4 '>
<a href="https://api.whatsapp.com/send?phone=31992311170&text=ola, vim do seu site" className=' border-b-2 pb-4 block'><FaWhatsapp className='text-3xl'/></a>
        </div>

        <div className='px-4 my-4'>

            <p className='font-bold text-xl'>Tipos de serviços</p>

            <div className='flex justify-between items-center mt-4 border px-2 rounded-md py-1'>
            <div className='flex gap-2 items-center'>
            <SiHomeassistantcommunitystore className='text-blue-600'/> 
            <p>No local</p>
            </div>
            <p><GiConfirmed  className='text-2xl text-green-600'/></p>
            </div>

            <div className='flex justify-between items-center mt-4 border px-2 rounded-md py-1'>
            <div className='flex gap-2 items-center'>
            <HiShoppingBag className='text-xl text-blue-600'/> 
            <p>Retirar na loja</p>
            </div>
            <p><GiConfirmed  className='text-2xl text-green-600'/></p>
            </div>

            <div className='flex justify-between items-center mt-4 border px-2 rounded-md py-1'>
            <div className='flex gap-2 items-center'>
            <MdDeliveryDining className='text-2xl text-blue-600'/>
            <p>Delivery</p>
            </div>
            <p><GiConfirmed  className='text-2xl text-green-600'/></p>
            </div>

        </div>

        <div className='px-4'>
          <h1 className='font-bold text-xl'>Horários de funcionamento</h1>
          <div className='flex items-center justify-between mt-2'>
            <span>Domingo</span> <span className='flex gap-2 items-center'><FaClock className='text-gray-400' /> 18:00 - meia noite</span>
          </div>
          <div className='flex items-center justify-between mt-2'>
            <span>Segunda-feira</span> <span className={`${isOpen ? "text-green-600":"text-red-600"}`}>{isOpen ? "Aberto":"Fechado"}</span>
          </div>
          <div className='flex items-center justify-between mt-2'>
            <span>Terça-feira</span> <span className='flex items-center gap-2'><FaClock className='text-gray-400' /> 18:00 - meia noite</span>
          </div>
          <div className='flex items-center justify-between mt-2'>
            <span>Quarta-feira</span> <span className='flex items-center gap-2'><FaClock className='text-gray-400' /> 18:00 - meia noite</span>
          </div>
          <div className='flex items-center justify-between mt-2'>
            <span>Quinta-feira</span> <span className='flex items-center gap-2'><FaClock className='text-gray-400' /> 18:00 - meia noite</span>
          </div>
          <div className='flex items-center justify-between mt-2'>
            <span>Sexta-feira</span> <span className='flex items-center gap-2'><FaClock className='text-gray-400' /> 18:00 - meia noite</span>
          </div>
          <div className='flex items-center justify-between mt-2'>
            <span>Sábado</span> <span className='flex items-center gap-2'><FaClock className='text-gray-400' /> 18:00 - meia noite</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Infos
