package nl.rickverkuijlen.hardhub.repository;

import nl.rickverkuijlen.hardhub.model.Playlist;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.Query;
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

    public Playlist getPlaylistById(int id) {
        Query query = entityManager.createQuery("SELECT p FROM Playlist p WHERE p.id = :id");
        query.setParameter("id", id);
        return (Playlist)query.getSingleResult();
    }

    public void addSongToPlaylist(int id, int songId) {
        Query query = entityManager.createNativeQuery("INSERT INTO playlist_song (playlistId, songId) VALUES (?, ?)");
        query.setParameter(1, id);
        query.setParameter(2, songId);
        query.executeUpdate();
    }

    public List<Playlist> getPlaylistByOwnerId(String ownerId) {
        List<Playlist> result = new ArrayList<>();
        Query query = entityManager.createQuery("SELECT p FROM Playlist p WHERE p.ownerId = :ownerId");
        query.setParameter("ownerId", ownerId);
        return query.getResultList();
    }
}
