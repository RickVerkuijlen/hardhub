package nl.rickverkuijlen.hardhub.repository;

import nl.rickverkuijlen.hardhub.model.Artist;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ArtistRepository {

    public void delete(String artistId) {
        Artist.delete("artistId", artistId);
    }
}
