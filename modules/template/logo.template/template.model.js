const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LogoTemplateSchema = new Schema({ 
    //db modeling
    name : { 
        type : String,
        requied : true,
        trim : true 
    },  
    svgFile : {
        type : String,
        required : true 
    }, 
    theme : {
        type : String, 
        required : true,
        trim : true 
    },
    industryCategory : [{
        type : Schema.Types.ObjectId,
        ref : 'industryCategory'
    }],
    designer : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    status : {
        type : String,
        enum : ['active', 'inactive'],
        default : 'inactive'
    },
    company : {
        type : String,
        default : 'Company'
    },
    companySlogan : {
        type : String,
        default : 'Slogan'
    },
    ratings : [{ 
        type : Schema.Types.ObjectId,
        ref : 'ratings' 
    }]
}, 
{
    timestamps : true
})

const LogoTemplateModel = mongoose.model('template', LogoTemplateSchema)
module.exports = mongoose.models.TemplateModel || LogoTemplateModel
