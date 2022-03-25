package com.nexrad.database.repository;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.nexrad.database.model.User;

@Repository
@Transactional
@Component("UserRepository")
public interface UserRepository extends JpaRepository<User, Long>{
	
    Optional<User> findByEmail(String email);
	Optional<User> deleteByEmail(String email);
	Optional<User> findByUserID(String userID);
}
