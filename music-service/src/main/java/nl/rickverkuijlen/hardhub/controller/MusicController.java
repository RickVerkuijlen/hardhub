package nl.rickverkuijlen.hardhub.controller;

import nl.rickverkuijlen.hardhub.S3.FileObject;
import nl.rickverkuijlen.hardhub.logic.MusicLogic;
import nl.rickverkuijlen.hardhub.model.Music;
import nl.rickverkuijlen.hardhub.model.Pair;
import nl.rickverkuijlen.hardhub.repository.CommonResource;
import org.jboss.resteasy.annotations.jaxrs.PathParam;
import org.jboss.logging.Logger;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.ListObjectsRequest;
import software.amazon.awssdk.services.s3.model.S3Object;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;
import java.io.ByteArrayOutputStream;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Path("/music")
public class MusicController extends CommonResource {

    @Inject
    MusicLogic musicLogic;

    @Inject
    Logger log;

    @GET
    @Path("{path:.+}")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response downloadFile(@PathParam String path) {
        log.info("downloadFile: " + path);

        try {
            Pair<GetObjectResponse, StreamingOutput> result = this.musicLogic.getObjectResponse(path);
            return Response
                    .status(Response.Status.OK)
                    .entity(result.getB())
                    .header("Content-Disposition", "attachment;'filename=" + path)
                    .header("Content-Type", result.getA().contentType())
                    .build();
        } catch (Exception e) {
            return errorMessage(e);
        }
    }

    @GET
    @Path("id/{id}")
    public Response getSongById(@PathParam String id) {
        log.info("getSongById: " + id);
        try {
            return Response
                    .status(Response.Status.OK)
                    .entity(musicLogic.get(Integer.parseInt(id)))
                    .type(MediaType.APPLICATION_JSON_TYPE)
                    .build();
        } catch (Exception e) {
            return errorMessage(e);
        }
    }

    @PUT
    @Path("id/{id}")
    public Response updateStreamCount(@PathParam("id") String id) {
        log.info("updateStreamCount");
        try {
            return Response
                    .status(Response.Status.OK)
                    .entity(musicLogic.updateStreamCount(Integer.parseInt(id)))
                    .type(MediaType.APPLICATION_JSON_TYPE)
                    .build();
        } catch (Exception e) {
            return errorMessage(e);
        }
    }

    @GET
    @Path("artist/{id}")
    public Response getSongsByArtistId(@PathParam String id) {
        log.info("getSongByArtistId: " + id);
        try {
            return Response
                    .status(Response.Status.OK)
                    .entity(musicLogic.getAllFromArtistId(id))
                    .type(MediaType.APPLICATION_JSON_TYPE)
                    .build();
        } catch (Exception e) {
            return errorMessage(e);
        }
    }

    @GET
    @Path("allSongs")
    public Response getAllSongs() {
        log.info("getAllSongs");
        try {
            return Response
                    .status(Response.Status.OK)
                    .entity(musicLogic.getAll())
                    .type(MediaType.APPLICATION_JSON_TYPE)
                    .build();
        } catch (Exception e) {
            return errorMessage(e);
        }
    }

    @POST
    public Response addSong(Music music) {
        log.info("addSong" + music);
//        s3.putObject()
        try {
            return Response
                    .status(Response.Status.CREATED)
                    .entity(musicLogic.addSong(music))
                    .type(MediaType.APPLICATION_JSON_TYPE)
                    .build();
        } catch (Exception e) {
            return errorMessage(e);
        }
    }

    private Response errorMessage(Exception e) {
        return Response
                .status(Response.Status.BAD_REQUEST)
                .entity(e.getMessage())
                .type(MediaType.TEXT_PLAIN)
                .build();
    }
}