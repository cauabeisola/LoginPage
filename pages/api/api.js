import * as firebase from "firebase/app"
import * as firestore from "firebase/firestore"


async function App(req, res) {
    const userData = req.body.user
    const passData = req.body.pass
    const idData = req.body.id
    const config = {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
    }
  
    const db = firestore.getFirestore(firebase.initializeApp(config))
  
    const usersCollectionRef = firestore.collection(db, "users")

    const rawdata = await firestore.getDocs(usersCollectionRef)
    
    const data = rawdata.docs.map((doc) => ({...doc.data(), id: doc.id}))

    if (userData == "" || passData == "" || idData == ""){
        return res.status(200).json({msg: "Campos vazios"})
    }
    try {
        var thereIs = false
        data.map(user => {
            if (user.user == userData) {
                thereIs = true
            }
        })
        if (thereIs == false){
            firestore.addDoc(usersCollectionRef, {user: userData, pass: passData, id: idData})
            return res.status(200).json({msg: "Registrado!", data: data})
        }else{
            return res.status(200).json({msg: "Usuário existente"})
        }
    } catch (error) {
        return res.status(500).json({msg: "Algo deu errado", data: data})
    }
}

export default App