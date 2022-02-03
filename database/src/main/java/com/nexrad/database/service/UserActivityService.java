package com.nexrad.database.service;

import java.util.Optional;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.nexrad.database.model.User;
import com.nexrad.database.model.UserActivity;
import com.nexrad.database.repository.UserActivityRepository;

@Component
public class UserActivityService implements IUserActivity{
	
	@Autowired
	private UserActivityRepository userActivityRepo;
	
	@Autowired
	EntityManager entityManager;
	
	@Autowired
	UserActivity userActivity;

	@Override
	public UserActivity addUserActivity(String uid,String ulogs) throws Exception {
		// TODO Auto-generated method stub
		User user  = entityManager.getReference(User.class, uid);
		
		userActivity.setUser(user);
		userActivity.setUserLogs(ulogs);
		
		return userActivityRepo.save(userActivity);
	}

	@Override
	public Optional<UserActivity> findUserActivity(String UID) {
		// TODO Auto-generated method stub
		return userActivityRepo.findByUserID(UID);
	}
	

}
