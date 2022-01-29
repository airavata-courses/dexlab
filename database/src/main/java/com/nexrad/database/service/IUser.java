package com.nexrad.database.service;
import java.util.List;
import java.util.Optional;
import com.nexrad.database.model.User;

public interface IUser {
	List<User> getAllUsers();
	Optional<User> findByEmail(String email);
	Optional<User> findByUserID(String email);
	User save(User usr);
	void delete(String email);
	
}
