 'use client'
 import React, { useRef, useState } from 'react'
 import {
   DadosContext
 } from './contexts/DadosContext'
 import Produto from '@/components/Produto'
 import {
   FaPlus
 } from "react-icons/fa6";
 import {
   FaMinus
 } from "react-icons/fa6";
 import {
   FaShoppingCart
 } from "react-icons/fa";
 import { IoIosArrowBack } from "react-icons/io";
 import { FaWhatsapp } from "react-icons/fa";
import Footer from '@/components/Footer';


 const page = () => {
     const infos = React.useContext(DadosContext)
     const [qtd, setQtd] = React.useState(1)
     const [observacao, setObservacao] = React.useState("")
     const [cart, setOpenCart] = React.useState(false)
     const [total,setTotal]=React.useState(0)
     const [metodoEntrega, setMetodoEntrega] = useState('');
     const [nome,setNome]=React.useState("")
     const [formaPagamento,setFormaPagamento] = useState('');
     const [rua,setRua]=React.useState("")
     const [bairro,setBairro]=React.useState("")
     const [numero,setNumero]=React.useState("")
     const [complemento,setComplemento]=React.useState("")
     const [form,setOpenForm]=React.useState(false)
     const [referencia,setReferencia]=React.useState("")
     const [troco,setTroco]=React.useState("")
     const [checkout,setCheckout]=React.useState(false)
     const [erro,setErro]=React.useState("")
     const refErro = useRef("")

     const handleOptionChange = (event) => {
      setMetodoEntrega(event.target.value);
    }; 

    const handleOptionPagamento = (event) => {
      if (event.target.name === 'metodoEntrega') {
        setMetodoEntrega(event.target.value);
      } else if (event.target.name === 'formaPagamento') {
        setFormaPagamento(event.target.value);
      }
    };

     const sanduiches = infos.dados.filter(item => item.categoria === "sanduiches")
     const omeletes = infos.dados.filter(item => item.categoria === "omeletes")
     const porcoes = infos.dados.filter(item => item.categoria === "porcoes")
     const bebidas = infos.dados.filter(item => item.categoria === "bebidas")
     const bomboniere = infos.dados.filter(item => item.categoria === "bomboniere")

     function closeModal(e) {
       if (e.target.id === "modalProduto") {
         infos.setOpenModalItens(false)
       }
     }

     function FecharModal() {
       infos.setOpenModalItens(false)
       setObservacao("")
       setQtd(1)
     }

     function conferirPedido(){
        setCheckout(true)
     }

     function closeCart(e){
      if(e.target.id==="carrinho"){
        setOpenCart(false)
      }
     }


     function conferirPedidoDelivery(){
      clearTimeout(refErro.current)

      if(!nome){
        setErro("seu nome é obrigatório")
      }

      else if(!formaPagamento){
        setErro("escolha uma forma de pagamento")
      }

      else if(formaPagamento==="dinheiro" && troco==="" ){
        alert("SE VOCÊ NAO PRECISA DE TROCO, COLOQUE 0, CASO PRECISE, COLOQUE O VALOR EXEMPLO: 50")
      }

      else if(!rua){
        setErro("o nome da rua é obrigatório")
      }

      else if(!numero){
        setErro("o número da sua casa é obrigatório")
      }

      else if(!bairro){
        setErro("o nome do bairro é obrigatório")
      }

      else{
        setCheckout(true)
      }
    
          refErro.current = setTimeout(()=>{
            setErro("")
          },1500)
     }


     function addItemCart() {
       const itemIndex = infos.cart.findIndex(item => item.id === infos.item.id);

       if (itemIndex !== -1) { // Se o item já estiver no carrinho
         const updatedCart = [...infos.cart];
         updatedCart[itemIndex].quantidade += qtd; // Aumentar a quantidade do item
         if (updatedCart[itemIndex].quantidade <= 0) { // Se a quantidade se tornar 0 ou negativa, remover o item do carrinho
           updatedCart.splice(itemIndex, 1);
         }
         infos.setCart(updatedCart);
       } else { // Se o item não estiver no carrinho, adicioná-lo
         const itemToCart = {
           id: infos.item.id,
           produto: infos.item.produto,
           preco: infos.item.preco,
           observacao,
           quantidade: qtd
         };
         infos.setCart([...infos.cart, itemToCart]);
       }

       infos.setOpenModalItens(false);
       setObservacao("");
       setQtd(1);
     }

     function removeItemCart(itemId) {
  const updatedCart = infos.cart.map(item => {
    if (item.id === itemId) {
      if (item.quantidade > 1) {
        return { ...item, quantidade: item.quantidade - 1 };
      } else {
        return null; // Indica que o item deve ser removido do carrinho
      }
    }
    return item;
  });

  infos.setCart(updatedCart.filter(item => item !== null));
}

function closeModalCheckou(e){
  if(e.target.id==="checkout"){
    setCheckout(false)
  }
}



function verificaStorage(){

  const dados =JSON.parse(localStorage.getItem("dados")) || []

  if(dados){
    setNome(dados.nome)
    setBairro(dados.bairro)
    setNumero(dados.numero)
    setRua(dados.rua)
    {dados.complemento ? setComplemento(dados.complemento):setComplemento("")}
    {dados.referencia ? setReferencia(dados.referencia):setComplemento("")}
  }

}


     React.useEffect(() => {
      verificaStorage()
      const valor = infos.cart.reduce((acc,item)=>acc + Number(item.preco) * item.quantidade , 0)
      setTotal(valor)
     }, [infos.cart])



     function aumentarQuantidade() {
       setQtd(qtd + 1)
     }

     function diminuirQuantidade() {
       if (qtd > 1) {
         setQtd(qtd - 1)
       }
     }

     function finalizarEntrega(){
      const hora = new Date().getHours()
      const minutos = new Date().getMinutes()

      const horaCerta = `⏰${hora > 10 ? `${hora}`:`0${hora}`}`+":"+`${minutos > 10 ? `${minutos}`:`0${minutos}`} `
 
const msg = `📝*Pedido:*
`
const dadosCliente= `
*Cliente:* ${nome}
*Horário do pedido*:${horaCerta}
*Tipo de serviço:* Delivery
*Rua*: ${rua}
*Número*: ${numero}
*Bairro*: ${bairro}
${complemento ? `*Complemento*: ${complemento}`: `` }
${referencia ? `*Ponto de referência*: ${referencia}`: `` }
*Forma de pagamento*: ${formaPagamento}
${troco ? `*Troco para*: ${troco}`:""}
----------------------------------
`

const custos=`
💰*Custos*
*Preço dos Produtos:* R$ ${Number(total).toFixed(2)}
*Preço da Entrega:* R$ 3.00
*Total a pagar:* R$ ${Number(total + 3).toFixed(2)}

👆 Após enviar o pedido, aguarde que já iremos lhe atender.
`

      const cartItens= infos.cart.map((item)=>{
        return (
`( ${item.quantidade}x ) - ${item.produto} 
${item.observacao}
----------------------------------
`)})

const dadosClient=encodeURIComponent(dadosCliente)
const msgResumo= encodeURIComponent(msg)
const precos= encodeURIComponent(custos)
const carrinho = encodeURIComponent(cartItens)
const phone = "31992311170"

const dados= {
  nome,
  rua,
  bairro,
  numero,
  complemento,
  referencia
}

localStorage.setItem("dados", JSON.stringify(dados))

      window.open(`https://wa.me/${phone}?text=${dadosClient} ${msgResumo} ${carrinho} ${precos}`)

      setTimeout(()=>{
        setCheckout(false)
        infos.cart([])
        setOpenForm(false)
      },10000)

     }





     function finalizaBuscar(){
      const hora = new Date().getHours()
      const minutos = new Date().getMinutes()

      const horaCerta = `⏰${hora > 10 ? `${hora}`:`0${hora}`}`+":"+`${minutos > 10 ? `${minutos}`:`0${minutos}`} `
 
const msg = `📝*Pedido:*
`
const dadosCliente= `
*Cliente:* ${nome}
*Horário do pedido*:${horaCerta}
*Tipo de serviço:* Retirar na Loja
----------------------------------
`

const custos=`
💰*Custos*
*Preço dos Produtos:* R$ ${Number(total).toFixed(2)}
*Preço da Entrega:* R$ 0
*Total a pagar:* R$ ${Number(total).toFixed(2)}

👆 Após enviar o pedido, aguarde que já iremos lhe atender.
`

      const cartItens= infos.cart.map((item)=>{
        return (
`( ${item.quantidade}x ) - ${item.produto} 
${item.observacao}
----------------------------------
`)})

const dadosClient=encodeURIComponent(dadosCliente)
const msgResumo= encodeURIComponent(msg)
const precos= encodeURIComponent(custos)
const carrinho = encodeURIComponent(cartItens)
const phone = "31992311170"


      window.open(`https://wa.me/${phone}?text=${dadosClient} ${msgResumo} ${carrinho} ${precos}`)


     }

     return ( 
      <div>
      <div className='max-w-6xl mx-auto my-2 mb-6 p-4  right-0 left-0 mt-[150px]'>
{erro && <div className='fixed inset-0 flex justify-center items-start z-50 h-20  p-2'><p className='top-2 text-red-600 bg-white px-6 py-2 mt-4 w-full max-w-sm border border-red-600 rounded-md text-center'>{erro}</p></div>}
  <h1 className='my-6 text-2xl font-bold text-gray-500'>Sanduíches</h1>
  <section className='grid grid-cols-1 gap-6 md:grid-cols-2'>{
    sanduiches.map((item) => (
      <Produto item={item} id="sanduiches" />
    ))
  }</section>

  <h1 className='my-6 text-2xl font-bold text-gray-500'>Omeletes</h1>
  <section className='grid grid-cols-1 gap-6 md:grid-cols-2'>{
    omeletes.map((item) => (
      <Produto item={item} id="omeletes" />
    ))
  }</section>

  <h1 className='my-6 text-2xl font-bold text-gray-500'>Porções</h1>
  <section className='grid grid-cols-1 gap-6 md:grid-cols-2'>{
    porcoes.map((item) => (
      <Produto item={item} id="porcoes" />
    ))
  }</section>

  <h1 className='my-6 text-2xl font-bold text-gray-500'>Bebidas</h1>
  <section className='grid grid-cols-1 gap-6 md:grid-cols-2'>{
    bebidas.map((item) => (
      <Produto item={item} id="bebidas" />
    ))
  }</section>

  <h1 className='my-6 text-2xl font-bold text-gray-500 mb-[40px]'>Bomboniere</h1>
  <section className='grid grid-cols-1 gap-6 md:grid-cols-2'>{
    bomboniere.map((item) => (
      <Produto item={item} id="bomboniere" />
    ))
  }</section>

  {/* Início do modal produto */}
  {infos.modalItens && 
    <div className='flex inset-0 fixed bg-black bg-opacity-20 backdrop-blur-sm justify-center items-start lg:items-center p-4 z-30 h-screen' id='modalProduto' onClick={closeModal}>
      <div className={`max-w-sm w-full ${infos.item.categoria==="bebidas" ? `lg:max-w-3xl`:`lg:max-w-4xl`} ${infos.item.categoria==="bebidas" ? `lg:max-h-[300px]`:`lg:max-h-[800px]`} overflow-y-auto bg-white rounded-md lg:h-auto flex flex-col lg:flex-row gap-4 overflow-hidden relative`}>

      <img src={infos.item.urlImage} alt={`imagem do ${infos.item.nome}`} className='lg:max-w-[300px] '/>

    <div className='flex flex-col '>
      <div className='w-screen max-w-sm lg:max-w-md flex justify-between border-b py-2 px-2'>
        <p className=' font-bold'>{infos.item.produto}</p>
        <button className='mr-2  text-white bg-red-600 rounded-full w-6 h-6 flex items-center justify-center absolute top-2 right-0 lg:right-4' onClick={()=>infos.setOpenModalItens(false)}>X</button>
      </div>

    <div className=' flex-1 flex flex-col gap-2 mt-4 p-2'>
        <p>{infos.item.descricao}</p>
      <p className='font-semibold'>R$ {infos.item.preco}</p>
      {infos.item.categoria!=="bebidas" && infos.item.categoria!=="bomboniere" && <div>
      <p>Comentários (opcional)</p>
      <textarea cols="30" rows="3" value={observacao} onChange={({target})=>setObservacao(target.value)} className='border bg-gray-100 w-full rounded-md mr-2 p-2' placeholder='ex: x tudo sem salada!'></textarea>
      </div>}
    </div>

    <div className='flex py-2 gap-4 px-2 mb-2  lg:flex-row items-center'>
      <button className='flex items-center gap-4 py-2 px-6 rounded-md border'><span onClick={diminuirQuantidade}><FaMinus /></span><span className='font-bold'>{qtd}</span><span className='text-red-600' onClick={aumentarQuantidade}><FaPlus /></span></button>
      <button className='bg-red-600 px-2 lg:px-10 py-2 rounded-md text-white flex-1 lg:mr-4' onClick={addItemCart}>Adicionar R$ {Number(qtd * Number(infos.item.preco).toFixed(2)).toFixed(2)}</button>
    </div>

    </div>

      </div>

    </div>
  }
  {/* Final do modal produto */}

  {/* Início do modal opencart */}
  {infos.cart.length > 0 && <div className='fixed  bottom-0 left-0 right-0 flex items-end justify-center cursor-pointer text-white mb-2 mt-10 '>
    <div className='max-w-sm w-screen p-4 rounded-md bg-green-600 flex justify-center gap-10 items-center' onClick={() => setOpenCart(!cart)}>
      <p>({infos.cart.length} {infos.cart.length > 1 ? "itens":"item"})</p>
      <p className='flex items-center gap-4'><FaShoppingCart className='text-2xl' />ver carrinho</p>
    </div>
  </div>}
  {/* Final do modal opencart */}

  {/* Início do carrinho */}
  {cart && 
    <div className='fixed inset-0 flex bg-opacity-35  bg-black backdrop-blur-sm flex-col cursor-pointer border-l animaCart z-10' id='carrinho' onClick={closeCart}>

      <div className='w-full max-w-lg absolute right-0 border-l border-b bg-white'>
      <div className='px-4 border-b py-2 flex flex-col'>
        <p className='font-bold text-xl text-center'>Meu Carrinho</p>
        <p className='font-semibold'>Total R$ {Number(total).toFixed(2)}</p>
      </div>

      {infos.cart.length < 1 && <img src="/images/cesta.png" alt="imagem carrinho vazio" className='max-w-[300px] mx-auto mt-4'/> }
      <div className='flex-1 p-4 max-h-[700px] overflow-y-scroll mt-4 flex flex-col gap-4'>{
        infos.cart.map((item) => (
          <div className='flex justify-around items-center border-b pb-4' key={item.id}>
            <div>
              <p className='max-w-[150px] overflow-hidden truncate flex-1'><span className='text-red-500 font-semibold'>({item.quantidade})</span> - {item.produto}</p>{
                item.observacao && <p className='flex flex-col'><span className='font-semibold'>observação:</span><span>{item.observacao}</span></p>
              }
            </div>
            <p>R${Number(item.quantidade * Number(item.preco)).toFixed(2)}</p>
            <button className='text-red-500 font-semibold' onClick={() => removeItemCart(item.id)}>remover</button>
          </div>
        ))
      }</div>
      
      {infos.cart.length > 0 && <div className='p-4 border-t flex justify-between items-center flex-wrap'>
        <button onClick={()=>setOpenCart(false)}>Voltar</button>
        <button className='px-12 py-2 bg-green-600 text-white rounded-md' onClick={()=>setOpenForm(true)}>Continuar</button>
      </div> }
      </div>

    </div>
  }
  {/* Final do carrinho */}

  {/* inicio do form de informaçoes do cliente */}

  {form && <div className='fixed inset-0 bg-black flex backdrop-blur-sm bg-opacity-30 w-full justify-center items-start text-gray-600 z-40'>
    
    <form className='p-4 border-t animaForm w-full max-w-sm bg-white mt-10 rounded-md max-h-[600px] lg:max-h-[800px] overflow-y-scroll'>
    <div className='flex justify-between items-center border-b pb-4'>
    <IoIosArrowBack className='cursor-pointer' onClick={()=>setOpenForm(false)}/>
  <p className='font-bold'>Preencha as informações</p>
  <p className='text-red-600 font-bold text-xl cursor-pointer animate-pulse' onClick={()=>setOpenForm(false)}>X</p>
</div>
    <div className='flex flex-col gap-1 mt-2'>
      <label htmlFor="nome" className='font-semibold'>Nome</label>
      <input type="text" value={nome} onChange={({target})=>setNome(target.value)} className='bg-gray-100 border py-2 rounded-md pl-2' placeholder='Digite seu nome' />
    </div>
  <div className='mt-4'>
  <p className='font-semibold'>Selecione o método de entrega:</p>
  <div className='flex gap-4'>
  <label className='flex gap-1 items-center'>
    <input
      type="radio"
      name="metodoEntrega"
      value="buscar"
      checked={metodoEntrega === "buscar"}
      onChange={handleOptionChange}
    />
    <p>Buscar</p>
  </label>
  <label className='flex gap-1 items-center'>
    <input
      type="radio"
      name="metodoEntrega"
      value="delivery"
      checked={metodoEntrega === "delivery"}
      onChange={handleOptionChange}
    />
    <p>Delivery</p>
  </label>
  </div>
</div>

{metodoEntrega==="buscar" && nome!=="" && <div className='px-10 py-2 rounded-md bg-green-600 mt-4 text-white w-full max-w-[200px] cursor-pointer' onClick={conferirPedido}>Conferir pedido</div> }



{metodoEntrega==="delivery" && <div className='mt-4'>
<p className='font-semibold'>Selecione a forma de pagamento:</p>
  <div className='flex gap-4'>
  <label className='flex gap-1 items-center'>
    <input
      type="radio"
      name="formaPagamento"
      value="dinheiro"
      checked={formaPagamento === "dinheiro"}
      onChange={handleOptionPagamento}
    />
    <p>Dinheiro</p>
  </label>
  <label className='flex gap-1 items-center'>
    <input
      type="radio"
      name="formaPagamento"
      value="pix"
      checked={formaPagamento === "pix"}
      onChange={handleOptionPagamento}
    />
    <p>Pix</p>
  </label>
  <label className='flex gap-1 items-center'>
    <input
      type="radio"
      name="formaPagamento"
      value="cartao"
      checked={formaPagamento === "cartao"}
      onChange={handleOptionPagamento}
    />
    <p>Cartão</p>
  </label>
  </div>

  {formaPagamento==="dinheiro" && <div className='flex flex-col gap-1 mt-4' >
<label htmlFor="bairro" className='font-semibold'>Precisa de troco pra quanto ?</label>
<input type="number" value={troco} onChange={({target})=>setTroco(target.value)} className='border py-2 rounded-md bg-gray-100 pl-2' placeholder='50'/>
</div> }

<div className='flex gap-4'>
<div className='flex flex-col gap-1 mt-4 flex-1'>
<label htmlFor="rua" className='font-semibold'>Rua</label>
<input type="text" value={rua} onChange={({target})=>setRua(target.value)} className='border py-2 rounded-md bg-gray-100 pl-2' placeholder='Nome da rua'/>
</div>

<div className='flex flex-col gap-1 mt-4 max-w-[100px]'>
<label htmlFor="numero" className='font-semibold'>Número</label>
<input type="text" value={numero} onChange={({target})=>setNumero(target.value)} className='border py-2 rounded-md bg-gray-100'/>
</div>
</div>

<div className='flex flex-col gap-1 mt-4' >
<label htmlFor="bairro" className='font-semibold'>Bairro</label>
<input type="text" value={bairro} onChange={({target})=>setBairro(target.value)} className='border py-2 rounded-md bg-gray-100 pl-2' placeholder='nome do bairro'/>
</div>

<div className='flex flex-col gap-1 mt-4'>
<label htmlFor="complemento" className='font-semibold'>Complemento (opcional)</label>
<input type="text" value={complemento} onChange={({target})=>setComplemento(target.value)} className='border py-2 rounded-md pl-2 bg-gray-100'placeholder='ex: casa, prédio, loja'/>
</div>

<div className='flex flex-col gap-1 mt-4'>
<label htmlFor="complemento" className='font-semibold'>Ponto de referência (opcional)</label>
<input type="text" value={referencia} onChange={({target})=>setReferencia(target.value)} className='border py-2 rounded-md pl-2 bg-gray-100'placeholder='perto da farmácia'/>
</div>

<div className='flex justify-between mt-4'>
{metodoEntrega==="buscar" && <div className='px-10 py-2 bg-green-600 rounded-md text-white cursor-pointer' onClick={conferirPedido}>Conferir pedido</div>}
{metodoEntrega==="delivery" && <div className='px-10 py-2 bg-green-600 rounded-md text-white cursor-pointer' onClick={conferirPedidoDelivery}>Conferir pedido</div>}
<p className='border px-6 py-2 rounded-md shadow-sm cursor-pointer' onClick={()=>setOpenForm(false)}>← Voltar</p>
</div>

</div>}
  </form>
  </div>  }

  {/* final do form de informaçoes do cliente */}

  {/* inicio do modal conferir pedido */}

{ checkout && <div className='inset-0 fixed bg-black bg-opacity-30 flex backdrop-blur-sm justify-center items-start p-2 z-50' id='checkout'>
  <div className='w-full max-w-sm flex flex-col bg-white mt-10 rounded-md p-2'>
  <div className='flex justify-between w-full py-2 mb-2'>
    <p className='font-semibold'>Dados do seu pedido</p>
    <button className='text-red-600 font-bold cursor-pointer text-xl' onClick={()=>setCheckout(false)}>X</button>
  </div>
  <div className='py-2 max-h-[500px] overflow-y-scroll border-2 p-2 my-2 border-dotted border-green-600'>
  <p><strong>Cliente</strong> : {nome}</p>
  {rua && <p><strong>Rua :</strong> {rua}</p> }
  { metodoEntrega && <p><strong>Tipo de serviço:</strong> {metodoEntrega}</p> }
  {numero && <p><strong>Número :</strong> {numero}</p> }
  {bairro && <p><strong>Bairro :</strong> {bairro}</p> }
  {complemento && <p><strong>Complemento :</strong> {complemento}</p> }
  {referencia && <p><strong>Referência :</strong> {referencia}</p> }
  {formaPagamento && <p><strong>Forma de pagamento :</strong> {formaPagamento}</p> }
  {troco && <p className='pb-2'><strong>Troco para :</strong> {troco}</p> }
  <br />
  <p className='font-bold'>Resumo do pedido: </p>
    {infos.cart.map((item)=> (
      <div key={item.id} className='border-b py-2 '>
           <p> (<span className='text-red-600 font-semibold'>{item.quantidade} </span>) - <span>{item.produto}</span> </p>
           {item.observacao && <p><strong>Observação: </strong>{item.observacao}</p> }
       </div>
      ) )}
      <div>
        <div className='flex justify-between'>
        <p>Subtotal</p>
        <p className='font-bold'>R$ {Number(total).toFixed(2)}</p>
        </div>
      </div>
  </div>
<div className='pt-2 flex flex-col items-center justify-center'>
  <h1 className='py-4 text-2xl text-gray-600 font-semibold'>Quase pronto...</h1>
  <div className='rounded-md border p-2 w-full flex flex-col items-center justify-center border-yellow-600'>
    <p className='text-gray-600 mt-1 font-semibold'>AÇÂO NECESSÁRIA: 👇</p>
    <p className='py-2 mb-2 text-gray-500 text-[18px]'>Enviar confirmação pelo Whatsapp</p>
  {metodoEntrega==="buscar" && <button className='bg-green-600 px-6 py-3 rounded-md mb-2 font-bold w-full flex items-center justify-center text-white gap-2' onClick={finalizaBuscar}>
  <FaWhatsapp size={24}/> Enviar
  </button>}
  {metodoEntrega==="delivery" && <button className='bg-green-600 px-6 py-3 rounded-md mb-2 font-bold w-full flex items-center justify-center text-white gap-2' onClick={finalizarEntrega}>
  <FaWhatsapp size={24}/> Enviar
  </button>}
  </div>
</div>
   
  </div>
</div> }

  {/* final do modal conferir pedido */}
</div>
<Footer /> 
      </div>

               )
           }

           export default page