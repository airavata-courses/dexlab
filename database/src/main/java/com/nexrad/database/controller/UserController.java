package com.nexrad.database.controller;

import org.springframework.web.bind.annotation.RestController;

import com.nexrad.database.model.JwtRequest;
import com.nexrad.database.model.JwtResponse;
import com.nexrad.database.model.User;
import com.nexrad.database.service.JwtUserDetailsService;
import com.nexrad.database.service.UserService;
import com.nexrad.database.utils.JwtTokenUtil;

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
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;


@RestController
@RequestMapping("/user")
@Api(value = "UserController", description = "Click to See REST APIs related to Users details in the system")
public class UserController {
	@Autowired
	private UserService usrService;
	@Autowired
	private PasswordEncoder bcryptEncoder;
	

	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@Autowired
	private JwtUserDetailsService userDetailsService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
		
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
	ResponseEntity<?> getUser(@PathVariable("userID") String uID) throws Exception {
		try {
		User user = usrService.findByUserID(uID).orElseThrow(()->new Exception("No User with userID : "+uID));
		final String token = jwtTokenUtil.generateToken(user.getEmail());
		Map<String, Object> map = new HashMap<>();
		map.put("userID",user.getUserID());
		map.put("name",user.getName());
		map.put("email",user.getEmail());
		map.put("password",user.getPassword());
		map.put("activities",user.getActivities());
	    map.put("token", token);
		return ResponseEntity.ok().body(map);
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
		user.setPassword(bcryptEncoder.encode(user.getPassword()));
        User addedusr = usrService.save(user);
		final String token = jwtTokenUtil.generateToken(user.getEmail());
		Map<String, Object> map = new HashMap<>();
	    map.put("token", token);
		return ResponseEntity.ok().body(map);

		}
		catch(Exception e) {
			e.printStackTrace();
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getClass());
		}
		
    }
	
	@GetMapping(value="/check/{emailId}")
	ResponseEntity<?> User(@PathVariable String emailId) {
		try {
	        User user = usrService.findByEmail(emailId)
	                                    .orElseThrow(()->new Exception("No User with email : "+emailId));
	        Map<String, Object> map = new HashMap<>();
		    map.put("Found", true);
	        return ResponseEntity.ok().body(map);
			}
			catch(Exception e) {
				Map<String, Object> map = new HashMap<>();
			    map.put("Found", false);
				return ResponseEntity.ok().body(map);
			}
	}
	
}
