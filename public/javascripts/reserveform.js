$(document).ready(function(){
    $("#reservform").validate({
        rules:{
            name:{
                required:true,
                minlength:3
            },
            email:{
                required:true,
                email:true
            },
            phoneno:{
                required:true,
                number:true
            }

        }
    })
    $("form").submit(function(){
                var endtime=$("#endtime").val()
                var starttime=$("#starttime").val()
                endtime=parseInt(endtime)
                starttime=parseInt(starttime)
                if(endtime <= starttime){
                    alert("Time-end should be greater than Time-start")
                    return false;
                }
            })
})