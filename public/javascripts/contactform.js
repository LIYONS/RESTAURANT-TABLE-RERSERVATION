$(document).ready(function(){
    $("#contactform").validate({
        rules:{
            name:{
                required:true,
                minlength:4
            },
            email:{
                required:true,
                email:true
            },
            message:{
                required:true,
                minlength:5
            }
        }
    })

    
})