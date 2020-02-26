const User = require('../models/User');
const ActiveDirectory = require('activedirectory');

var config = {
    url: process.env.LDAP_URL,
    baseDN: process.env.LDAP_BASE
}


var ad = new ActiveDirectory({
    url: process.env.LDAP_URL,
    baseDN: process.env.LDAP_BASE
});


const create = async (req,res) => {
    // Create a new user
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send({message: error});
    }
}


const login = async (req,res) => {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);

    if (!user) {
        return res.status(401).send({message: 'Login failed! Check authentication credentials'});
    }

    if(user.type === 'Legacy') {
        try {

            const user = await User.findByCredentials(email, password);
    
            if (!user) {
                return res.status(401).send({error: 'Login failed! Check authentication credentials'});
            }
    
            const token = await user.generateAuthToken();
    
            res.send({ user, token });
            
        } catch (error) {
            res.status(400).send({message: 'Invalid Credentials!'});
        }
    } else {
        try {
            ad.authenticate(email, password, async function(err, auth) {
                if (err) {
                 return res.status(400).send({message: 'Invalid LDAP Credentials!'});
                }
                
                if (auth) {
                  console.log('Authenticated!');
                
                  const token = await user.generateAuthToken();
    
                  return res.send({ user, token });
    
                }
                else {
                return res.status(400).send({message: 'Invalid Credentials!'});
                }
            });
        } catch (error) {
            return res.status(400).send({message: 'Invalid Credentials!', error: error});
        }
    }
}

const me = async (req,res) => {
    // View logged in user profile
    res.send(req.user);
}

const logout = async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send({message: 'Logout Success!'});
    } catch (error) {
        res.status(500).send(error)
    }
}

const logoutall =  async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send({message: 'Logout Success!'});
    } catch (error) {
        res.status(500).send(error)
    }
}

const update = async (req,res) => {
    const updates  = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    const _id =  req.user._id

    if(!isValidOperation){
        res.status(400).send({error:'Invalid request'})
    }

    try {        
        updates.forEach((update) => req.user[update] = req.body[update]) 
        await req.user.save()
        res.send(req.user);
    } catch (error) {
        res.status(400).send()
    }

}


module.exports = {
    create,
    login,
    me,
    update,
    logout,
    logoutall
};
