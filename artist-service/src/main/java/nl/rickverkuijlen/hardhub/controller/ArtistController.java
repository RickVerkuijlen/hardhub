package nl.rickverkuijlen.hardhub.controller;

import nl.rickverkuijlen.hardhub.logic.ArtistLogic;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

@Path("/artist")
public class ArtistController {

    @Inject
    ArtistLogic artistLogic;

    @GET
    @Path("id/{artistId}")
    public Response getArtist(@PathParam("artistId") String artistId) {
        System.out.println(artistId);
        Response.ResponseBuilder response = Response.ok(artistLogic.get(Integer.parseInt(artistId)));
        return response.build();
    }

    @GET
    public Response getAllArtists() {
        System.out.println("getAllArtists");
        Response.ResponseBuilder response = Response.ok(artistLogic.getAll());
        return response.build();
    }
}
