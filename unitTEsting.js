function LoginController() {
function isValidUserId(userList, user) {
   return userList.indexOf(user) >= 0;
}
return {
    isValidUserId
  }
}
module.exports = LoginController();
/* Test */
it('should return true if valid user id', function(){
      var isValid = loginController.isValidUserId(['dinukachathura@gmail.com','sss'], 'dinukachathura@gmail.com')
      assert.equal(isValid, true);
});


function isValidUserIdAsync(userList, user, callback) {
    setTimeout(function(){
      callback(userList.indexOf(user) >= 0)
    }, 1);
}   
Note: setTimeout has been used to simulate the async behavior.
/* Test */
it('should return true if valid user id', function(done){
  loginController.isValidUserIdAsync(['dinukachathura@gmail.com','sss'], 'dinukachathura@gmail.com',
     function(isValid){
      assert.equal(isValid, true);
      done();
  });
});