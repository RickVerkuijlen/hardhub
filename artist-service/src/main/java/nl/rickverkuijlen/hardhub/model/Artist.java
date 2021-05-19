package nl.rickverkuijlen.hardhub.model;

import io.quarkus.mongodb.panache.MongoEntity;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import lombok.*;
import org.bson.codecs.pojo.annotations.BsonProperty;

import javax.persistence.Id;
import javax.ws.rs.core.Link;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@MongoEntity(collection = "artist")
public class Artist extends PanacheMongoEntity {

    @BsonProperty("id")
    @Id
    private String id;
    private String name;
    private String imageId;

    @Setter(AccessLevel.NONE)
    private List<Link> links = new ArrayList<>();

    public void addLink(Link link) {
        links.add(link);
    }

}
