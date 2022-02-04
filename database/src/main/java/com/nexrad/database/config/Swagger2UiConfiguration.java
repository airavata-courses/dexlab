package com.nexrad.database.config;

import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import com.google.common.base.Predicates;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SuppressWarnings("deprecation")
@Configuration
@EnableSwagger2
public class Swagger2UiConfiguration extends WebMvcConfigurerAdapter{
	
	
	@Value("${swagger.base.package}")
	private String basePackage;
	
	@Value("${swagger.html}")
	private String html;
	
	@Value("${swagger.webjars.all}")
	private String webjarsPath;
	
	@Value("${swagger.resource.classpath}")
	private String resources;
	
	@Value("${swagger.webjars.classpath}")
	private String webjars;
	
	@Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2).select()
                .apis(Predicates.not(RequestHandlerSelectors.basePackage(basePackage)))
                .build();
        }
 
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) 
    {	System.out.println("==================...............==========================");
    	System.out.println(basePackage);
    	System.out.println("==================...............==========================");
    	System.out.println(html);
    	System.out.println("==================...............==========================");
    	System.out.println(resources);
    	System.out.println("==================...............==========================");
    	System.out.println(webjarsPath);
    	System.out.println("==================...............==========================");
    	System.out.println(webjars);
        registry.addResourceHandler(html).addResourceLocations(resources);
        registry.addResourceHandler(webjarsPath).addResourceLocations(webjars);
    }
	
}
