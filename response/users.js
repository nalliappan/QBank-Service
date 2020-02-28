class Users{
    constructor(user, profile){
        this.user =  user.toJSON();
        this.profile = profile ?  profile.toJSON() : {};
    }

    getLoginResponse(){
        const {name="", city="", state="", country="", description="", logo="", email="" , _id: id = ""} = this.profile;
        return {
            user : {userId: this.user._id, name: this.user.name, email: this.user.email, role: this.user.role},
            [this.user.role] : {name, city, state, country, description, logo, email, id }
        };
    }
}

module.exports =  Users;