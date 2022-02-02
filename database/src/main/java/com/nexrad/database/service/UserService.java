package com.nexrad.database.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexrad.database.model.User;
import com.nexrad.database.repository.UserRepository;

@Service
public class UserService implements IUser{
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public List<User> getAllUsers() {
		// TODO Auto-generated method stub
		return userRepo.findAll();
	}

	@Override
	public Optional<User> findByEmail(String email) {
		// TODO Auto-generated method stub
		return userRepo.findByEmail(email);
	}

	@Override
	public User save(User usr) {
		// TODO Auto-generated method stub
		return userRepo.save(usr);
	}

	@Override
	public void delete(String email) {
		// TODO Auto-generated method stub
		userRepo.deleteByEmail(email);
		
	}

	@Override
	public Optional<User> findByUserID(String userID) {
		// TODO Auto-generated method stub
		return userRepo.findByUserID(userID);
	}
	
}
