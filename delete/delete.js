//import modules
const express = require('express')
let mongodb = require('mongodb')
//import url
const url = require('../url')
//create mongo client
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//create rest api
router.delete("/", (req, res) => {
    let obj={
        p_id:req.body.p_id
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection')
        else {
            let db = conn.db('nodedb')
            db.collection('products').deleteOne(obj,(err, result) => {
                if (err)
                    res.json({'delete':'Error'+err})
                else {
                    if(result.deletedCount!=0){
                        console.log("Data Deleted")
                        res.json({'delete':"success"})
                    }
                    else{
                        console.log("Data not deleted")
                        res.json({'delete':"Record not found"})
                    }
                    conn.close()
                }
            })
        }
    })
})


//export router
module.exports = router
