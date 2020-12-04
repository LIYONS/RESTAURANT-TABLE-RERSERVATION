
var db = require('../config/connection')
var promise = require('promise');
const { resolve } = require('promise');
module.exports = {


    getReservations: () => {
        return new promise(async (resolve, reject) => {
            var d = new Date();
            d.setDate(new Date().getDate() - 1);
            d = getFullDate(d)

            function getFullDate(day) {
                var dd = day.getDate();
                var mm = day.getMonth();
                var yyyy = day.getFullYear();
                var today = dd + '-' + mm + '-' + yyyy;
                return today;
            }
            let reservations = await db.get().collection('reservationdata').find({ date: { $gt: d } }).toArray()
            if(reservations){
            for(x in reservations){
                reservations[x].starttime=reservations[x].starttime[0]+reservations[x].starttime[1]+':'+reservations[x].starttime[2]+reservations[x].starttime[3]
                reservations[x].endtime=reservations[x].endtime[0]+reservations[x].endtime[1]+':'+reservations[x].endtime[2]+reservations[x].endtime[3]
            }
            }
            function compare(a, b) {
                const d1 = a.date;
                const d2 = b.date;

                let comparison = 0;
                if (d1 > d2) {
                    comparison = 1;
                } else if (d1 < d2) {
                    comparison = -1;
                }
                return comparison;
            }

            resolve(reservations.sort(compare));
        })
    },
    getDates: () => {
        return new promise(async (resolve, reject) => {


            var day1 = new Date();

            var day2 = new Date();
            day2.setDate(new Date().getDate() + 1);

            var day3 = new Date();
            day3.setDate(new Date().getDate() + 2);

            var day4 = new Date();
            day4.setDate(new Date().getDate() + 3);
            var day5 = new Date();
            day5.setDate(new Date().getDate() + 4);

            var dates = { days: {} }

            dates.days.day1 = getFullDate(day1);
            dates.days.day2 = getFullDate(day2);
            dates.days.day3 = getFullDate(day3);
            dates.days.day4 = getFullDate(day4);
            dates.days.day5 = getFullDate(day5);



            function getFullDate(day) {
                var dd = day.getDate();
                var mm = day.getMonth();
                var yyyy = day.getFullYear();
                var today = dd + '-' + mm + '-' + yyyy;
                return today;
            }
            resolve(dates);


        })
    },
    doLogin: (details) => {
        return new promise(async (resolve, reject) => {
            let response = {}
            let admin = await db.get().collection('credentials').findOne({ $and: [{ username: details.username }, { password: details.password }] })
            if (admin) {
                response.admin = details
                response.status = true
                resolve(response)
            }
            else resolve({ status: false })
        })
    },
    isAvailable: (reservation) => {
        return new promise(async (resolve, reject) => {
            let dblist = {}
            var stat = true
            let response = {}

            dblist = await db.get().collection('reservationdata').find({ $and: [{ date: reservation.date }, { tables: reservation.tables }] }).toArray()
            if (dblist[0] !== null) {
                for (x in dblist) {

                    var a = parseInt(dblist[x].starttime)
                    var b = parseInt(dblist[x].endtime)
                    var p = parseInt(reservation.starttime)
                    var q = parseInt(reservation.endtime)

                    if (p == a) { stat = false; }
                    else if (a < p) {
                        if (b < p) stat = true
                        else stat = false
                    }
                    else if (a > p) {
                        if (a > q) stat = true
                        else stat = false
                    }
                    else {
                        stat = true
                    }
                    if (stat == false) {
                        break;
                    }
                }
            }
            else stat = true;
            if (stat === true) {
                reservation.bookID=reservation.date+reservation.starttime+reservation.endtime+reservation.name;
                await db.get().collection('reservationdata').insertOne(reservation)
                response.status = true
                response.data = reservation
                resolve(response)

            }
            else resolve({ status: false })
        })

    },
    deleteRecord:(detail)=>{
        let delstatus={}
        let temp
        return new promise(async(resolve,reject)=>{
            temp=await db.get().collection('reservationdata').findOne({bookID: detail.bookID})
            console.log(temp)
            if(temp){
                db.get().collection('reservationdata').deleteOne({bookID: detail.bookID})
                 delstatus.status=true
                 resolve(delstatus)
            }
            else
            resolve({status:false})
        })
        
    }
}
