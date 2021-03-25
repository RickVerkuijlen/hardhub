package nl.rickverkuijlen.hardhub;

import nl.rickverkuijlen.hardhub.S3.FileObject;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.ListObjectsRequest;
import software.amazon.awssdk.services.s3.model.S3Object;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;
import java.io.ByteArrayOutputStream;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Path("/hello-resteasy")
public class MusicController extends CommonResource {
    @Inject
    S3Client s3;

    private String test = "music/HEADHUNTERZ - FROM WITHIN (GPF OFFICIAL REMIX).mp3";

    @GET
    @Path("download")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response downloadFile() {

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        GetObjectResponse object = s3.getObject(buildGetRequest(test), ResponseTransformer.toOutputStream(baos));

        Response.ResponseBuilder response = Response.ok((StreamingOutput) baos::writeTo);
        response.header("Content-Disposition", "attachment;'filename=" + test);
        response.header("Content-Type", object.contentType());
        return response.build();
    }

    @GET
    public List<FileObject> listFiles() {
        ListObjectsRequest listRequest = ListObjectsRequest.builder().bucket(bucketName).build();

        return s3.listObjects(listRequest).contents().stream().sorted(Comparator.comparing(S3Object::lastModified).reversed())
                .map(FileObject::from).collect(Collectors.toList());
    }
}