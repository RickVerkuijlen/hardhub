package nl.rickverkuijlen.hardhub.logic;

import io.smallrye.reactive.messaging.annotations.Broadcast;
import nl.rickverkuijlen.hardhub.model.Artist;
import nl.rickverkuijlen.hardhub.repository.ArtistRepository;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.reactive.messaging.*;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.core.Link;
import java.util.List;

@ApplicationScoped
public class ArtistLogic {

    @ConfigProperty(name = "gateway.endpoint")
    String gatewayEndpoint;

    @Inject
    ArtistRepository artistRepository;

    @Inject
    @Channel("forget-artist")
    Emitter<String> artistEmitter;

    public List<Artist> getAll() {
        List<Artist> result = Artist.listAll();

        result.forEach(a -> {
            Link link = Link.fromUri(gatewayEndpoint + "/artist/" + a.getId()).rel("self").build();
            a.addLink(link);
            Link image = Link.fromUri(gatewayEndpoint + "/music/" + a.getImageId()).rel("image").build();
            a.addLink(image);
        });

        return result;
    }

    public Artist get(String id) {
        Artist result = Artist.find("id", id).firstResult();

        Link link = Link.fromUri(gatewayEndpoint + "/artist/" + result.getId()).rel("self").build();
        result.addLink(link);
        Link image = Link.fromUri(gatewayEndpoint + "/music/" + result.getImageId()).rel("image").build();
        result.addLink(image);

        return result;
    }

    public String delete(String artistId) throws Exception {
        artistRepository.delete(artistId);
        artistEmitter.send(artistId);
        return artistId;
    }


}
