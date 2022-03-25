package com.nexrad.database.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.nexrad.database.model.UserActivity;

@Repository
@Transactional
public interface UserActivityRepository extends JpaRepository<UserActivity, Long>{
	@Query("select a from UserActivity a where a.user.userID= :UID ")
	Optional<UserActivity> findByUserID(String UID);
}
