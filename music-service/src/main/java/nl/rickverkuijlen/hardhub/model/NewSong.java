package nl.rickverkuijlen.hardhub.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nl.rickverkuijlen.hardhub.S3.FormData;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewSong {
    private String name;
    private String artistId;
    private FormData song;
    private FormData thumbnail;
}
