/* Code */
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

var request = require('supertest'),
  should = require('should'),
  app = require('../server');
 
var Cookies;
 
describe('Functional Test <Sessions>:', function () {
  it('should create user session for valid user', function (done) {
    request(app)
      .post('/v1/sessions')
      .set('Accept','application/json')
      .send({"email": "dinukachathura@gmail.com", "password": "123"})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.id.should.equal('1');
        res.body.short_name.should.equal('Test user');
        res.body.email.should.equal('dinukachathura@gmail.com');
        // Save the cookie to use it later to retrieve the session
        Cookies = res.headers['set-cookie'].pop().split(';')[0];
        done();
      });
  });
  it('should get user session for current user', function (done) {
    var req = request(app).get('/v1/sessions');
    // Set cookie to get saved user session
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.id.should.equal('1');
        res.body.short_name.should.equal('Test user');
        res.body.email.should.equal('gmail@gmail.com');
        done();
      });
  });
});

