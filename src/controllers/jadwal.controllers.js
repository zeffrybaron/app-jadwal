const { sequelize, Jadwal, Users } = require('../models')


const postJadwal = async(req, res, next) => {
    try {
        const {
            id_users,
            day,
            time_start,
            time_finish,
            quota,
            date
        } = req.body
        const findUser = await Users.findByPk(req.body.id_users)
        if (!findUser) {
            throw {
                code: 404,
                message: 'User not found'
            }
        }

        // METODE 1
        // function getDatesInRange(startDate, endDate) {
        //     const date = new Date(startDate.getTime());
          
        //     const dates = [];
          
        //     while (date <= endDate) {
        //       dates.push(new Date(date));
        //       date.setDate(date.getDate() + 1);
        //     }
          
        //     return dates;
        //   }
          
        //   const d1 = new Date('2022-11-18');
        //   const d2 = new Date('2022-12-18');
          
        // console.log(getDatesInRange(d1, d2));

        // Returns an array of dates between the two dates
        function getDates (startDate, endDate) {
            const dates = []
            let currentDate = startDate
            const addDays = function (days) {
            const date = new Date(this.valueOf())
            date.setDate(date.getDate() + days)
            return date
            }
            while (currentDate <= endDate) {
            dates.push(currentDate)
            currentDate = addDays.call(currentDate, 1)
            }
            return dates
        }
        
        // Usage
        const dates = getDates(new Date(2022, 11, 22), new Date(2012, 12, 01))
        dates.forEach(function (date) {
            console.log(date)
        })
          
        await sequelize.transaction(async(trx) => {
         insertJadwal = await Jadwal.create(
            {
                id_users: id_users,
                name: findUser.name,
                day,
                time_start,
                time_finish,
                quota,
                date: date
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

const getJadwal = async(req, res, next) => {
    try {
        const findAll = await Jadwal.findAll({
            attributes: ['id', 'id_users', 'name', 'day','time_start', 'time_finish', 'quota', 'date'],
        })

        if (findAll) {
            return res.status(200).json ({
                status: true,
                data: findAll,
                    
            })
        }       
        return res.status(404).json({
            status: false,
            message: 'Jadwal not found'
        })
    } catch (error) {
        next(error)
    }
}

const getJadwalId = async(req, res, next) => {

    id = req.params.id
    const findOne = await Jadwal.findByPk(id, {
        attributes: ['id_users', 'name', 'day','time_start', 'time_finish', 'quota', 'date'],
    })

    if (findOne) {
        return res.status(200).json({
            status: true,
            data: findOne,
        })
    }

    return res.status(404).json({
        status: false,
        message: 'User not found',
    })
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
    deleteJadwal
}