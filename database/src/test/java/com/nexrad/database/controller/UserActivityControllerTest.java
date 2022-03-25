package com.nexrad.database.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

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

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.nexrad.database.model.User;
import com.nexrad.database.model.UserActivity;
import com.nexrad.database.service.UserActivityService;

import springfox.documentation.spring.web.json.Json;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class UserActivityControllerTest {
	
	@Mock
	UserActivityService userService;
	
	@Mock
	JsonNode json;
	
	@InjectMocks
	UserActivityController userController;
		
	@Test
	public void getUserTest() throws Exception {
		MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        UserActivity userActivity = new UserActivity();

        Optional<UserActivity> opt =Optional.of(userActivity);
        when(userService.findUserActivity(anyString())).thenReturn(opt);
       
        ResponseEntity<?> responseEntity  = userController.getUser(anyString());
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(200);
	}
	

}
