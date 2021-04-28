package nl.rickverkuijlen.hardhub.logic;

import nl.rickverkuijlen.hardhub.model.Playlist;
import nl.rickverkuijlen.hardhub.repository.PlaylistRepository;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.core.Link;
import java.util.List;

@ApplicationScoped
public class PlaylistLogic {

    @ConfigProperty(name = "gateway.endpoint")
    String gatewayEndpoint;

    @Inject
    PlaylistRepository playlistRepository;

    public List<Playlist> getAllPlaylists() {
        List<Playlist> result = playlistRepository.getAllPlaylists();

        result.forEach(this::generateLink);

        return result;
    }

    public Playlist getPlaylistById(int id) throws Exception {
        throw new Exception("Not implemented yet");
    }

    private void generateLink(Playlist playlist) {
        Link link = Link.fromUri(gatewayEndpoint + "/playlist/" + playlist.getId()).rel("self").build();
        playlist.addLink(link);
        for (int id: playlist.getSongIds()) {
            Link artist = Link.fromUri(gatewayEndpoint + "/music/id/" + id).rel("songId").build();
            playlist.addLink(artist);
        }

    }

}
