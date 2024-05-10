package com.revature.auth;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    @Autowired
    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    private PasswordEncoder passwordEncoder;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auths -> auths
                        .requestMatchers("/login").permitAll() // this will allow unauthenticated requests to /login
                        .requestMatchers("/register").permitAll()
                        //.anyRequest().authenticated()) // this will close all other endpoints to unauthenticated requests
                        .anyRequest().permitAll()) // temporarily lets allow all requests
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                ;

        // Probably lets not add this filter yet
                //.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        /* Most online stores allow you to browse without logging in.
        *  Probably just require login for add to cart, checkout, etc */

        return http.build();
    }


}
