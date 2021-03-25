package nl.rickverkuijlen.hardhub.S3;

import org.jboss.resteasy.annotations.jaxrs.FormParam;
import org.jboss.resteasy.annotations.providers.multipart.PartType;

import javax.ws.rs.core.MediaType;
import java.io.InputStream;

public class FormData {
    @FormParam("file")
    @PartType(MediaType.APPLICATION_OCTET_STREAM)
    public InputStream data;

    @FormParam("filename")
    @PartType(MediaType.TEXT_PLAIN)
    public String fileName;

    @FormParam("mimetype")
    @PartType(MediaType.TEXT_PLAIN)
    public String mimeType;
}
