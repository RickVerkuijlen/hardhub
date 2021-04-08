package nl.rickverkuijlen.hardhub.model;

import io.quarkus.mongodb.panache.MongoEntity;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import lombok.*;
import org.bson.codecs.pojo.annotations.BsonProperty;

import javax.ws.rs.core.Link;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@MongoEntity(collection = "music")
public class Music extends PanacheMongoEntity {

    @BsonProperty("id")
    private int id;
    private String name;
    private int artistId;
    private String songId;
    private String imageId;

    @Setter(AccessLevel.NONE)
    private List<Link> links = new ArrayList<>();

    public void addLink(Link link) {
        this.links.add(link);
    }
}
