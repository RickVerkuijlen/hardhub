package nl.rickverkuijlen.hardhub.repository;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import io.quarkus.mongodb.panache.PanacheMongoRepository;
import nl.rickverkuijlen.hardhub.model.Music;
import org.bson.Document;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class MusicRepository implements PanacheMongoRepository<Music> {
    public Music findById(int id) {
        return find("id", id).firstResult();
    }

    public List<Music> getAll() {
        return findAll().list();
    }

    public List<Music> getAllFromArtistId(int id) {
        return find("artistId", id).list();
    }

    public boolean updateStreamCount(int id) {
        Music music = find("id", id).firstResult();

        System.out.println(music);

        int streamCount = music.getStreamCount();
        System.out.println(streamCount);
        streamCount++;
        System.out.println(streamCount);
        music.setStreamCount(streamCount);

        try {
            Music.update("streamCount", streamCount).where("id", id);
            return true;
        } catch (Exception e) {
            return false;
        }

    }
}
