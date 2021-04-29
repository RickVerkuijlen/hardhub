package nl.rickverkuijlen.hardhub.controller;

import nl.rickverkuijlen.hardhub.S3.FileObject;
import nl.rickverkuijlen.hardhub.logic.MusicLogic;
import org.jboss.resteasy.annotations.jaxrs.PathParam;
import org.jboss.logging.Logger;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.ListObjectsRequest;
import software.amazon.awssdk.services.s3.model.S3Object;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
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
    S3Client s3;

    @Inject
    MusicLogic musicLogic;

    @Inject
    Logger log;

    @GET
    @Path("{path:.+}")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response downloadFile(@PathParam String path) {
        log.info("downloadFile: " + path);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        GetObjectResponse object = s3.getObject(buildGetRequest(path), ResponseTransformer.toOutputStream(baos));

        Response.ResponseBuilder response = Response.ok((StreamingOutput) baos::writeTo);
        response.header("Content-Disposition", "attachment;'filename=" + path);
        response.header("Content-Type", object.contentType());
        return response.build();
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
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity(e.getMessage())
                    .type(MediaType.TEXT_PLAIN)
                    .build();
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
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity(e.getMessage())
                    .type(MediaType.TEXT_PLAIN)
                    .build();
        }
    }

    @GET
    @Path("artist/{id}")
    public Response getSongsByArtistId(@PathParam String id) {
        log.info("getSongByArtistId: " + id);
        try {
            return Response
                    .status(Response.Status.OK)
                    .entity(musicLogic.getAllFromArtistId(Integer.parseInt(id)))
                    .type(MediaType.APPLICATION_JSON_TYPE)
                    .build();
        } catch (Exception e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity(e.getMessage())
                    .type(MediaType.TEXT_PLAIN)
                    .build();
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
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity(e.getMessage())
                    .type(MediaType.TEXT_PLAIN)
                    .build();
        }
    }

    

    @GET
    public List<FileObject> listFiles() {
        ListObjectsRequest listRequest = ListObjectsRequest.builder().bucket(bucketName).build();

        return s3.listObjects(listRequest).contents().stream().sorted(Comparator.comparing(S3Object::lastModified).reversed())
                .map(FileObject::from).collect(Collectors.toList());
    }
}