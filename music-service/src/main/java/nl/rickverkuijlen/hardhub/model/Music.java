package nl.rickverkuijlen.hardhub.model;

import io.quarkus.mongodb.panache.MongoEntity;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.codecs.pojo.annotations.BsonProperty;

import javax.ws.rs.core.Link;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@MongoEntity(collection = "music")
public class Music extends PanacheMongoEntity {

    @BsonProperty("id")
    private int id;
    private String name;
    private String artist;
    private String songUrl;
    private String imageUrl;

    private Link link;
}
