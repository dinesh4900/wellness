import express from 'express';
import { v4 as uuidv4 } from 'uuid';



const router = express.Router();

let users=[]

// getting
router.get('/', (req,res) => {

    console.log(users);


    res.send(users);
});

//posting
router.post('/', (req,res) => {
    const user = req.body;


    users.push({...user, id: uuidv4()})

    res.send(`user with username ${user.firstname} added to database!`);
});

// getting single users data
router.get('/:id', (req, res) => {
    const{id} = req.params;

    const foundUser = users.find((user) => user.id === id);

    res.send(foundUser);
})

//deleting
router.delete('/:id', (req,res)=>{
    const{id} = req.params;

    users = users.filter((user) => user.id  != id);

    res.send(`user with id ${id} deleted`);
})

//editing
router.patch('/:id', (req, res) => {
    const{id} = req.params;
    const {firstname, lastname, age} = req.body;
    const user = users.find((user) => user.id ===id);

    if(firstname){
        user.firstname = firstname;
    }

    if(lastname){
        user.lastname =lastname;
    }

    if(age){
        user.age = age;
    }

    res.send(`user with id ${id} has been updated`)
})

export default router;
