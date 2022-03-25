package com.nexrad.database.service;

import java.util.Optional;

import com.nexrad.database.model.UserActivity;

public interface IUserActivity {
	UserActivity addUserActivity(String uid,String ulogs) throws Exception;
	Optional<UserActivity> findUserActivity(String UID);
}
