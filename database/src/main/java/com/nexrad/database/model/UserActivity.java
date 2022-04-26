package com.nexrad.database.model;


import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "UserActivity")
@Component
public class UserActivity {
	
	@Id
	@GeneratedValue(strategy= GenerationType.AUTO)
	private Long userActivityID;
	
	
	@Column(nullable=false, length = 10000000)
	private String userLogs;
	
	@JsonBackReference
	@ManyToOne(cascade= CascadeType.ALL)
	@JoinColumn(name = "USER_ID")
	private User user;
	
	
	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public String getUserLogs() {
		return userLogs;
	}


	public void setUserLogs(String userLogs) {
		this.userLogs = userLogs;
	}


	@Override
	public String toString() {
		return "UserActivity [userActivityID=" + userActivityID + ", userLogs=" + userLogs + ", user=" + user + "]";
	}


	

	
	
	
	
}
