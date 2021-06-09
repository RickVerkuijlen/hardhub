package nl.rickverkuijlen.hardhub.model;

import lombok.Builder;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

@Embeddable
@Data
@Builder
@Table(name = "playlist_song")
public class PlaylistSong implements Serializable {

    @Column
    private int songId;

    @Column
    private Date addedOn;

}
