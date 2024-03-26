'use client'
import { DadosContext } from '@/app/contexts/DadosContext'
import React from 'react'
import { FaClock } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { CiCircleInfo } from "react-icons/ci";
import Infos from './Infos';

const Header = () => {
 const infos= React.useContext(DadosContext)
 const [anima,setAnima]=React.useState(false)
 const [infosLoja,setInfosLoja]=React.useState(false)
 const [isOpen,setIsOpen]=React.useState("")

 const hora = new Date().getHours()

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



function close(){
  setInfosLoja((infoss)=>!infoss)
}

  return (
   <>
    <header className='bg-home bg-cover top-0 right-0 left-0 fixed z-10 bg-center'>
      <div className='bg-black bg-opacity-45 w-full'>
      <nav className='max-w-7xl mx-auto flex items-center flex-col lg:justify-start justify-center'>
    
        <div className='relative'>
        <div onClick={close}>
          <p className=' flex items-center justify-center gap-2 rounded-full absolute top-4 right-[140px] lg:right-[-185px]  text-2xl cursor-pointer'><CiCircleInfo className='bg-white rounded-full' size={35} />  <span className={`bg-white h-10 px-2 lg:px-10 rounded-full animate-pulse ${isOpen ? "text-green-600":"text-red-600"} `}>{isOpen ? "Aberto":"Fechado"}</span></p>
          {/* <a href="https://matalarica.page.link/pytterburguer" className='animate-pulse'><img src="/images/matalarica.png" alt="logo matalarica" className='max-w-[50px] absolute right-[-50px] bottom-2 border-2 rounded-full border-white'/></a> */}
        </div>
        <a href="/"><img src="/images/logopng.png" alt="logo pytter" className='max-w-[150px] bg-white border-[2px] my-2 border-black rounded-full'/></a>
        </div>
      </nav>
      </div>
    </header>

 {/* inicio modal infos */}
 {infosLoja && <Infos setInfos={setInfosLoja}/>}
 {/* final modal infos */}</>

  )
}

export default Header
