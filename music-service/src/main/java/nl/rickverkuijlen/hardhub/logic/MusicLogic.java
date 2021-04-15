package nl.rickverkuijlen.hardhub.logic;

import nl.rickverkuijlen.hardhub.model.Music;
import nl.rickverkuijlen.hardhub.repository.MusicRepository;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.core.Link;
import java.util.List;

@ApplicationScoped
public class MusicLogic {

    @ConfigProperty(name = "gateway.endpoint")
    String gatewayEndpoint;

    @Inject
    MusicRepository repository;

    public Music get(int id) {
        Music result = repository.findById(id);

        generateList(result);

        return result;
    }

    public List<Music> getAll() {
        List<Music> result = repository.getAll();

        result.forEach(this::generateList);

        return result;
    }

    public List<Music> getAllFromArtistId(int id) {
        List<Music> result = repository.getAllFromArtistId(id);

        result.forEach(this::generateList);

        return result;
    }

    private void generateList(Music music) {
        Link link = Link.fromUri(gatewayEndpoint + "/music/id/" + music.getId()).rel("self").build();
        music.addLink(link);
        Link artist = Link.fromUri(gatewayEndpoint + "/artist/id/" + music.getArtistId()).rel("artist").build();
        music.addLink(artist);
        Link song = Link.fromUri(gatewayEndpoint + "/music/" + music.getSongId()).rel("song").build();
        music.addLink(song);
        Link image = Link.fromUri(gatewayEndpoint + "/music/" + music.getImageId()).rel("image").build();
        music.addLink(image);
    }
}
