import { setCookie, parseCookies } from "nookies"
import axios from "axios"
import React, { useState } from "react"
import Modal from "react-modal"





function RegisterBox() {
    const [usernameReg, setUsernameReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [IDReg, setIDReg] = useState("")
    const [isModalOpen, setModalOpen] = useState(false)
    const [response, setResponse] = useState('')

    function contactUs() {
      setResponse(<a href="wa.me/+5547991458053" target="_blank" rel="noopener noreferrer">Contato</a>)
      ModalOpen()
    }

    const register = () => {
      try {
        const cookie = document.cookie
        if (cookie != ""){
          setResponse("Você já se registrou")
          ModalOpen()
          return
        }
      }catch{
      }
      try {
        axios.post('api/api', {user: usernameReg, pass: passwordReg, id: IDReg}).then(res => {
          if(res.data.msg == "Registrado!"){
            setCookie(null, "cookie", `${usernameReg}`,{
            maxAge: 86400 * 30,
            path: '/'})
          }
          setResponse(res.data.msg)
        })
      }catch(error){
        console.log(error)
      }
      ModalOpen()
    }

    function ModalOpen(){
      setModalOpen(true)
    }

    function ModalClose(){
      setModalOpen(false)
    }

    return (

      <div className="App"> 
        <div className="formBox">
          <h1 className="welcome">Bem-Vindo</h1>
          <div className='loginInputs'>
            <div className="user">
              <h3>Usuário</h3>
              <input type="text" placeholder='Usuário' onChange={(e) => {setUsernameReg(e.target.value);}} />
            </div>
            <div className='pass'>
              <h3>Senha</h3>
              <input type="password" placeholder='Senha' onChange={(e) => {setPasswordReg(e.target.value);}} />
            </div> 
            <div className="school-id">
              <h3>ID</h3>
              <input type="text" placeholder='ID' onChange={(e) => {setIDReg(e.target.value);}} />
            </div>
          </div>
          <button onClick={register} name='buttonSubmit' value="">Registrar</button>
          <Modal isOpen={isModalOpen} onRequestClose={ModalClose} overlayClassName="Overlay" >
            {"( i ) "}{response}{}
            <br></br>
            <button className="close" onClick={ModalClose}>Fechar</button>
          </Modal>
          <div className="Copyright" onClick={contactUs}>
            <h5>cauabeisola™</h5>
          </div>
        </div>
      </div>
    );
  }
  
  export default RegisterBox