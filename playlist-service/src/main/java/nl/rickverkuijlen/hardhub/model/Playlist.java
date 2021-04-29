package nl.rickverkuijlen.hardhub.model;

import lombok.*;
import org.graalvm.collections.Pair;

import javax.persistence.*;
import javax.ws.rs.core.Link;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "playlist")
@AllArgsConstructor
@NoArgsConstructor
public class Playlist {

    @Id
    @Column(name = "playlistId")
    private int id;
    private String name;
    private String ownerId;

    @ElementCollection
    @CollectionTable(name = "playlist_song", joinColumns = @JoinColumn(name = "playlistId"))
    private List<PlaylistSong> songIds;

    @Setter(AccessLevel.NONE)
    @Transient
    private List<Link> links = new ArrayList<>();

    public void addLink(Link link) {
        this.links.add(link);
    }
}
