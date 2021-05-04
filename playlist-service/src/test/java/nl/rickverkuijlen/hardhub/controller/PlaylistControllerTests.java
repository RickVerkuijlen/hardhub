package nl.rickverkuijlen.hardhub.controller;

import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.common.http.TestHTTPResource;
import io.quarkus.test.junit.QuarkusMock;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.RestAssured;
import nl.rickverkuijlen.hardhub.logic.PlaylistLogic;
import nl.rickverkuijlen.hardhub.model.Playlist;
import nl.rickverkuijlen.hardhub.repository.PlaylistRepository;
import org.apache.http.HttpStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import javax.enterprise.inject.Produces;
import javax.inject.Inject;
import javax.ws.rs.core.Response;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Matchers.anyList;
import static org.mockito.Matchers.anyListOf;
import static io.restassured.RestAssured.*;
import static org.mockito.Mockito.*;

@QuarkusTest
@TestHTTPEndpoint(PlaylistController.class)
public class PlaylistControllerTests {
    @InjectMocks
    PlaylistController playlistController;

    @Mock
    PlaylistLogic playlistLogic;

    @Mock
    PlaylistRepository playlistRepository;

    List<Playlist> playlists;

    @BeforeEach
    void setUp() {
        this.playlists = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            this.playlists.add(Playlist.builder().id(i).build());
        }
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void playlistController_getAllPlaylists_length() {
        when(playlistRepository.getAllPlaylists()).thenReturn(this.playlists);
        verify(playlistLogic, times(1)).getAllPlaylists();

        int expected = 3;
        int actual = playlistController.getAllPlaylists().readEntity(ArrayList.class).size();

        assertEquals(expected, actual);
    }

    @Test
    public void playlistController_getSinglePlaylist_doLinksExists() {
        when(playlistRepository.getPlaylistById(1)).thenReturn(Playlist.builder().id(1).build());

        System.out.println(playlistController.getPlaylistById(String.valueOf(1)).readEntity(Playlist.class).getLinks());

        assertNotNull(playlistController.getPlaylistById(String.valueOf(1)).readEntity(Playlist.class).getLinks());
    }
}
