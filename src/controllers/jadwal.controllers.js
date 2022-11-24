const { sequelize, Jadwal, Users } = require('../models')
const { getAttributes } = require('../models/users')

const getJadwal = async(req, res, next) => {
    try {
        const resJadwal = await Jadwal.findAll()
        if (resJadwal) {
            return res.status(200).json({
                message: 'success get jadwal',
                data: resJadwal,
            })
        } else {
            throw { code: 404, message: 'Jadwal not found' }
        }
    } catch (error) {
        next(error)
    }
}

const postJadwal = async(req, res, next) => {
    
    try {
        const { ...createJadwal } = req.body
        const findMyUser = await Users.findAll({
            where: {
                id_users: req.id_users
            }
          })

          if(findMyUser.length == 0) {
            return res.status(404).json({
                message: 'User not exist'
            })
          }
    
    function getDatesInRange(startDate, endDate) {
        const date = new Date(startDate.getTime());
      
        
        const dates = [];

        while (date <= endDate) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return dates;
        }
      const d1 = new Date('2022-11-18');
      const d2 = new Date('2022-12-24');
      
    //   console.log(getDatesInRange(d1, d2));

        await sequelize.transaction(async(trx) => {
          insertJadwal = await Jadwal.create({
                ...createJadwal,
                id_users: req.id_users,
                date: getDatesInRange(d1,d2)
            }, {
                transaction: trx

            })
        })   

        return res.status(200).json({
            message: "Success create jadwal",
        })
        
    } catch (error) {
        next(error)
    }
}

const getJadwalId = async(req, res, next) => {
    const { id } = req.params

    try {
        const resJadwal = await Jadwal.findOne({ where: { id: id } })
        if (resJadwal) {
            return res.status(200).json({
                message: `success get jadwal by id ${id}`,
                data: resJadwal,
            })
        } else {
            throw { code: 404, message: 'Jadwal not found' }
        }
    } catch (error) {
        next(error)
    }
}

const updateJadwal = async(req, res, next) => {
    const { id } = req.params

    try {
        const findJadwal = await Jadwal.findOne({
            where: { id: id },
        })

        if (!findJadwal) {
            return res.status(404).json({
                message: `Jadwal not found`,
            })
        }

        const jadwalUpdate = await Jadwal.update(req.body, {
            where: { id: id },
        })

        if (jadwalUpdate) {
            return res.status(200).json({
                message: `success update jadwal by id ${id}`,
            })
        } else {
            return res.status(404).json({
                message: `update jadwal failed`,
            })
        }
    } catch (error) {
        next(error)
    }
}

const deleteJadwal = async(req, res, next) => {
    const { id } = req.params

    try {
        const jadwalDelete = await Jadwal.destroy({
            where: {
                id: id,
            },
        })

        if (jadwalDelete) {
            return res.status(200).json({
                message: `success delete jadwal by id ${id}`,
            })
        } else {
            next(req)
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    postJadwal,
    getJadwal,
    getJadwalId,
    updateJadwal,
    deleteJadwal,
}