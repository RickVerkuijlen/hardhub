package nl.rickverkuijlen.hardhub.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

@Embeddable
@Data
@Builder
@Table(name = "playlist_song")
@NoArgsConstructor
@AllArgsConstructor
public class PlaylistSong implements Serializable {

    @Column
    private int songId;

    @Column
    private Date addedOn;

}
