package nl.rickverkuijlen.hardhub.controller;

import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.junit.QuarkusTest;
import nl.rickverkuijlen.hardhub.logic.PlaylistLogic;
import nl.rickverkuijlen.hardhub.logic.PlaylistLogicTests;
import nl.rickverkuijlen.hardhub.model.Playlist;
import nl.rickverkuijlen.hardhub.model.PlaylistSong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@QuarkusTest
@TestHTTPEndpoint(PlaylistController.class)
public class PlaylistControllerTests {
    @InjectMocks
    PlaylistController playlistController;

    @Mock
    PlaylistLogic playlistLogic;

    private List<Playlist> playlists;
    private List<PlaylistSong> songs;

    @BeforeEach
    void setUp() {
        this.playlists = new ArrayList<>();
        this.songs = new ArrayList<>();
        this.songs.add(PlaylistSong.builder().songId(1).addedOn(new Date()).build());
        this.songs.add(PlaylistSong.builder().songId(2).addedOn(new Date()).build());
        for (int i = 0; i < 3; i++) {
            this.playlists.add(Playlist.builder().id(i).name("test").songIds(this.songs).build());
        }
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void playlistController_getAllPlaylists_length() {
        when(playlistLogic.getAllPlaylists()).thenReturn(this.playlists);

        int expected = 3;
        int actual = playlistController.getAllPlaylists().readEntity(ArrayList.class).size();

        assertEquals(expected, actual);
    }

    @Test
    public void playlistController_getSinglePlaylist_threeSongs() {
        when(playlistLogic.getPlaylistById(1)).thenReturn(this.playlists.stream().filter(x -> x.getId() == 1).findFirst().get());

        int expected = 2;
        int actual = playlistController.getPlaylistById(String.valueOf(1)).readEntity(Playlist.class).getSongIds().size();

        assertEquals(expected, actual);
    }
}
