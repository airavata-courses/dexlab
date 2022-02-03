package com.nexrad.database.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.nexrad.database.model.User;
import com.nexrad.database.model.UserActivity;
import com.nexrad.database.service.UserActivityService;

@RestController
@RequestMapping("/activity")
public class UserActivityController {
	
	@Autowired
	UserActivityService usrActivityService;
	
	@GetMapping(value="/getactivity/{userID}")
	ResponseEntity<?> getUser(@PathVariable("userID") String uID) throws Exception {
		try {
		UserActivity userActivity = usrActivityService.findUserActivity(uID).orElseThrow(()->new Exception("No User with userID : "+uID));
		return ResponseEntity.ok().body(userActivity);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Could not get userActivity as either UserId doesn't exist or SQL error occurred.");
		}
		
	}
	

	@PostMapping(value="/addactivity")
    ResponseEntity<?> User(@RequestBody JsonNode userActivity) {
		try {
			
			String uid = userActivity.get("userID").asText();
			String ulogs = userActivity.get("userLogs").asText();
	        UserActivity addedActivity = usrActivityService.addUserActivity(uid,ulogs);
	        return ResponseEntity.ok().body("Added activity: "+ addedActivity);
		}
		catch(Exception e) {
			e.printStackTrace();
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Could Not save, Exception occureed : " +e.getClass().toString());
		}
		
    }

}
