package nl.rickverkuijlen.hardhub.logic;

import io.quarkus.test.Mock;
import io.quarkus.test.junit.QuarkusTest;
import nl.rickverkuijlen.hardhub.repository.PlaylistRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

@QuarkusTest
public class PlaylistLogicTests {

    @InjectMocks
    PlaylistLogic playlistLogic;

    @Mock
    PlaylistRepository playlistRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void playlistLogic_addSongToPlaylist_success() {
        playlistLogic.addSongToPlaylist(1, 1);
    }
}
