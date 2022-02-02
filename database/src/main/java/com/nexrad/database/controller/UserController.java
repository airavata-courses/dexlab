package com.nexrad.database.controller;

import org.springframework.web.bind.annotation.RestController;
import com.nexrad.database.model.User;
import com.nexrad.database.service.UserService;
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
public class UserController {
	@Autowired
	private UserService usrService;
	
	@GetMapping(value="/getallusers")
    List<User> getAll(){
        return usrService.getAllUsers();
    }
	
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
