package com.nexrad.database.controller;


import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import static org.assertj.core.api.Assertions.assertThat;
import com.nexrad.database.model.User;
import com.nexrad.database.service.UserService;


@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class UserControllerTest {
	
	@Mock
	UserService userService;
	
	@InjectMocks
	UserController userController;
		
	@Test
	public void getAllTest() {
        List<User> listmock = new ArrayList<User>();
        when(userService.getAllUsers()).thenReturn(listmock);     
        List<User> list = userController.getAll();
        assertTrue(list==listmock);
             
	}
	
	@Test
	public void getUser() throws Exception {
		MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        User user = new User();
        Optional<User> opt =Optional.of(user);
        when(userService.findByUserID(anyString())).thenReturn(opt);
        ResponseEntity<?> responseEntity  = userController.getUser(anyString());
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(200);
        
	}
	
	@Test
	public void UserTest() {
		MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        User user = new User();
        when(userService.save(user)).thenReturn(user);
        ResponseEntity<?> responseEntity  = userController.User(user);
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(200);
        
	}
	
}
