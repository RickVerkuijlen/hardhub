package nl.rickverkuijlen.hardhub.controller;

import nl.rickverkuijlen.hardhub.logic.ArtistLogic;
import org.jboss.logging.Logger;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/artist")
public class ArtistController {

    @Inject
    Logger log;

    @Inject
    ArtistLogic artistLogic;

    @GET
    @Path("id/{artistId}")
    public Response getArtist(@PathParam("artistId") String artistId) {
        log.info("getArtist: " + artistId);
        try {
            return Response
                    .status(Response.Status.OK)
                    .entity(artistLogic.get(artistId))
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
    public Response getAllArtists() {
        log.info("getAllArtists");
        try {
            return Response
                    .status(Response.Status.OK)
                    .entity(artistLogic.getAll())
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
}
