package com.ilanmk.challenge_BE.configuration;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class modelMapperConfig {

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }
}
