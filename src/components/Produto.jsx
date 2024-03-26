import { DadosContext } from '@/app/contexts/DadosContext'
import React from 'react'
import { FaPlus } from "react-icons/fa";

const Produto = ({item,id}) => {
    const infos = React.useContext(DadosContext)
    

    function verItem(item){
       infos.setItem(item)
       infos.setOpenModalItens(true)
    }



  return (
    <div className='border-b-2 bg-white shadow-sm lg:border overflow-hidden rounded-md flex relative  gap-4 cursor-pointer' key={item.id} onClick={()=>verItem(item)} id={id}>
        <img src={item.urlImage} alt={`imagem ${item.produto}`} className='w-[110px] h-[110px] rounded-md mt-1' />
        <div className='flex-1 flex flex-col gap-2'>
        <h1 className='text-gray-500 text-xl flex-1 max-w-[120px] truncate'>{item.produto}</h1>
          <p className='leading-5 text-gray-500 mb-8 lg:mb-4'>{item.descricao}</p>
         <div className='flex justify-between'>
         <p className='font-semibold text-xl pr-2 absolute right-0 top-0'>R$ {Number(item.preco).toFixed(2)}</p>
         <button className='bg-red-500 p-2 absolute bottom-2 text-white rounded-md right-0 lg:right-2 mt-4 mr-1'><FaPlus /></button>
         </div>
        </div>
      </div>
  )
}

export default Produto
