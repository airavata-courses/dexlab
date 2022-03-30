package com.nexrad.database.model;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import org.hibernate.annotations.NaturalId;

import com.fasterxml.jackson.annotation.JsonManagedReference;





@Entity
@Table(name = "users")
public class User implements Serializable{
	private static final long serialVersionUID = 1L;
	

	@Id
	@Column(nullable=false, unique = true,length=60)
	private String userID;
	
    private String name;
    @Column(nullable=false, unique = true, length = 50)
	private String email;
    private String password;
    
    @JsonManagedReference
    @OneToMany(mappedBy="user",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private Set<UserActivity> activities;
    
    
    
	//Getters and setters
    
	public String getName() {
		return name;
	}
	public Set<UserActivity> getActivities() {
		return activities;
	}
	public void setActivities(Set<UserActivity> activities) {
		this.activities = activities;
	}
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	@Override
	public String toString() {
		return "User [UserID=" + userID + ", name=" + name + ", email=" + email + "]";
	}
	

}
