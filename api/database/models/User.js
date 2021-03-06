const bcrypt   = require('bcrypt')
,     mongoose = require('mongoose')

const UserSchema = new mongoose.Schema ({
    name         : { type : String,
                     required : [true, 'Le nom est obligatoire'] },
    email        : { type : String,
                     required : [true, "L'email est obligatoire"],
                     unique   : true },
    password     : { type : String,
                     required : [true, 'Le mot de passe est obligatoire'] },
    status       : { type  : String},
    bio          : { type  : String},
    imgUser      : { type  : String},
    created_date : { type : Date, default: Date.now }
})

UserSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (error, encrypted) => {
        user.password = encrypted
        next()
    })
})

module.exports = mongoose.model('User', UserSchema)