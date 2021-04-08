package nl.rickverkuijlen.hardhub.controller;

import nl.rickverkuijlen.hardhub.S3.FileObject;
import nl.rickverkuijlen.hardhub.logic.MusicLogic;
import nl.rickverkuijlen.hardhub.model.Music;
import org.jboss.resteasy.annotations.jaxrs.PathParam;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.ListObjectsRequest;
import software.amazon.awssdk.services.s3.model.S3Object;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.*;
import java.io.ByteArrayOutputStream;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Path("/music")
public class MusicController extends CommonResource {
    @Inject
    S3Client s3;

    @Inject
    MusicLogic musicLogic;

    @GET
    @Path("{path:.+}")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response downloadFile(@PathParam String path) {

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        GetObjectResponse object = s3.getObject(buildGetRequest(path), ResponseTransformer.toOutputStream(baos));

        Response.ResponseBuilder response = Response.ok((StreamingOutput) baos::writeTo);
        response.header("Content-Disposition", "attachment;'filename=" + path);
        response.header("Content-Type", object.contentType());
        return response.build();
    }

    @GET
    @Path("allSongs")
    public Response getAllSongs() {
        List<Music> allSongs = musicLogic.getAll();

        allSongs.forEach(m -> {
            Link link = Link.fromUri(gatewayEndpoint + "/music/" + m.getId()).rel("self").build();
            m.addLink(link);
            Link artist = Link.fromUri(gatewayEndpoint + "/artist/" + m.getArtistId()).rel("artist").build();
            m.addLink(artist);
            Link song = Link.fromUri(gatewayEndpoint + "/music/" + m.getSongId()).rel("song").build();
            m.addLink(song);
            Link image = Link.fromUri(gatewayEndpoint + "/music/" + m.getImageId()).rel("image").build();
            m.addLink(image);
        });

        Response.ResponseBuilder response = Response.ok(allSongs);

        response.header("Content-Type", "application/json");
        return response.build();
    }

    @GET
    public List<FileObject> listFiles() {
        ListObjectsRequest listRequest = ListObjectsRequest.builder().bucket(bucketName).build();

        return s3.listObjects(listRequest).contents().stream().sorted(Comparator.comparing(S3Object::lastModified).reversed())
                .map(FileObject::from).collect(Collectors.toList());
    }
}