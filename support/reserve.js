
var db = require('../config/connection')
var promise = require('promise');
module.exports = {

    
    getReservations: () => {

        return new promise(async (resolve, reject) => {
            let reservations = await db.get().collection('reservationdata').find().toArray()
            resolve(reservations)
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
    isAvailable:(reservation) => {

        return new promise(async(resolve,reject)=>{
            let dblist={}
            let stat;
            let temp;
            dblist.temp=await db.get().collection('reservationdata').findOne({$and : [{date:reservation.date},{tables:reservation.tables}]})
            console.log(dblist)
            if(dblist.temp !== null){
                    var a=parseInt(dblist.temp.starttime);
                    var b=parseInt(dblist.temp.endtime);
                    var p=parseInt(reservation.starttime);
                    var q=parseInt(reservation.endtime);
 
                    if(p==a) stat=false;

                    else if(a<p){
                        if(b<p) stat=true
                        else stat=false
                    }
                    else{
                        if(q<p) stat=true
                        else stat=false
                    }             
            }
            else  stat=true;
            if(stat===true) {
               await db.get().collection('reservationdata').insertOne(reservation)
                    resolve(reservation)
                
            }
            else reject(stat)
        })
    },
    doLogin:(details)=>{
        return new promise((resolve,reject)=>{
            let response={}
            let admin=db.get().collection('credentials').findOne({$and: [ {username:details.username},{password:details.password}]})
            if(admin){
                loginstatus=true
                response.admin=details
                response.status=true
                resolve(response)
            }
            else resolve({status:false})
        })
    }
      
}
