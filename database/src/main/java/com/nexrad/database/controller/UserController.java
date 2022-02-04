package com.nexrad.database.controller;

import org.springframework.web.bind.annotation.RestController;	
import com.nexrad.database.model.User;
import com.nexrad.database.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/user")
@Api(value = "UserController", description = "Click to See REST APIs related to Users details in the system")
public class UserController {
	@Autowired
	private UserService usrService;
		
	@ApiOperation(value = "Get list of all the Users in the System ", response = Iterable.class)
	@ApiResponses(value = { 
	            @ApiResponse(code = 200, message = "Success|OK"),
	            @ApiResponse(code = 401, message = "Not Authorized!"), 
	            @ApiResponse(code = 403, message = "Forbidden!!!"),
	            @ApiResponse(code = 404, message = "Not Found!!!") })
	@GetMapping(value="/getallusers")
    List<User> getAll(){
        return usrService.getAllUsers();
    }
	
	@ApiOperation(value = "Get sepcific User detail based on his UserID", response = Iterable.class)
	@GetMapping(value="/getuser/{userID}")
	ResponseEntity<User> getUser(@PathVariable("userID") String uID) throws Exception {
		try {
		User user = usrService.findByUserID(uID).orElseThrow(()->new Exception("No User with userID : "+uID));
		return ResponseEntity.ok().body(user);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new User());
		}
		
	}
	@ApiOperation(value = "Delete sepcific User detail based on his UserID", response = Iterable.class)
	@DeleteMapping(value="/deleteuser/{email}")
    ResponseEntity<String> deleteProduct(@PathVariable("email") String email) throws Exception {
		try {
        User user = usrService.findByEmail(email)
                                    .orElseThrow(()->new Exception("No User with email : "+email));
        usrService.delete(user.getEmail());
        return ResponseEntity.ok().body("User with Email :  "+email+" deleted with success!");
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
    }
	
	@ApiOperation(value = "Add sepcific User with his details in the system", response = Iterable.class)
	@PostMapping(value="/adduser")
    ResponseEntity<?> User(@RequestBody User user) {
		try {
		System.out.println(user);
        User addedusr = usrService.save(user);
        return ResponseEntity.ok().body("Added user: "+ addedusr);
		}
		catch(Exception e) {
			e.printStackTrace();
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getClass());
		}
		
    }
}
