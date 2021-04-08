package nl.rickverkuijlen.hardhub.logic;

import nl.rickverkuijlen.hardhub.model.Artist;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class ArtistLogic {

    public List<Artist> getAll() {
        return Artist.listAll();
    }

    public Artist get(int id) {
        return Artist.find("id", id).firstResult();
    }
}
