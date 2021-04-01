package nl.rickverkuijlen.hardhub.repository;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import io.quarkus.mongodb.panache.PanacheMongoRepository;
import nl.rickverkuijlen.hardhub.model.Music;
import org.bson.Document;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.UUID;

@ApplicationScoped
public class MusicRepository implements PanacheMongoRepository<Music> {
    public Music findById(UUID id) {
        return find("id", id).firstResult();
    }
}
