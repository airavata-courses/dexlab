package com.nexrad.database.repository;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nexrad.database.model.User;
@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, Integer>{
	
    Optional<User> findByEmail(String email);
	Optional<User> deleteByEmail(String email);
	Optional<User> findByUserID(String userID);
}
