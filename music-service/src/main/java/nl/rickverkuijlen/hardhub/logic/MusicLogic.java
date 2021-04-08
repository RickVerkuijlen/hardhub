package nl.rickverkuijlen.hardhub.logic;

import nl.rickverkuijlen.hardhub.model.Music;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class MusicLogic {

    public Music get(int id) {
        return Music.find("id", id).firstResult();
    }

    public List<Music> getAll() {
        return Music.listAll();
    }
}
