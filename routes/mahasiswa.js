// (5) Buat router Mahasiswa
const express = require('express')
const router = express.Router() 
const Mahasiswa = require('../models/Mahasiswa')

// Import verify token
const verifyToken = require('../config/verifyToken')

// Create 
router.post('/', async(req, res) => {
    // tampung input mahasiswa 
    const mahasiswaPost = new Mahasiswa({
        nama: req.body.nama,
        alamat: req.body.alamat
    })

    try {
        // simpan data 
        const mahasiswa = await mahasiswaPost.save()
        // response
        res.json(mahasiswa)
    } catch (error) {
        res.json({message: error})
    }
})

// Read (method GET) + verifyToken
router.get('/',verifyToken, async(req, res) => {
    try {
        const mahasiswa = await Mahasiswa.find()
        res.json(mahasiswa)
    } catch (error) {
        res.json({message: error})
    }
})


// Update (method PUT)
router.put('/:mahasiswaId', async(req, res) => {
    // tampung input mahasiswa 
    const data = {
        nama: req.body.nama,
        alamat: req.body.alamat
    }

    try {
        // update data 
        const mahasiswa = await Mahasiswa.updateOne({_id: req.params.mahasiswaId}, data)
        // response
        res.json(mahasiswa)
    } catch (error) {
        res.json({message: error})
    }
})

// Delete (method DELETE)
router.delete('/:mahasiswaId', async(req, res) => {
    try {
        // delete data 
        const mahasiswa = await Mahasiswa.deleteOne({_id: req.params.mahasiswaId})
        // response
        res.json(mahasiswa)
    } catch (error) {
        res.json({message: error})
    }
})


module.exports = router