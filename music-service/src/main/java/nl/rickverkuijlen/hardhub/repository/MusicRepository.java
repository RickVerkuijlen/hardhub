package nl.rickverkuijlen.hardhub.repository;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import io.quarkus.mongodb.panache.PanacheMongoRepository;
import io.smallrye.mutiny.tuples.Tuple2;
import nl.rickverkuijlen.hardhub.model.Music;
import nl.rickverkuijlen.hardhub.model.Pair;
import org.bson.Document;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectResponse;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;
import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Stream;

@ApplicationScoped
public class MusicRepository extends CommonResource implements PanacheMongoRepository<Music>  {

    @Inject
    S3Client s3;

    public Music findById(int id) {
        return find("id", id).firstResult();
    }

    public List<Music> getAll() {
        return findAll().list();
    }

    public List<Music> getAllFromArtistId(String id) {
        return find("artistId", id).list();
    }

    public boolean updateStreamCount(int id) {
        Music music = find("id", id).firstResult();

        System.out.println(music);

        int streamCount = music.getStreamCount();
        streamCount++;
        music.setStreamCount(streamCount);

        try {
            Music.update("streamCount", streamCount).where("id", id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Pair<GetObjectResponse, StreamingOutput> getObjectResponse(String path) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        GetObjectResponse object = s3.getObject(buildGetRequest(path), ResponseTransformer.toOutputStream(baos));

        return new Pair<>(object, baos::writeTo);
    }

    public void deleteMusicByArtist(String artistId) {
        List<Music> result = list("artistId", artistId);

        result.forEach(music -> {
            deleteMusicFromAWS(music.getName());
            delete("id", music.getId());
        });
    }

    public void deleteMusicById(String id) {
        Music music = find("id", id).firstResult();

        deleteMusicFromAWS(music.getName());
        deleteMusicFromAWS(music.getImageId());

        delete("id", music.getId());
    }

    private void deleteMusicFromAWS(String endpoint) {
        s3.deleteObject(buildDeleteRequest(endpoint));
    }

}
