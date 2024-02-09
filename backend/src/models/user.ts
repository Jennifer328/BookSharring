
import mongoose, {Schema,Document} from 'mongoose';
import bcrypt from 'bcryptjs';

//create an interface that extends mongoose.Document to include the user fields. This interface will be used to type-check the documents returned from queries.
interface IUser extends Document{
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const userSchema = new mongoose.Schema({
  email:{type: String,required: true, unique: true},
  password:{type: String,required: true},
  firstName:{type: String,required: true},
  lastName:{type: String,required: true},
});

userSchema.pre("save", async function(next){
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 8)
  }
  next();
})
const User = mongoose.model<IUser>("User", userSchema);

export default User;