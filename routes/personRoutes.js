const router = require('express').Router()
const Person = require('../models/Person');
const bcrypt = require('bcrypt');

//rotas da API




//criaçao de dados/// Create
router.post('/',async (req, res) => { 

    const{ name, email, password, confirmpassword } = req.body
    
    if(!name){
    res.status(422).json({error: 'o nome é obrigatorio!' })
    return
    }
        if(!password){
            res.status(422).json({error: 'A senha é obrigatoria!' })
            return
            }


            if(password !== confirmpassword ){
                res.status(422).json({error: 'As senhas não coincide' })
                return
                }

            // check se o usuario exists
            const userExists = await Person.findOne({ email : email});

            if (userExists){
                res.status(422).json({error: ' por favor, utilize outro e-mail'}) 
            };

            // criar password
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt );

            //
    
    const person = new Person ({
      
     
        email,
        name,
        password: passwordHash,
       
    })
    try{
        //criando os dados
        await Person.save()
    
        res.status(201).json({message: 'pessoa inserida com sucesso!'})
    
    
    }catch (error){
        res.status(500).json({error: error})
    }
    
    
    
    })












    // Read// leitura de dados  


    router.get('/',async (req, res) => {

        try{
          
          const people = await Person.find() 
        res.status(200).json(people)
            
        
        
        }catch (error){
            res.status(500).json({error: error})
        }
        
        

        
    })
    
router.get('/:id', async (req, res ) => {

                // extrair o dado da requisiçao, pela url
    const id = req.params.id
              

    try{
          
   const person = await Person.findOne({_id: id})

if(!person){

    res.status(422).json({message: 'O usuario nao foi encontrado!'})
    return
}



   res.status(200).json(person)
      
      
      }catch (error){
          res.status(500).json({ error: error  })
      }
      

})
// Update - atualizaçao de dados(PUT , Patch)

router.patch('/:id', async (req, res) =>{
   
    const id = req.params.id
    console.log(id);

    const { name, email, } = req.body

    const person = {
        name,
        email,
       
    }

    console.log(person);


    try{

        console.log(Person);

        const UpdatePerson = await Person.updateOne({_id : id}, person);
       
       

        if(UpdatePerson.matchedCount === 0){

            res.status(422).json({message: 'O usuario nao foi encontrado!!'})
            return

        }

        res.status(200).json(person)

    }catch(error){

        res.status(500).json({error: error})
    }


})
// Delete


router.delete('/:id' , async (req, res) => {

const id = req.params.id

const person = await Person.findOne({_id: id})

if(!person){

    res.status(422).json({message: 'O usuario nao foi encontrado!'})
    return
}

try{

    await Person.deleteOne({_id: id})
        res.status(200).json({message: 'O usuario Foi removido com sucesso'})

}catch(error) { 

res.status(500).json({error: error})
}


})



module.exports = router