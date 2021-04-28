package nl.rickverkuijlen.hardhub.repository;

import nl.rickverkuijlen.hardhub.model.Playlist;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class PlaylistRepository {

    @Inject
    EntityManager entityManager;

    public List<Playlist> getAllPlaylists() {
        List<Playlist> result = new ArrayList<Playlist>();
        result = entityManager.createQuery("SELECT p FROM Playlist p", Playlist.class).getResultList();
        return result;
    }
}
