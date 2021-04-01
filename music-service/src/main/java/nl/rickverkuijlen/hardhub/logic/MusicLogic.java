package nl.rickverkuijlen.hardhub.logic;

import nl.rickverkuijlen.hardhub.model.Music;
import nl.rickverkuijlen.hardhub.repository.MusicRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class MusicLogic {

//    @Inject
//    MusicRepository musicRepository;

    public Music get(int id) {
        return Music.findById(id);
    }

    public List<Music> getAll() {
        return Music.listAll();
    }
}
