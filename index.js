const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
//creer une application express
//
const PORT = process.env.PORT||3000
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

///////////////////////////////////
mongoose.connect('mongodb://localhost/lists1')
const listSchema=mongoose.Schema({
    item: String 
})

const List = mongoose.model('List',listSchema)
///////////////////
const router = express.Router()
router.route('/')
    .get(function(req,res){
        List.find(function(err,lists){
            if(err)
                res.send(err)
            res.send(lists)
        })
    })
    .post(function(req,res){
        var list = new List()
        list.item = req.body.item
        list.save(function(err){
            if(err){
                res.send(err)
            }
            res.send({message: 'element cree'})
        })
    })
router.route('/:item_id')
    .delete(function(req,res){
        List.remove({_id:req.params.item_id},function(err){
            if(err){
                res.send(err)
            }
            res.send({message:'Item deleted'})
        })
    })
    .get(function(req,res){
        List.findOne({_id : req.params.item_id},function(err,item){
            if(err)
                res.send(err)
            res.send(item)
        })
    })
app.use('/api',router)

// app.get('/',(req,res)=>{
//     res.send('hello world!')
// })

app.listen(PORT,()=>
{
    console.log(`serveur demaree : http://localhost:${PORT} `)
} )