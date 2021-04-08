package nl.rickverkuijlen.hardhub.logic;

import nl.rickverkuijlen.hardhub.model.Music;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.core.Link;
import java.util.List;

@ApplicationScoped
public class MusicLogic {

    @ConfigProperty(name = "gateway.endpoint")
    String gatewayEndpoint;

    public Music get(int id) {
        return Music.find("id", id).firstResult();
    }

    public List<Music> getAll() {
        List<Music> result = Music.listAll();

        result.forEach(m -> {
            Link link = Link.fromUri(gatewayEndpoint + "/music/" + m.getId()).rel("self").build();
            m.addLink(link);
            Link artist = Link.fromUri(gatewayEndpoint + "/artist/" + m.getArtistId()).rel("artist").build();
            m.addLink(artist);
            Link song = Link.fromUri(gatewayEndpoint + "/music/" + m.getSongId()).rel("song").build();
            m.addLink(song);
            Link image = Link.fromUri(gatewayEndpoint + "/music/" + m.getImageId()).rel("image").build();
            m.addLink(image);
        });

        return Music.listAll();
    }
}
