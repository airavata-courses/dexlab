package com.nexrad.database.service;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.nexrad.database.model.User;
import com.nexrad.database.repository.UserRepository;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	
	@Autowired
	UserRepository userRepository;
	
	

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Optional<User> optional = userRepository.findByEmail(username);
		if (optional == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		User user =optional.get();
		System.out.println(user);
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),new ArrayList<>());    
		
		
	}
}