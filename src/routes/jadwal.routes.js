const router = require('express').Router()
const {
    postJadwal,
    getJadwal,
    getJadwalId,
    updateJadwal,
    deleteJadwal,
} = require('../../src/controllers/jadwal.controllers')

router.get('/',  getJadwal)
router.get('/:id', getJadwalId)
router.post('/', postJadwal)
router.put('/:id', updateJadwal)
router.delete('/:id', deleteJadwal)

module.exports = router
