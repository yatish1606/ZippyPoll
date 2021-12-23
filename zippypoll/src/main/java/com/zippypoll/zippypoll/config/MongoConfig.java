package com.zippypoll.zippypoll.config;

import com.mongodb.client.MongoClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import cz.jirutka.spring.embedmongo.EmbeddedMongoFactoryBean;

import java.io.IOException;

@Configuration
public class MongoConfig {

    private static final String MONGODB_URL = "localhost";
    private static final String MONGODB_DB_NAME = "zippypoll";

    @Bean
    public MongoTemplate mongoTemplate() throws IOException {
        EmbeddedMongoFactoryBean mongo = new EmbeddedMongoFactoryBean();
        mongo.setBindIp(MONGODB_URL);
        MongoClient mongoClient = (MongoClient) mongo.getObject();
        return new MongoTemplate(mongoClient, MONGODB_DB_NAME);
    }
}
