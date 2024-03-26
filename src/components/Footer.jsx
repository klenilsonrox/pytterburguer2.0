import React from 'react'
const ano = new Date().getFullYear()

const Footer = () => {
  return (
    <footer className=' flex items-center flex-col bg-white justify-center py-8 mt-10 w-full z-30 text-gray-500'>
      <p>Pytter Burguer {ano} todos os direitos reservados</p>
      <div className='flex gap-2'>
        <p>Desenvolvido por</p>
        <a href="" className='text-blue-600 underline'>Klenilson Dev</a>
      </div>
    </footer>
  )
}

export default Footer
